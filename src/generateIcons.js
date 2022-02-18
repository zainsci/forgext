import fs from "fs"
import path from "path"
import sharp from "sharp"

import { DIR_ICONS, FILE_ICON, ICON_SIZE_SET } from "./constants.js"

export function generateIcons(webExtName, iconPath) {
  let imageBuffer

  fs.mkdirSync(path.resolve(process.cwd(), webExtName, DIR_ICONS), () => {})

  if (typeof iconPath === "undefined") {
    imageBuffer = fs.readFileSync(
      path.resolve(path.resolve(), "src", "assets", FILE_ICON)
    )
    imageBuffer = Buffer.from(imageBuffer)
  }

  ICON_SIZE_SET.forEach((size) => {
    sharp(imageBuffer)
      .resize(size, size)
      .toFile(
        path.resolve(process.cwd(), webExtName, DIR_ICONS, `icon${size}.png`)
      )
  })
}
