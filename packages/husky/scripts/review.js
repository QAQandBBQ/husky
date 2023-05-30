const execa = require("execa");

const getUser = () => {
  const res = execa.commandSync("git config user.name");
  return res.stdout;
};

function getGitBranch() {
  const res = execa.commandSync("git rev-parse --abbrev-ref HEAD");
  return res.stdout;
}

function checkCommand(command, args = []) {
  if (!command) {
    process.exit(1);
    return;
  }
  try {
    execa.sync(command, args);
    return true;
  } catch (err) {
    // 没有安装RBT 则不进行后选操作
    if (err.code === "ENOENT") {
      console.log(`husky - ${command} does not exist!`);
      return;
    }
    process.exit(1);
  }
}

module.exports = function reviewScript() {
  const hasRbtCommand = checkCommand("npm", ["-v"]);
  console.log(hasRbtCommand);
  if (hasRbtCommand) {
    const branchName = getGitBranch();
    const username = getUser();

    console.log({ branchName, username });
  }
};
