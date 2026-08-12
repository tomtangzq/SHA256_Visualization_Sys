import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../services/auth";

import "./AuthPage.css";

import evaLogo from "../assets/eva-logo.png";

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
             * The user is sent to Login
             * instead of being logged in
             * automatically.
             */

            navigate("/login");

        }

        catch (error: any) {

            console.error(
                "Registration failed:",
                error
            );


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


            {/* =================================================
                Background EVA Logo
            ================================================= */}

            <div className="auth-background-logo">

                <img
                    src={evaLogo}
                    alt=""
                />

            </div>


            {/* =================================================
                HUD Frame
            ================================================= */}

            <div className="auth-frame">

                <div
                    className="
                        frame-corner
                        frame-top-left
                    "
                />

                <div
                    className="
                        frame-corner
                        frame-top-right
                    "
                />

                <div
                    className="
                        frame-corner
                        frame-bottom-left
                    "
                />

                <div
                    className="
                        frame-corner
                        frame-bottom-right
                    "
                />

            </div>


            {/* =================================================
                HUD Markers
            ================================================= */}

            <div
                className="
                    hud-marker
                    hud-top-center
                "
            >
                +
            </div>


            <div
                className="
                    hud-marker
                    hud-bottom-center
                "
            >
                +
            </div>


            <div
                className="
                    hud-side-marker
                    left-marker
                "
            >
                01
            </div>


            <div
                className="
                    hud-side-marker
                    right-marker
                "
            >
                01
            </div>



            <header className="auth-brand">

                <div className="brand-mark">
                    #
                </div>


                <div className="brand-text">

                    <div className="brand-title">
                        HASH INSTRUMENTALITY SYSTEM
                    </div>

                </div>

            </header>



            <div className="system-status">

                <div>

                    <span>
                        SYSTEM STATUS
                    </span>

                    <span>
                        :
                    </span>

                    <strong>
                        ONLINE
                    </strong>

                    <i />

                </div>


                <div>

                    <span>
                        MODULE
                    </span>

                    <span>
                        :
                    </span>

                    <span>
                        REGISTRATION
                    </span>

                </div>


                <div>

                    <span>
                        SECURITY LEVEL
                    </span>

                    <span>
                        :
                    </span>

                    <span>
                        01
                    </span>

                </div>

            </div>


            {/* =================================================
                Main
            ================================================= */}

            <main className="auth-main">


                <section className="auth-intro">


                    <p className="auth-eyebrow">

                        /// &nbsp;
                        INSTRUMENTALITY PROJECT

                    </p>


                    <h1>

                        START YOUR
                        <br />

                        LEARNING
                        <br />

                        JOURNEY.

                    </h1>


                    <div className="auth-intro-line" />


                    <p className="auth-terminal-title">

                        SHA-256 INTERACTIVE
                        <br />

                        LEARNING SYSTEM

                    </p>


                    <p>

                        Create an account to explore
                        SHA-256 through interactive
                        visualisations and evaluate
                        your understanding before
                        and after learning.

                    </p>


                    {/* Feature bar */}

                    <div className="auth-feature-bar">

                        <span>
                            ▶
                        </span>

                        <span>
                            SECURE
                        </span>

                        <b>
                            •
                        </b>

                        <span>
                            LEARN
                        </span>

                        <b>
                            •
                        </b>

                        <span>
                            EVALUATION
                        </span>

                        <span>
                            »
                        </span>

                    </div>


                </section>


                <section className="auth-card">


                    {/* Terminal ID */}

                    <div className="terminal-id">
                        TERMINAL-02
                    </div>


                    {/* Card Header */}

                    <div className="auth-card-header">

                        <h2>
                            Registration
                        </h2>


                        <div className="auth-card-line" />


                        <p>
                            NEW USER REGISTRATION
                        </p>

                    </div>




                    <div className="auth-form">


                        {/* Username */}

                        <label htmlFor="register-username">

                            Username

                        </label>


                        <input
                            id="register-username"
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

                        <label htmlFor="register-email">

                            Email

                        </label>


                        <input
                            id="register-email"
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

                        <label htmlFor="register-password">

                            Password

                        </label>


                        <input
                            id="register-password"
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


                        {/* Confirm Password */}

                        <label htmlFor="register-confirm-password">

                            Confirm Password

                        </label>


                        <input
                            id="register-confirm-password"
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


                        {/* Register Button */}

                        <button
                            type="button"
                            className="auth-primary-button"
                            onClick={handleRegister}
                            disabled={loading}
                        >

                            {loading
                                ? "CREATING ACCOUNT..."
                                : "CREATE ACCOUNT"
                            }


                            {!loading && (

                                <span>
                                    ▶
                                </span>

                            )}

                        </button>


                    </div>


                    {/* =================================================
                        Divider
                    ================================================= */}

                    <div className="auth-divider">

                        <span />

                        <span>
                            OR
                        </span>

                        <span />

                    </div>




                    <p className="auth-switch">

                        Already have an account?

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/login")
                            }
                        >

                            LOGIN

                        </button>

                    </p>


                </section>

            </main>




            <footer className="auth-footer">

                <span>
                    HASH INSTRUMENTALITY SYSTEM
                </span>

                <span>
                    SHA-256 / LEARNING TERMINAL
                </span>

            </footer>


        </div>

    );

}