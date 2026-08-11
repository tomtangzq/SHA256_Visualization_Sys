import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    preTestQuestions,
} from "../data/preTestQuestions";

import { submitTest } from "../services/test";

import "./PreTestPage.css";


export default function PostTestPage() {

    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [selectedAnswer, setSelectedAnswer] =
        useState<number | null>(null);

    const [answers, setAnswers] =
        useState<number[]>([]);

    const [finished, setFinished] =
        useState(false);

    const [saving, setSaving] =
        useState(false);


    const question =
        preTestQuestions[currentQuestion];

    const totalQuestions =
        preTestQuestions.length;

    const progress =
        ((currentQuestion + 1) / totalQuestions) * 100;


    function handleAnswerSelect(
        answerIndex: number
    ) {

        setSelectedAnswer(answerIndex);

    }


    async function handleContinue() {

        if (selectedAnswer === null) {
            return;
        }

        const updatedAnswers = [
            ...answers,
        ];

        updatedAnswers[currentQuestion] =
            selectedAnswer;

        setAnswers(updatedAnswers);


        if (
            currentQuestion <
            totalQuestions - 1
        ) {

            setCurrentQuestion(
                currentQuestion + 1
            );

            setSelectedAnswer(
                updatedAnswers[
                currentQuestion + 1
                ] ?? null
            );

            return;
        }


        /*
         * Last question
         * Calculate final score
         */

        const score =
            updatedAnswers.reduce(
                (
                    total,
                    answer,
                    index
                ) => {

                    if (
                        answer ===
                        preTestQuestions[
                            index
                        ].correctAnswer
                    ) {

                        return total + 1;

                    }

                    return total;

                },
                0
            );


        try {

            setSaving(true);


            await submitTest(
                "post",
                score,
                totalQuestions
            );


            sessionStorage.setItem(
                "postTestScore",
                score.toString()
            );

            sessionStorage.setItem(
                "postTestTotal",
                totalQuestions.toString()
            );


            setFinished(true);

        }

        catch (error) {

            console.error(
                "Failed to save post-test:",
                error
            );

            alert(
                "Your test result could not be saved. Please try again."
            );

        }

        finally {

            setSaving(false);

        }

    }


    function handleBack() {

        if (currentQuestion === 0) {
            return;
        }


        const previousQuestion =
            currentQuestion - 1;


        setCurrentQuestion(
            previousQuestion
        );


        setSelectedAnswer(
            answers[previousQuestion] ?? null
        );

    }


    if (finished) {

        return (

            <div className="pretest-page">

                <header className="pretest-header">

                    <div className="brand">
                        HashPro
                    </div>

                    <div className="header-center">
                        Post-test
                    </div>

                    <div className="header-status">
                        After learning
                    </div>

                </header>


                <main className="pretest-result">

                    <div className="result-card">

                        <div className="result-icon">
                            ✓
                        </div>

                        <p className="result-eyebrow">
                            POST-TEST COMPLETE
                        </p>

                        <h1>
                            Learning session complete.
                        </h1>

                        <p className="result-description">
                            Your post-test result has
                            been recorded. You can now
                            view your learning results.
                        </p>


                        <div className="score-preview">

                            <span>
                                Your score
                            </span>

                            <strong>
                                {Number(
                                    sessionStorage.getItem(
                                        "postTestScore"
                                    )
                                )}

                                <small>
                                    /{totalQuestions}
                                </small>

                            </strong>

                        </div>


                        <button
                            className="primary-button"
                            onClick={() =>
                                navigate("/result")
                            }
                        >
                            View Results

                            <span>
                                →
                            </span>

                        </button>

                    </div>

                </main>

            </div>

        );

    }


    return (

        <div className="pretest-page">

            <header className="pretest-header">

                <div className="brand">
                    HashPro
                </div>


                <div className="header-center">
                    Post-test
                </div>


                <div className="header-status">
                    After learning
                </div>

            </header>


            <main className="pretest-main">

                <section className="intro-section">

                    <p className="eyebrow">
                        KNOWLEDGE CHECK
                    </p>

                    <h1>
                        What have you learned?
                    </h1>

                    <p>
                        Answer the following questions
                        based on what you have learned
                        in the interactive module.
                    </p>

                </section>


                <section className="question-section">

                    <div className="question-meta">

                        <span>
                            Question{" "}
                            {currentQuestion + 1}
                            {" "}of{" "}
                            {totalQuestions}
                        </span>

                        <span>
                            {Math.round(progress)}%
                        </span>

                    </div>


                    <div className="progress-track">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    `${progress}%`,
                            }}
                        />

                    </div>


                    <div className="question-card">

                        <h2>
                            {question.question}
                        </h2>


                        <div className="options">

                            {question.options.map(
                                (
                                    option,
                                    index
                                ) => {

                                    const isSelected =
                                        selectedAnswer ===
                                        index;


                                    return (

                                        <button
                                            key={index}
                                            className={
                                                `option-button ${isSelected
                                                    ? "selected"
                                                    : ""
                                                }`
                                            }
                                            onClick={() =>
                                                handleAnswerSelect(
                                                    index
                                                )
                                            }
                                        >

                                            <span className="option-letter">

                                                {
                                                    String.fromCharCode(
                                                        65 + index
                                                    )
                                                }

                                            </span>


                                            <span className="option-text">

                                                {option}

                                            </span>


                                            <span className="option-indicator">

                                                {isSelected
                                                    ? "✓"
                                                    : ""}

                                            </span>

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    </div>


                    <div className="question-navigation">

                        <button
                            className="back-button"
                            onClick={handleBack}
                            disabled={
                                currentQuestion === 0 ||
                                saving
                            }
                        >
                            ← Back
                        </button>


                        <button
                            className="continue-button"
                            onClick={
                                handleContinue
                            }
                            disabled={
                                selectedAnswer === null ||
                                saving
                            }
                        >

                            {saving
                                ? "Saving..."
                                : currentQuestion ===
                                    totalQuestions - 1
                                    ? "Finish"
                                    : "Continue"}

                            {!saving && (
                                <span>
                                    →
                                </span>
                            )}

                        </button>

                    </div>

                </section>

            </main>

        </div>

    );

}