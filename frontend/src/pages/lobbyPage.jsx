import { fetchCodeBlocks } from "../services/codeBlockService.js";
import { useEffect, useState } from "react";
import { CodeBlockList } from "../components/codeBlockList.jsx";
import { useNavigate } from "react-router-dom";
import { createCodeBlock } from "../objects/codeBlock.js";

export function LobbyPage() {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const navigate = useNavigate();

  function onCodeBlockClick(codeBlock) {
    //creates a codeBlock object and navigates with it to CodeBlockPage
    const block = createCodeBlock(
      codeBlock.title,
      codeBlock.answer,
      codeBlock._id,
      codeBlock.template
    );
    navigate("/CodeBlock", { state: { data: block } });
  }

  const loadCodeBlocks = async () => {
    //sends a request to the server for all the code blocks in the db
    //and loads the data to the codeBlocks useState
    const data = await fetchCodeBlocks();
    setCodeBlocks(data);
  };

  useEffect(() => {
    //loads information from db when the page is loaded
    loadCodeBlocks();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#FBEAEB",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "100px",
          background: "#FBEAEB",
        }}
      >
        <h1 style={{ color: "#2F3C7E" }}>Lobby page</h1>
        <CodeBlockList
          codeBlockArray={codeBlocks}
          onCodeBlockClick={onCodeBlockClick}
        />
      </div>
    </div>
  );
}
