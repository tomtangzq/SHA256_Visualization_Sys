import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleLogin() {

        setError("");

        try {

            const response = await login(
                email,
                password,
            );

            console.log(response.data);

            navigate("/home");

        } catch (err: any) {

            if (err.response) {

                setError(err.response.data.message);

            } else {

                setError("Unable to connect to server.");

            }

        }

    }
    return (

        <div>

            <h1>Login</h1>

            <input

                placeholder="Email"

                value={email}

                onChange={(e) =>

                    setEmail(e.target.value)

                }

            />

            <br /><br />

            <input

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) =>

                    setPassword(e.target.value)

                }

            />

            <br /><br />

            <button
                onClick={handleLogin}
            >
                Login
            </button>

            <p style={{ color: "red" }}>

                {error}

            </p>

        </div>

    );

}