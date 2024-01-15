import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";

function App() {
  return (
    <div className="font-primary">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </div>
  );
}

export default App;
