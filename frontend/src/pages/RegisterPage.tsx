import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/auth";

import "./AuthPage.css";


export default function RegisterPage() {

    const navigate = useNavigate();


    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    async function handleRegister() {

        setError("");


        // Basic validation

        if (
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please complete all fields."
            );

            return;
        }


        if (
            password !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);


            await register(
                username,
                email,
                password
            );


            /*
             * Registration successful.
             *
             * We don't automatically log the
             * user in here. Instead, send them
             * to the Login page.
             */

            navigate("/login");

        }

        catch (error: any) {

            console.error(
                "Registration failed:",
                error
            );


            /*
             * Flask returns:
             *
             * {
             *   success: false,
             *   message: "..."
             * }
             */

            setError(
                error?.response?.data?.message ||
                "Registration failed. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    }


    return (

        <div className="auth-page">

            {/* =========================
                Brand
            ========================= */}

            <header className="auth-brand">

                <div className="brand-mark">
                    H
                </div>

                <span>
                    HashPro
                </span>

            </header>


            {/* =========================
                Main
            ========================= */}

            <main className="auth-main">


                {/* Intro */}

                <section className="auth-intro">

                    <p className="auth-eyebrow">
                        INTERACTIVE CRYPTOGRAPHY
                    </p>


                    <h1>
                        Start your
                        <br />
                        learning journey.
                    </h1>


                    <p>
                        Create an account to explore
                        SHA-256 through interactive
                        visualisations and evaluate
                        your understanding before and
                        after learning.
                    </p>

                </section>


                {/* Register Card */}

                <section className="auth-card">

                    <div className="auth-card-header">

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            It only takes a moment to get started.
                        </p>

                    </div>


                    <div className="auth-form">


                        {/* Username */}

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(
                                    e.target.value
                                )
                            }
                            placeholder="Choose a username"
                            autoComplete="username"
                        />


                        {/* Email */}

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


                        {/* Password */}

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
                            placeholder="Create a password"
                            autoComplete="new-password"
                        />


                        {/* Confirm password */}

                        <label>
                            Confirm password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Repeat your password"
                            autoComplete="new-password"
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter"
                                ) {
                                    handleRegister();
                                }

                            }}
                        />


                        {/* Error */}

                        {error && (

                            <div className="auth-error">
                                {error}
                            </div>

                        )}


                        {/* Register button */}

                        <button
                            className="auth-primary-button"
                            onClick={handleRegister}
                            disabled={loading}
                        >

                            {loading
                                ? "Creating account..."
                                : "Create account"}

                            {!loading && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </div>


                    {/* Divider */}

                    <div className="auth-divider">

                        <span />

                        <span>
                            OR
                        </span>

                        <span />

                    </div>


                    {/* Login link */}

                    <p className="auth-switch">

                        Already have an account?

                        <button
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Sign in
                        </button>

                    </p>

                </section>

            </main>


            {/* Footer */}

            <footer className="auth-footer">

                SHA-256

                <span>
                    •
                </span>

                HASHING

                <span>
                    •
                </span>

                CRYPTOGRAPHY

            </footer>

        </div>

    );
}