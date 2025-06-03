import axios from "axios";

export async function fetchCodeBlocks() {
  const response = await axios.get("http://localhost:3002/codeBlocks/list");
  return response.data["codeBlockMap"];
}
