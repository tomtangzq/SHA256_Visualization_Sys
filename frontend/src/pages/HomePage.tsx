import { useNavigate } from "react-router-dom";

import "./HomePage.css";


export default function HomePage() {

    const navigate = useNavigate();

    const username =
        localStorage.getItem("username") || "Learner";


    return (

        <div className="home-page">

            {/* =========================
                Header
            ========================= */}

            <header className="home-header">

                <div className="home-brand">

                    <div className="home-brand-mark">
                        H
                    </div>

                    <span>
                        HashPro
                    </span>

                </div>


                <div className="home-header-right">

                    <div className="home-user">

                        <div className="home-user-avatar">
                            {username.charAt(0).toUpperCase()}
                        </div>

                        <span>
                            {username}
                        </span>

                    </div>


                    <button
                        className="logout-button"
                        onClick={() => {

                            localStorage.removeItem(
                                "token"
                            );

                            localStorage.removeItem(
                                "username"
                            );

                            navigate("/");

                        }}
                    >
                        Sign out
                    </button>

                </div>

            </header>


            {/* =========================
                Main
            ========================= */}

            <main className="home-main">


                {/* Hero */}

                <section className="home-hero">

                    <div className="home-hero-text">

                        <p className="home-eyebrow">
                            INTERACTIVE CRYPTOGRAPHY
                        </p>


                        <h1>
                            Welcome back,
                            <br />

                            <span>
                                {username}.
                            </span>
                        </h1>


                        <p className="home-hero-description">

                            Explore how cryptographic
                            hashing transforms a message
                            into a fixed-length digest
                            through an interactive
                            SHA-256 journey.

                        </p>

                    </div>


                    <div className="home-hero-symbol">

                        <div className="hash-symbol">

                            <span>
                                H
                            </span>

                        </div>

                        <div className="hash-lines">

                            <span />
                            <span />
                            <span />

                        </div>

                    </div>

                </section>


                {/* Main Learning Card */}

                <section className="learning-card">

                    <div className="learning-card-content">

                        <div className="learning-card-label">
                            CORE LEARNING MODULE
                        </div>


                        <h2>
                            SHA-256 Interactive
                            Learning
                        </h2>


                        <p>

                            Follow a message through
                            each stage of SHA-256,
                            from input and binary
                            representation to message
                            scheduling and the final
                            cryptographic digest.

                        </p>


                        <button
                            className="home-primary-button"
                            onClick={() =>
                                navigate("/pretest")
                            }
                        >

                            Start Pre-test

                            <span>
                                →
                            </span>

                        </button>

                    </div>


                    <div className="learning-card-side">

                        <div className="module-number">
                            08
                        </div>

                        <div className="module-caption">
                            learning stages
                        </div>

                    </div>

                </section>


                {/* Learning Journey */}

                <section className="journey-section">

                    <div className="section-heading">

                        <div>

                            <p className="section-eyebrow">
                                LEARNING JOURNEY
                            </p>

                            <h2>
                                Explore SHA-256
                                step by step
                            </h2>

                        </div>

                    </div>


                    <div className="journey-grid">


                        <div className="journey-item">

                            <span>
                                01
                            </span>

                            <strong>
                                Input
                            </strong>

                            <p>
                                Enter a message
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                02
                            </span>

                            <strong>
                                ASCII
                            </strong>

                            <p>
                                Character encoding
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                03
                            </span>

                            <strong>
                                Binary
                            </strong>

                            <p>
                                Binary representation
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                04
                            </span>

                            <strong>
                                Padding
                            </strong>

                            <p>
                                Prepare the message
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                05
                            </span>

                            <strong>
                                Message Schedule
                            </strong>

                            <p>
                                Expand the message
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                06
                            </span>

                            <strong>
                                Compression
                            </strong>

                            <p>
                                Process the state
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                07
                            </span>

                            <strong>
                                Hash
                            </strong>

                            <p>
                                Update the hash state
                            </p>

                        </div>


                        <div className="journey-item">

                            <span>
                                08
                            </span>

                            <strong>
                                Digest
                            </strong>

                            <p>
                                View the final hash
                            </p>

                        </div>


                    </div>

                </section>


                {/* Evaluation */}

                <section className="evaluation-section">

                    <div className="evaluation-header">

                        <div>

                            <p className="section-eyebrow">
                                EVALUATION
                            </p>

                            <h2>
                                Measure your learning
                            </h2>

                        </div>


                        <p>
                            Your performance is compared
                            before and after the learning
                            module.
                        </p>

                    </div>


                    <div className="evaluation-grid">


                        <div className="evaluation-card">

                            <div className="evaluation-card-top">

                                <span>
                                    01
                                </span>

                                <span className="evaluation-status">
                                    Before learning
                                </span>

                            </div>


                            <h3>
                                Pre-test
                            </h3>


                            <p>
                                Check your initial
                                understanding of
                                cryptographic hashing.
                            </p>


                            <div className="evaluation-state">
                                Ready to begin
                            </div>

                        </div>


                        <div className="evaluation-card">

                            <div className="evaluation-card-top">

                                <span>
                                    02
                                </span>

                                <span className="evaluation-status">
                                    After learning
                                </span>

                            </div>


                            <h3>
                                Post-test
                            </h3>


                            <p>
                                See how your understanding
                                changes after completing
                                the learning module.
                            </p>


                            <div className="evaluation-state">
                                Completed after learning
                            </div>

                        </div>


                    </div>

                </section>


            </main>


            {/* Footer */}

            <footer className="home-footer">

                <span>
                    HashPro
                </span>

                <span>
                    Interactive Cryptographic
                    Hashing Learning System
                </span>

            </footer>

        </div>
    );
}