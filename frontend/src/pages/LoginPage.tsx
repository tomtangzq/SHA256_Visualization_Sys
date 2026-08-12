import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";

import "./AuthPage.css";

import evaLogo from "../assets/eva-logo.png";

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


            {/* =================================================
                Brand
            ================================================= */}

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


            {/* =================================================
                System Status
            ================================================= */}

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
                        AUTHENTICATION
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


                {/* =================================================
                    Introduction
                ================================================= */}

                <section className="auth-intro">


                    <p className="auth-eyebrow">

                        /// &nbsp;
                        INSTRUMENTALITY PROJECT

                    </p>


                    <h1>
                        Understand hashing
                        <br />
                        by seeing it
                        <br />
                        happen.
                    </h1>


                    <div className="auth-intro-line" />


                    <p className="auth-terminal-title">

                        SHA-256 INTERACTIVE
                        <br />

                        LEARNING SYSTEM

                    </p>


                    <p>

                        Explore the cryptographic
                        hashing process through
                        interactive visualisations
                        and step-by-step explanations.

                    </p>


                    {/* Feature bar */}

                    <div className="auth-feature-bar">

                        <span>
                            »
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

                        {/* <span>
                            »
                        </span> */}

                    </div>


                </section>


                {/* =================================================
                    Login Card
                ================================================= */}

                <section className="auth-card">


                    {/* Terminal ID */}

                    <div className="terminal-id">
                        TERMINAL-01
                    </div>


                    {/* Card Header */}

                    <div className="auth-card-header">

                        <h2>
                            System Access
                        </h2>


                        <div className="auth-card-line" />


                        <p>
                            AUTHENTICATION REQUIRED
                        </p>

                    </div>


                    {/* =================================================
                        Login Form
                    ================================================= */}

                    <div className="auth-form">


                        {/* Email */}

                        <label htmlFor="login-email">

                            Email

                        </label>


                        <input
                            id="login-email"
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

                        <label htmlFor="login-password">

                            Password

                        </label>


                        <input
                            id="login-password"
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


                        {/* Error */}

                        {error && (

                            <div className="auth-error">

                                {error}

                            </div>

                        )}


                        {/* Login button */}

                        <button
                            type="button"
                            className="auth-primary-button"
                            onClick={handleLogin}
                            disabled={loading}
                        >

                            {loading
                                ? "AUTHENTICATING..."
                                : "LOGIN"
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


                    {/* =================================================
                        Register
                    ================================================= */}

                    <p className="auth-switch">

                        Don't have an account?

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/register")
                            }
                        >

                            CREATE ACCOUNT

                        </button>

                    </p>


                </section>

            </main>


            {/* =================================================
                Footer
            ================================================= */}

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