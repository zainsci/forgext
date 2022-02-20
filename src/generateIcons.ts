import { OptionValues } from "commander"
import fs from "fs"
import path from "path"
import sharp from "sharp"

import { DIR_ICONS, FILE_ICON, ICON_SIZE_SET } from "./constants.js"
import { CommandOptions } from "./types/index.js"

export function generateIcons(webExtName: string, options?: CommandOptions) {
  let imageBuffer: Buffer
  let destDir: string

  if (typeof options !== "undefined") {
    destDir =
      options.webpack || options.tailwindcss ? "src/" + DIR_ICONS : DIR_ICONS

    fs.mkdirSync(path.resolve(process.cwd(), webExtName, destDir), {
      recursive: true,
    })

    if (typeof options.icon !== "undefined" && options.icon !== "") {
      imageBuffer = fs.readFileSync(path.resolve(process.cwd(), options.icon))
      imageBuffer = Buffer.from(imageBuffer)
    } else {
      imageBuffer = fs.readFileSync(
        path.resolve(path.resolve(), "src", "assets", FILE_ICON)
      )
      imageBuffer = Buffer.from(imageBuffer)
    }
  } else {
    imageBuffer = fs.readFileSync(
      path.resolve(path.resolve(), "src", "assets", FILE_ICON)
    )
    imageBuffer = Buffer.from(imageBuffer)
  }

  ICON_SIZE_SET.forEach((size) => {
    sharp(imageBuffer)
      .resize(size, size)
      .toFile(
        path.resolve(process.cwd(), webExtName, destDir, `icon${size}.png`)
      )
  })
}
