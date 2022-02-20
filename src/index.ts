import fs from "fs"
import path from "path"
import chalk from "chalk"
import { Command } from "commander"

import Prompt from "./prompt.js"

export default function Forgext() {
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(path.resolve(), "package.json")).toString()
  )

  let webExtName

  const program = new Command()

  program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version)
    .argument("<ext-name>")
    .usage(`${chalk.green(`${packageJson.name} <ext-name>`)}`)
    .option("--icon <path>", "path to custom icon for web extension")
    .option("--webpack", "Initialize project with WebPack config")
    .option("--tailwind", "Add TailWindCSS support")
    .action((name) => {
      webExtName = name

      if (fs.existsSync(path.resolve(process.cwd(), webExtName))) {
        console.log(
          `Error: Directory with name ${chalk.red(webExtName)} already exists.`
        )
        process.exit(1)
      }
    })
    .parse(process.argv)

  if (typeof webExtName === "undefined") {
    console.error("Please specify the extension name:")
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("<ext-name>")}`)
    console.log()
    console.log("For example:")
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green("my-extension")}`
    )
    process.exit(1)
  }

  const options = program.opts()
  if (options.icon) {
    if (!fs.existsSync(path.resolve(process.cwd(), options.icon))) {
      console.log(
        "Error: File with name",
        chalk.red(options.icon),
        "does not exists."
      )
      process.exit(1)
    }
  }

  Prompt(webExtName, options)
}
