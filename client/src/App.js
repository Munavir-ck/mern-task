import "./App.css";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/" />}
          />

          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
