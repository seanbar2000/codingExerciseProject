const { Router } = require("express");
const { getCodeBlocks } = require("../services/codeBlocksService.js");
const codeBlockRouter = Router();

codeBlockRouter.get("/list", async (req, res) => {
  let codeBlockMap = await getCodeBlocks();
  res.json({ codeBlockMap });
});
module.exports = codeBlockRouter;
