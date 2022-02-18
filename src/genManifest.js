import fs from "fs"
import path from "path"

import { copyFile, createDirs, validURL } from "./utils.js"
import {
  FILE_BACKGROUND_JS,
  FILE_POPUP,
  FILE_OPTIONS,
  FILE_POPUP_JS,
  FILE_POPUP_CSS,
  FILE_CONTENT_JS,
  FILE_CONTENT_CSS,
  FILE_OPTIONS_JS,
  FILE_OPTIONS_CSS,
} from "./constants.js"
import chalk from "chalk"

export default function generateManifest(webExtName, options) {
  const manifestJson = {
    manifest_version: 3,
    name: webExtName,
    description: options.description || "description",
    version: options.version || "0.1",
    action: {
      default_icon: "icon.png",
    },
    icons: {
      16: "icon.png",
      48: "icon.png",
      128: "icon.png",
    },
  }

  copyFile(webExtName, "icon.png")

  if (options.homepage !== "" && validURL(options.homepage)) {
    manifestJson["homepage_url"] = options.homepage
  }

  if (options.popup) {
    manifestJson.action["default_popup"] = FILE_POPUP

    createDirs(webExtName)

    copyFile(webExtName, FILE_POPUP)
    copyFile(webExtName, FILE_POPUP_JS)
    copyFile(webExtName, FILE_POPUP_CSS)
  }

  if (options.background) {
    manifestJson["background"] = {
      service_worker: FILE_BACKGROUND_JS,
    }

    copyFile(webExtName, FILE_BACKGROUND_JS)
  }

  if (options.content_script) {
    manifestJson["content_scripts"] = [
      {
        js: [FILE_CONTENT_JS],
        css: [FILE_CONTENT_CSS],
        matches: ["https://*/*"],
      },
    ]

    copyFile(webExtName, FILE_CONTENT_JS)
    copyFile(webExtName, FILE_CONTENT_CSS)
  }

  if (options.options_page) {
    manifestJson["options_page"] = FILE_OPTIONS

    copyFile(webExtName, FILE_OPTIONS)
    copyFile(webExtName, FILE_OPTIONS_JS)
    copyFile(webExtName, FILE_OPTIONS_CSS)
  }

  fs.writeFileSync(
    path.resolve(path.resolve(), webExtName, "manifest.json"),
    JSON.stringify(manifestJson, null, 2)
  )

  successMessage(webExtName)
}

export function successMessage(extName) {
  console.log("")
  console.log("")
  console.log(
    `Success! Created ${chalk.green(extName)} at ${chalk.yellow(
      "/" + extName
    )}.`
  )
  console.log("")
  console.log("Start building: ")
  console.log("  $ cd", chalk.green(extName))
  console.log("")
}
