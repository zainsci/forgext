import fs from "fs"
import path from "path"

import {
  capitalizeName,
  copyFile,
  createAndCopy,
  createDirs,
  successMessage,
  validURL,
} from "./utils.js"
import {
  FILE_POPUP,
  FILE_OPTIONS,
  FILE_POPUP_JS,
  FILE_POPUP_CSS,
  FILE_CONTENT_JS,
  FILE_CONTENT_CSS,
  FILE_OPTIONS_JS,
  FILE_OPTIONS_CSS,
  FILE_BACKGROUND_JS,
  DIR_ICONS,
} from "./constants.js"
import { generateIcons } from "./generateIcons.js"

export default function generateManifest(webExtName, options) {
  const manifestJson = {
    manifest_version: 3,
    name: webExtName,
    description: options.description || "description",
    version: options.version || "0.1",
    action: {
      default_icon: DIR_ICONS + "icon16.png",
      default_title: capitalizeName(webExtName) || "Click Me!",
    },
    icons: {
      16: DIR_ICONS + "icon16.png",
      48: DIR_ICONS + "icon48.png",
      128: DIR_ICONS + "icon128.png",
    },
  }

  generateIcons(webExtName)

  if (options.homepage !== "" && validURL(options.homepage)) {
    manifestJson["homepage_url"] = options.homepage
  }

  if (options.popup) {
    manifestJson.action["default_popup"] = FILE_POPUP

    createDirs(webExtName)

    createAndCopy(webExtName, FILE_POPUP)

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

    createAndCopy(webExtName, FILE_OPTIONS)

    copyFile(webExtName, FILE_OPTIONS_JS)
    copyFile(webExtName, FILE_OPTIONS_CSS)
  }

  fs.writeFileSync(
    path.resolve(path.resolve(), webExtName, "manifest.json"),
    JSON.stringify(manifestJson, null, 2)
  )

  successMessage(webExtName)
}
