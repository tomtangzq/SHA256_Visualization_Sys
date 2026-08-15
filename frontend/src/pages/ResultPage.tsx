import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTestResults } from "../services/test";

import "./ResultPage.css";


type TestResult = {

    score: number;

    total: number;

    created_at: string | null;

};


export default function ResultPage() {

    const navigate = useNavigate();


    const [pre, setPre] =
        useState<TestResult | null>(null);

    const [post, setPost] =
        useState<TestResult | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        async function loadResults() {

            try {

                const response =
                    await getTestResults();

                console.log(
                    "Test results:",
                    response.data
                );


                setPre(
                    response.data.pre
                );

                setPost(
                    response.data.post
                );

            }

            catch (error) {

                console.error(
                    "Failed to load results:",
                    error
                );

                setError(
                    "Unable to load your results."
                );

            }

            finally {

                setLoading(false);

            }

        }


        loadResults();

    }, []);


    if (loading) {

        return (

            <div className="result-page">

                <div className="result-loading">

                    Loading your results...

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="result-page">

                <div className="result-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() =>
                            navigate("/home")
                        }
                    >
                        Back to Home
                    </button>

                </div>

            </div>

        );

    }


    /*
     * Calculate improvement
     */

    const improvement =
        pre && post
            ? post.score - pre.score
            : null;


    const prePercentage =
        pre
            ? Math.round(
                (pre.score / pre.total) * 100
            )
            : 0;


    const postPercentage =
        post
            ? Math.round(
                (post.score / post.total) * 100
            )
            : 0;


    return (

        <div className="result-page">

            {/* Header */}

            <header className="pretest-header">

                <div className="home-brand">

                    HASH INSTRUMENTALITY SYSTEM

                </div>


                <div className="header-center">
                    Learning Results
                </div>


                <div className="header-status">
                    Evaluation
                </div>

            </header>


            {/* Main */}

            <main className="result-main">

                <section className="result-intro">

                    <p className="result-eyebrow">
                        LEARNING RESULTS
                    </p>


                    <h1>
                        Your learning journey
                        is complete.
                    </h1>


                    <p>
                        Compare your performance
                        before and after completing
                        the interactive learning
                        module.
                    </p>

                </section>


                {/* Score cards */}

                <section className="score-grid">


                    {/* Pre-test */}

                    <div className="score-card">

                        <p className="score-label">
                            PRE-TEST
                        </p>


                        {pre ? (

                            <>
                                <div className="score-number">

                                    {pre.score}

                                    <span>
                                        /{pre.total}
                                    </span>

                                </div>


                                <div className="score-percentage">
                                    {prePercentage}%
                                </div>


                                <p className="score-description">
                                    Before learning
                                </p>
                            </>

                        ) : (

                            <p>
                                No result available
                            </p>

                        )}

                    </div>


                    {/* Arrow */}

                    <div className="score-arrow">
                        →
                    </div>


                    {/* Post-test */}

                    <div className="score-card post-score">

                        <p className="score-label">
                            POST-TEST
                        </p>


                        {post ? (

                            <>
                                <div className="score-number">

                                    {post.score}

                                    <span>
                                        /{post.total}
                                    </span>

                                </div>


                                <div className="score-percentage">
                                    {postPercentage}%
                                </div>


                                <p className="score-description">
                                    After learning
                                </p>
                            </>

                        ) : (

                            <p>
                                No result available
                            </p>

                        )}

                    </div>

                </section>


                {/* Improvement */}

                {improvement !== null && (

                    <section className="improvement-card">

                        <p className="improvement-label">
                            SCORE CHANGE
                        </p>


                        <div className="improvement-value">

                            {improvement >= 0
                                ? "+"
                                : ""}

                            {improvement}

                            <span>
                                points
                            </span>

                        </div>


                        <p>

                            {improvement > 0
                                ? "Your score improved after completing the learning module."
                                : improvement === 0
                                    ? "Your score remained the same after completing the learning module."
                                    : "Your score decreased after completing the learning module."}

                        </p>

                    </section>

                )}


                {/* Actions */}

                <div className="result-actions">

                    <button
                        className="result-secondary-button"
                        onClick={() =>
                            navigate("/learning")
                        }
                    >
                        <span>
                            ←
                        </span>

                        Review Learning

                    </button>


                    <button
                        className="result-primary-button"
                        onClick={() =>
                            navigate("/home")
                        }
                    >
                        Back to Home

                    </button>

                </div>

            </main>

        </div>

    );

}