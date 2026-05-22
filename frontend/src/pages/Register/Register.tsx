import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';

function Register(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handleRegister = async () => {

    await fetch("http://localhost:5000/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });

    navigate("/");

  };

  return(

    <Container className="d-flex justify-content-center align-items-center vh-100">

      <Form className="w-100" style={{ maxWidth: '400px' }}>

        <h2 className="text-center mb-4">Register</h2>

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

        <Button variant="primary" onClick={handleRegister} className="w-100">Register</Button>

        <p className="text-center mt-3">

          Already have account?

          <Link to="/"> Login</Link>

        </p>

      </Form>

    </Container>

  );

}

export default Register;