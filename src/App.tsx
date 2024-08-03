import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./pages/main-layout/main-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route
          path="*"
          element={<div className="flex m-2">404 Page Not found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
