import { BrowserRouter, Routes, Route } from "react-router-dom";
import VMS from "./Layout/VMS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<VMS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
