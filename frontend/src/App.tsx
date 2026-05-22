import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Crud from "./pages/Crud/Crud";
import ToastProvider from "./components/ToastProvider/ToastProvider";

function App() {

  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crud" element={<Crud />} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;