const path = require("path");
const fs = require("fs");
const Module = require("module");
const husky = require("husky");

function loadFileConfig(context) {
  let fileConfig, fileConfigPath;

  const possibleConfigPaths = ["./shebaoHusky.config.js"];
  for (const p of possibleConfigPaths) {
    const resolvedPath = p && path.resolve(context, p);
    if (resolvedPath && fs.existsSync(resolvedPath)) {
      fileConfigPath = resolvedPath;
      break;
    }
  }

  if (fileConfigPath) {
    try {
      fileConfig = require(fileConfigPath);
    } catch (err) {
      console.log(`load shebaoHusky.config.js Fail, ${err}`);
    }
  }

  return {
    fileConfig,
    fileConfigPath,
  };
}

/**
 * 添加pre-commit
 */
function addPreCommitScript(config?: object) {
  console.log('------添加pre-commit-------')
  const preCommit = config["pre-commit"];
  if (typeof preCommit === "string") {
    husky.set("pre-commit", preCommit);
  } else if (Array.isArray(preCommit)) {
    husky.set("pre-commit", tasks(preCommit));
  }
}

function tasks(tasks: string[]) {
  return tasks.join(" && ");
}

module.exports = {
  loadFileConfig,
  addPreCommitScript,
};
