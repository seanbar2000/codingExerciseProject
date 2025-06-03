import { Router } from "express";
import { getCodeBlocks } from "../services/codeBlocksService.js";
const codeBlockRouter = Router();

codeBlockRouter.get("/list", async (req, res) => {
  let codeBlockMap = await getCodeBlocks();
  res.json({ codeBlockMap });
});
export default codeBlockRouter;
