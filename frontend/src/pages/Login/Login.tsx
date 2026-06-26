import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import api from "../../api/axios";
import { toast } from "react-toastify";


function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("owner@gmail.com");
  const [password,setPassword] = useState("123");
  const [showPassword,setShowPassword] = useState(false);


const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
        email,
        password,
      }
    );

    const token = res.data?.token;

    if (token) {
      toast.success("Login successful!");
      localStorage.setItem("token", token);
      navigate("/");
    }
  } catch (error) {
    toast.error("Login failed!");
    console.error("Login Error:", error);
  }
};

  return (

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Form className="w-100" style={{ maxWidth: '400px' }}>

        <h2 className="text-center mb-4">Login</h2>

        <Form.Group className="mb-3">

          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </Form.Group>

        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={() => setShowPassword((prev)=>!prev)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" onClick={handleLogin} className="w-100">Login</Button>

        <p className="text-center mt-3">
          Don't have account?
          <Link to="/register"> Register</Link>
        </p>
      </Form>

    </Container>
  );

}

export default Login;