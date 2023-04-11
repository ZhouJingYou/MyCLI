#! /usr/bin/env node
const chalk = require("chalk")
const Creator = require("../lib/Creator")
const Inquirer = require("inquirer")
const ora = require("ora")
const spinner = ora("Loading...")

const { getZhuRongRepo, getTagsByRepo } = require("../lib/create")

async function getRepoInfo() {
  spinner.start()
  let repoList = await getZhuRongRepo()
  spinner.succeed()
  const repos = repoList.map(item => item.name)
  console.log("repos :>> ", repos)
  let { repo } = await new Inquirer.prompt([
    {
      name: "repo",
      type: "checkbox",
      message: "select a vue template",
      choices: repos
    }
  ])
  console.log("repo :>> ", repo)
  return repo
}
async function getTagInfo(repo) {
  spinner.start()
  let tagList = await getTagsByRepo(repo)
  spinner.succeed()
  const tags = tagList.map(item => item.name)
  let { tag } = await new Inquirer.prompt([
    {
      name: "tag",
      type: "list",
      message: "select a version",
      choices: tags
    }
  ])
  console.log("tag :>> ", tag)
  return tag
}
// console.log(`hello ${chalk.blue("world")}`)
// console.log(chalk.blue.bgRed.bold("Hello world!"))
// console.log(chalk.green("I am a green line " + chalk.blue.underline.bold("with a blue substring") + " that becomes green again!"))
const program = require("commander")
program.name("mycli").usage(`<command> [option]`).version(`1.0.0`)
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action(async (projectName, cmd) => {
    // new Creator()
    // 处理用户输入create 指令附加的参数
    // require("../lib/create")(projectName, cmd)
    let repo = await getRepoInfo()
    let tag = await getTagInfo(repo)
  })

program.on("--help", function () {
  console.log()
  console.log(`Run ${chalk.cyan("mycli <command> --help")} for detailed usage of given command.`)
  console.log()
})
program.parse(process.argv)

/* const ora = require("ora")
// 定义一个loading
const spinner = ora("Loading unicorns")
// 启动loading
spinner.start()
setTimeout(() => {
  spinner.color = "yellow"
  spinner.text = "Loading rainbows"
  setTimeout(() => {
    spinner.succeed()
  }, 2000);
}, 3000) */
// loading 失败
// spinner.fail()

/* new Inquirer.prompt([
  {
    name: "vue",
    // 多选交互功能
    // 单选将这里修改为 list 即可
    type: "checkbox",
    message: "Check the features needed for your project:",
    choices: [
      {
        name: "Babel",
        checked: true
      },
      {
        name: "TypeScript"
      },
      {
        name: "Progressive Web App (PWA) Support"
      },
      {
        name: "Router"
      }
    ]
  }
]).then(data => {
  console.log(data)
}) */
