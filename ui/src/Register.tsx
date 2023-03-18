import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = (props: any) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const [authenticated, setauthenticated] = useState<string | null>(null);
    useEffect(() => {
      const loggedInUser = localStorage.getItem("token");
     if (loggedInUser) {
          setauthenticated(loggedInUser);
      }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/user/register', {
            name,
            email,
            password: pass
        });

        alert("Registration successful");
        navigate('/login')
    }

    if (authenticated) {
        navigate('/dashboard')
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}