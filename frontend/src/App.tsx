import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ToastProvider from "./components/ToastProvider/ToastProvider";
import User from "./pages/User/User";
import List from "./pages/List/List";

function App() {

  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<User />} />
        <Route path="/list" element={<List />} />

      </Routes>

    </BrowserRouter>
  );

}

export default App;