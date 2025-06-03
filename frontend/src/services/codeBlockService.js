import axios from "axios";

export async function fetchCodeBlocks() {
  const response = await axios.get(
    "https://codingexerciseproject-production.up.railway.app/codeBlocks/list"
  );
  return response.data["codeBlockMap"];
}
