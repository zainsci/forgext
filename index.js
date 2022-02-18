import fs from "fs"
import path from "path"
import chalk from "chalk"
import { Command } from "commander"
import { readFile } from "fs/promises"

import init from "./src/init.js"

const packageJson = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
)

const program = new Command()

program
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .argument("<ext-name>")
  .usage(`${chalk.green(`${packageJson.name} <ext-name>`)}`)
  .action((extensionName) => {
    const extensionDir = path.resolve(process.cwd(), extensionName)

    if (fs.existsSync(extensionDir)) {
      console.log(
        `Error: Directory with name ${chalk.red(extensionName)} already exists.`
      )
      process.exit(1)
    }

    if (typeof extensionName === "undefined") {
      console.error("Please specify the extension name:")
      console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green("<ext-name>")}`
      )
      console.log()
      console.log("For example:")
      console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green("my-extension")}`
      )
      process.exit(1)
    }

    fs.mkdir(extensionDir, () => {})
    init(extensionName)
  })
  .parse(process.argv)
