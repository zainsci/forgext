import fs from "fs"
import path from "path"
import chalk from "chalk"

import { DIR_JS, DIR_CSS, DIR_VIEWS } from "./constants.js"

export const createDirs = (webExtName: string) => {
  const destDir = fs.existsSync(path.resolve(process.cwd(), webExtName, "src"))
    ? webExtName + "/src"
    : webExtName

  fs.mkdirSync(path.resolve(path.resolve(), destDir, DIR_JS))
  fs.mkdirSync(path.resolve(path.resolve(), destDir, DIR_CSS))
  fs.mkdirSync(path.resolve(path.resolve(), destDir, DIR_VIEWS))
}

export const copyFile = (webExtName: string, file: string) => {
  const destDir = fs.existsSync(path.resolve(process.cwd(), webExtName, "src"))
    ? webExtName + "/src"
    : webExtName

  fs.copyFile(
    path.resolve(path.resolve(), "src", "assets", file),
    path.resolve(destDir, file),
    (e) => {
      if (e) console.log(e)
    }
  )
}

// https://stackoverflow.com/a/5717133
export function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  )

  return !!pattern.test(str)
}

export function successMessage(webExtName: string) {
  console.log("")
  console.log("")
  console.log(
    `Success! Created ${chalk.green(webExtName)} at ${chalk.yellow(
      "/" + webExtName
    )}.`
  )
  console.log("")
  console.log("Start building: ")
  console.log("  $ cd", chalk.green(webExtName))
  console.log("")
}

export function capitalizeName(str: string): string {
  let name = str.replace("-", " ").split(" ")
  name = name.map((word) => word[0].toUpperCase() + word.slice(1))
  return name.join(" ")
}

export function createAndCopy(webExtName: string, fileName: string) {
  if (fileName === "" && typeof fileName !== "string") {
    return
  }

  const destDir = fs.existsSync(path.resolve(process.cwd(), webExtName, "src"))
    ? webExtName + "/src"
    : webExtName

  const capitalizedName = capitalizeName(webExtName)

  let htmlContent = fs.readFileSync(
    path.resolve(path.resolve(), "src", "assets", fileName),
    "utf-8"
  )
  htmlContent = htmlContent.replace(/{{ extensionName }}/g, capitalizedName)

  fs.writeFileSync(
    path.resolve(process.cwd(), destDir, fileName),
    htmlContent,
    "utf-8"
  )
}
