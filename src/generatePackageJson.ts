import fs from "fs"
import path from "path"
import { PackageJson } from "./types"

export default function generatePackgeJson(webExtName: string) {
  const name = webExtName.toLowerCase().replace(/ /g, "-")

  const packageJson: PackageJson = {
    name: name,
    version: "1.0.0",
    scripts: {
      dev: "webpack --watch --mode=production",
      build: "rm -rf ./dist; webpack --mode=production",
    },
    dependencies: {
      "copy-webpack-plugin": "^10.2.0",
      webpack: "^5.65.0",
    },
    devDependencies: {
      "webpack-cli": "^4.9.1",
    },
  }

  fs.writeFileSync(
    path.resolve(process.cwd(), webExtName, "package.json"),
    JSON.stringify(packageJson),
    "utf-8"
  )
}
