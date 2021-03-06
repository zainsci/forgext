import inquirer from "inquirer"
import chalk from "chalk"

import generateManifest from "./generateManifest.js"
import generatePackgeJson from "./generatePackageJson.js"
import generateWebPackConfig from "./generateWebPackConfig.js"
import { CommandOptions } from "./types"

export default function Prompt(webExtName: string, options?: CommandOptions) {
  inquirer
    .prompt([
      {
        name: "description",
        type: "input",
        message: "Description?",
        default: "description",
      },
      {
        name: "version",
        type: "input",
        message: "Version?",
        default: "0.1",
        validate: (ver) => {
          if (ver.match(/^(\d+\.)?(\d+\.)?(\d+)$/i)) return true
          return chalk.red("Please enter a valid version number.")
        },
      },
      {
        name: "homepage",
        type: "input",
        message: "Homepage url?",
        default: "",
      },
      {
        name: "popup",
        type: "confirm",
        message: "Popup window?",
        default: false,
      },
      {
        name: "background",
        type: "confirm",
        message: "Background script?",
        default: false,
      },
      {
        name: "content_script",
        type: "confirm",
        message: "Content script?",
        default: false,
      },
      {
        name: "options_page",
        type: "confirm",
        message: "Options page?",
        default: false,
      },
    ])
    .then((answers) => {
      generateManifest(webExtName, answers, options)

      if (options?.webpack) {
        generatePackgeJson(webExtName)
        generateWebPackConfig(webExtName, answers)
      }
    })
    .then(console.log)
    .catch(console.log)
}
