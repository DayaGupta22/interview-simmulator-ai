import React from 'react'
import "../auth.form.scss";
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../Hooks/useAuth"


const Login = () => {
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password })
        navigate("/");

    }
    if (loading) {
        return (<main><h1>loading...</h1></main>)
    }

    return (
        <main>
            <div className="form-container">
                <h1>login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email : </label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name="email" placeholder="Enter email address" autoComplete="email" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password : </label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name="password" autoComplete="current-password" placeholder="Enter a password" />
                    </div>
                    <button className="button primary-button"> login</button>
                </form>
                <p>Don't hav account?<Link to={"/register"}> register</Link>  </p>
            </div>
        </main>
    )
}

export default Login
