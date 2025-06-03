import { LobbyPage } from "./pages/lobbyPage";
import { CodeBlockPage } from "./pages/codeBlockPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Lobby" replace />} />
        <Route path="/Lobby" element={<LobbyPage />} />
        <Route path="/CodeBlock" element={<CodeBlockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
