import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";

import "./AuthPage.css";


export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleLogin() {

        setError("");

        if (!email || !password) {

            setError(
                "Please enter your email and password."
            );

            return;
        }


        try {

            setLoading(true);

            const response = await login(
                email,
                password
            );


            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "username",
                response.data.username
            );


            navigate("/home");

        }

        catch (error) {

            console.error(
                "Login failed:",
                error
            );

            setError(
                "Invalid username or password."
            );

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div className="auth-page">

            {/* Brand */}

            <header className="auth-brand">

                <div className="brand-mark">
                    H
                </div>

                <span>
                    HashPro
                </span>

            </header>


            {/* Main */}

            <main className="auth-main">

                <section className="auth-intro">

                    <p className="auth-eyebrow">
                        INTERACTIVE CRYPTOGRAPHY
                    </p>

                    <h1>
                        Understand hashing
                        <br />
                        by seeing it happen.
                    </h1>

                    <p>
                        Explore SHA-256 step by step,
                        from your input to the final
                        cryptographic digest.
                    </p>

                </section>


                {/* Login card */}

                <section className="auth-card">

                    <div className="auth-card-header">

                        <h2>
                            Welcome back
                        </h2>

                        <p>
                            Sign in to continue learning.
                        </p>

                    </div>


                    <div className="auth-form">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your email"
                            autoComplete="email"
                        />


                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {
                                    handleLogin();
                                }

                            }}
                        />


                        {error && (

                            <div className="auth-error">
                                {error}
                            </div>

                        )}


                        <button
                            className="auth-primary-button"
                            onClick={handleLogin}
                            disabled={loading}
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign in"}

                            {!loading && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </div>


                    <div className="auth-divider">
                        <span />
                        <span>
                            OR
                        </span>
                        <span />
                    </div>


                    <p className="auth-switch">

                        Don't have an account?

                        <button
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Create one
                        </button>

                    </p>

                </section>

            </main>


            {/* Footer */}

            <footer className="auth-footer">

                SHA-256
                <span>•</span>
                HASHING
                <span>•</span>
                CRYPTOGRAPHY

            </footer>

        </div>

    )
}