const husky = require("husky");
const path = require("path");
const { loadFileConfig, addPreCommitScript } = require("./utils");

function runHuskyScripts() {
  if (husky) {
    const context = process.cwd();
    // 获取配置文件shebaoHusky.config.js
    let fileConfig = {},
      fileConfigPath = "";
    try {
      const res = loadFileConfig(context);
      fileConfig = res?.fileConfig || {};
      fileConfigPath = res?.fileConfigPath || "";
    } catch (err) {
      console.log(err, "err");
    }
    // 添加pre-commit
    addPreCommitScript(fileConfig);
    // 添加post-commit
    // husky.add("pre-commit", "npm test 1");
    // console.log({ husky });
  }
}

module.exports = runHuskyScripts;
