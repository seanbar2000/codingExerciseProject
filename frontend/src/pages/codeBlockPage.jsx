import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";

export function CodeBlockPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [role, setRole] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [showSmiley, setShowSmiley] = useState(false);
  const socketRef = useRef(null);
  const location = useLocation();
  const exercise = location.state?.data;

  function changeCode(updatedCode) {
    //update the code and check if the updated code equals the answer
    setCode(updatedCode);
    if (updatedCode === exercise.answer) {
      setShowSmiley(true);
    }
  }
  useEffect(() => {
    //create socket handshake
    const socket = io(
      "https://codingexerciseproject-production.up.railway.app"
    );
    socketRef.current = socket;
    socket.emit("join", { roomId: exercise.id, roomCode: exercise.template });
    //initialize page information (if user is student update existing information)
    socket.on("init", ({ studentCount, roomCode, role }) => {
      changeCode(roomCode);
      setStudentCount(studentCount);
      setRole(role);
    });
    //update the code in the codeblock
    socket.on("codeUpdate", (roomCode) => {
      changeCode(roomCode);
    });
    //if the mentor left leave page
    socket.on("mentorLeft", () => {
      navigate("/lobby");
    });
    //live update of the amount of students in the page
    socket.on("studentCount", (count) => {
      setStudentCount(count);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket.IO connection error:", err);
    });

    socket.on("disconnect", () => {});

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    navigate("/Lobby");
  };
  const handleChange = (newCode) => {
    //if user(student) changes the code in the code block,
    //send message to socket to update the code in every connected user in the page
    changeCode(newCode);
    if (role === "student") {
      socketRef.current.emit("codeUpdate", {
        roomId: exercise.id,
        roomCode: newCode,
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        background: "#FBEAEB",
      }}
    >
      <h1 style={{ color: "#2F3C7E" }}>Excersize: {exercise.title}</h1>
      <p style={{ color: "#2F3C7E" }}>Role: {role}</p>
      <p style={{ color: "#2F3C7E" }}>Students online: {studentCount}</p>
      <div
        style={{
          margin: "20px auto",
          height: "50vh",
          maxWidth: "800px",
          background: "#FBEAEB",
        }}
      >
        <textarea
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          readOnly={role === "mentor"}
          style={{
            width: "100%",
            height: "400px",
            fontFamily: "monospace",
            fontSize: "14px",
            backgroundColor: "#2F3C7E",
            color: "#FBEAEB",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "2px",
            resize: "vertical",
          }}
        />
      </div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#2F3C7E",
          color: "#FBEAEB",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        ⬅ Return
      </button>
      {showSmiley && (
        <h1 style={{ color: "#2F3C7E", fontSize: "5rem" }}>Well Done!😊</h1>
      )}
    </div>
  );
}
