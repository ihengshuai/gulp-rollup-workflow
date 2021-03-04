// @ts-nocheck
const rimraf = require("rimraf")
const path = require("path")
const glob = require("glob")
const Log = console.log
const chalk = require("chalk")

const whiteLists = ['favicon.png', 'img', 'lib', 'font', 'video']
const whiteListPaths = whiteLists.map(filename => path.resolve(__dirname, '../dist', filename))

glob.sync(path.resolve(__dirname, "../dist") + "/*").forEach((filePath) => {
  if(whiteListPaths.some(file => file == filePath.replace(/(\/)/g , "\\"))) return
  rimraf(filePath, () => {
    Log(chalk.hex("#E9232C").bold("Clear: ") + chalk.hex("#666").underline(filePath))
  })
})
