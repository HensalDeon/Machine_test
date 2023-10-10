import "./App.scss";
import Authenticate from "./pages/Auth/Authenticate";
// import Home from "./pages/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
    const user = localStorage.getItem("user");
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
            <Route path="/auth" element={user ? <Navigate to="../home" /> : <Authenticate />} />
            <Route path="*" element={<p>just nothing!!</p>} />
        </Routes>
    );
}

export default App;
