const {
  insertCodeBlock,
  getAllCodeBlocks,
} = require("../DBClients/mongoClient.js");
async function getCodeBlocks() {
  // Gets all the code blocks in the db
  const codeBLocksArray = await getAllCodeBlocks();
  return codeBLocksArray;
}
function initDB() {
  // inserts all code blocks (hard coded) to db when app starts running
  let codeBlock1 = {
    title: "print to console 'hello world'",
    template: "//use console.log",
    answer: 'console.log("hello world");',
  };
  let codeBlock2 = {
    title: "use a function",
    template: "function func(x){\nreturn x + 1;\n}\n",
    answer:
      "function func(x){return x + 1;}\nlet x = 1;\nconsole.log(func(x));",
  };
  let codeBlock3 = {
    title: "async case",
    template: "//use async on a function\nfunction func(x){return x+1;}",
    answer: "async function func(x){return x+1;}",
  };
  let codeBlock4 = {
    title: "using repeat",
    template: "//print to console * x times\nfunction func(x){}",
    answer:
      "function func(x){\nconst stars = '*'.repeat(n);\nconsole.log(stars);\n}",
  };
  insertCodeBlock(codeBlock1);
  insertCodeBlock(codeBlock2);
  insertCodeBlock(codeBlock3);
  insertCodeBlock(codeBlock4);
}

module.exports = { getCodeBlocks, initDB };
