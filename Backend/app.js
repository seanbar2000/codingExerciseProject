const express = require("express");
const codeBlockRouter = require("./apiHandlers/codeBlocksApiHandler.js");
const { initDB } = require("./services/codeBlocksService.js");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3002;

app.use(cors());
app.use("/codeBlocks", codeBlockRouter);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const exerciseRooms = new Map();

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("join", ({ roomId, roomCode }) => {
    if (!exerciseRooms.has(roomId)) {
      // First user = mentor
      // Create a new code room, update the mentors socket id, code in the room and create a new student set
      exerciseRooms.set(roomId, {
        code: roomCode,
        mentorSocketId: socket.id,
        students: new Set(),
      });
      socket.role = "mentor";
      socket.roomId = roomId;
      socket.join(roomId);
      // Send init to client with the initialized code in the room and amount of students
      socket.emit("init", {
        role: "mentor",
        roomCode: roomCode,
        studentCount: 0,
      });
    } else {
      // Student joins
      // Adds socket id to students Set
      // Sends the current code every socket connected to the room has and number of students
      const room = exerciseRooms.get(roomId);
      room.students.add(socket.id);
      socket.role = "student";
      socket.roomId = roomId;
      socket.join(roomId);

      socket.emit("init", {
        role: "student",
        roomCode: room.code,
        studentCount: room.students.size,
      });

      // Notify mentor and all students about new student count
      io.to(room.mentorSocketId).emit("studentCount", room.students.size);
      room.students.forEach((studentId) => {
        io.to(studentId).emit("studentCount", room.students.size);
      });
    }
  });

  socket.on("codeUpdate", ({ roomId, roomCode }) => {
    const room = exerciseRooms.get(roomId);
    if (!room) return;

    room.code = roomCode;

    if (socket.role === "student") {
      //make sure a student sent the socket and notify all students and mentor to update their code
      io.to(room.mentorSocketId).emit("codeUpdate", room.code);
      room.students.forEach((studentId) => {
        io.to(studentId).emit("codeUpdate", room.code);
      });
    }
  });

  socket.on("disconnect", () => {
    const { roomId, role } = socket;
    if (!roomId || !exerciseRooms.has(roomId)) return;

    const room = exerciseRooms.get(roomId);

    if (role === "mentor") {
      // Mentor left, notify students & delete room
      room.students.forEach((studentId) => {
        io.to(studentId).emit("mentorLeft");
      });
      exerciseRooms.delete(roomId);
    } else if (role === "student") {
      // Student left, update count and notify mentor and students
      room.students.delete(socket.id);
      io.to(room.mentorSocketId).emit("studentCount", room.students.size);
      room.students.forEach((studentId) => {
        io.to(studentId).emit("studentCount", room.students.size);
      });
    }
  });
});

server.listen(port, () => {
  initDB();
  console.log(`Server running on http://localhost:${port}`);
});
