export function CodeBlockList({ codeBlockArray, onCodeBlockClick }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
        background: "#FBEAEB",
      }}
    >
      {codeBlockArray.map((block) => (
        <div
          key={block._id}
          onClick={() => onCodeBlockClick(block)}
          style={{
            border: "2px solid #555",
            borderRadius: "12px",
            padding: "20px",
            minWidth: "120px",
            maxWidth: "200px",
            textAlign: "center",
            color: "#FBEAEB",
            backgroundColor: "#2F3C7E",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            fontWeight: "bold",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          {block.title || "(Untitled)"}
        </div>
      ))}
    </div>
  );
}
