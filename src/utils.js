import fs from "fs"
import path from "path"
import chalk from "chalk"

import { DIR_JS, DIR_CSS, DIR_VIEWS } from "./constants.js"

export const createDirs = (webExtName) => {
  fs.mkdirSync(path.resolve(path.resolve(), webExtName, DIR_JS), () => {})
  fs.mkdirSync(path.resolve(path.resolve(), webExtName, DIR_CSS), () => {})
  fs.mkdirSync(path.resolve(path.resolve(), webExtName, DIR_VIEWS), () => {})
}

export const copyFile = (extensionDir, file) => {
  fs.copyFile(
    path.resolve(path.resolve(), "src", "assets", file),
    path.resolve(extensionDir, file),
    (e) => {
      if (e) console.log(e)
    }
  )
}

// https://stackoverflow.com/a/5717133
export function validURL(str) {
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

export function capitalizeName(str) {
  if (typeof str !== "string" || str === "") {
    return
  }

  let name = str.replace("-", " ").split(" ")
  name = name.map((word) => word[0].toUpperCase() + word.slice(1))
  return name.join(" ")
}

export function createAndCopy(webExtName, fileName) {
  if (fileName === "" && typeof fileName !== "string") {
    return
  }

  const capitalizedName = capitalizeName(webExtName)

  let htmlContent = fs.readFileSync(
    path.resolve(path.resolve(), "src", "assets", fileName),
    "utf-8"
  )
  htmlContent = htmlContent.replace(
    /{{ extensionName }}/g,
    !!fileName.match(/option/)
      ? capitalizedName + " - Options"
      : capitalizedName
  )

  fs.writeFileSync(
    path.resolve(process.cwd(), webExtName, fileName),
    htmlContent,
    "utf-8"
  )
}
