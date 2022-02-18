import fs from "fs"
import path from "path"

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
