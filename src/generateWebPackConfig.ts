import fs from "fs"
import path from "path"
import { Answers } from "./types"

interface IEntries {
  background?: string
  content?: string
  popup?: string
  options?: string
}

export default function generateWebPackConfig(
  webExtName: string,
  answers: Answers
) {
  const webPackTemplate: string = fs.readFileSync(
    path.resolve(path.resolve(), "src/assets/templates/webpack"),
    "utf-8"
  )

  const entries: IEntries = {}

  if (answers.background) {
    entries["background"] = "./src/background.js"
  }
  if (answers.popup) {
    entries["popup"] = "./src/js/popup.js"
  }
  if (answers.content_script) {
    entries["content"] = "./src/js/content.js"
  }
  if (answers.options_page) {
    entries["options"] = "./src/js/options.js"
  }

  const copyPluginPatterns = [
    { from: "./manifest.json", to: "./" },
    { from: "./src/icons", to: "./icons" },
  ]

  if (answers.popup || answers.content_script) {
    copyPluginPatterns.push({
      from: "./src/css",
      to: "./css",
    })
    copyPluginPatterns.push({
      from: "./src/views",
      to: "./views",
    })
  }

  let webPackConfig = webPackTemplate
    .replace(/<<ENTRY>>/g, JSON.stringify(entries, null, 2))
    .replace(/<<PATTERNS>>/g, JSON.stringify(copyPluginPatterns, null, 2))

  fs.writeFileSync(
    path.resolve(process.cwd(), webExtName, "webpack.config.js"),
    webPackConfig,
    "utf-8"
  )
}
