import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    preTestQuestions,
} from "../data/preTestQuestions";

import "./PreTestPage.css";

import { submitTest } from "../services/test";


export default function PreTestPage() {

    const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [selectedAnswer, setSelectedAnswer] =
        useState<number | null>(null);

    const [answers, setAnswers] =
        useState<number[]>([]);

    const [finished, setFinished] =
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

        } else {

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

                await submitTest(
                    "pre",
                    score,
                    totalQuestions
                );


                sessionStorage.setItem(
                    "preTestScore",
                    score.toString()
                );

                sessionStorage.setItem(
                    "preTestTotal",
                    totalQuestions.toString()
                );


                setFinished(true);

            }

            catch (error) {

                console.error(
                    "Failed to save pre-test:",
                    error
                );

                alert(
                    "Your test could not be saved. Please try again."
                );

            }

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

        const score =
            Number(
                sessionStorage.getItem(
                    "preTestScore"
                )
            );


        return (

            <div className="pretest-page">

                <header className="pretest-header">

                    <div className="header-brand">
                        HASH INSTRUMENTALITY SYSTEM
                    </div>


                    <div className="header-center">
                        Pre-test
                    </div>

                </header>


                <main className="pretest-result">

                    <div className="result-card">

                        <div className="result-icon">
                            ✓
                        </div>

                        <p className="result-eyebrow">
                            PRE-TEST COMPLETE
                        </p>

                        <h1>
                            You're ready to learn.
                        </h1>

                        <p className="result-description">
                            Your starting knowledge has
                            been recorded. Next, explore
                            the interactive learning module.
                        </p>


                        <div className="score-preview">

                            <span>
                                Your score
                            </span>

                            <strong>
                                {score}
                                <small>
                                    /{totalQuestions}
                                </small>
                            </strong>

                        </div>


                        <button
                            className="primary-button"
                            onClick={() =>
                                navigate("/learning")
                            }
                        >
                            Start

                        </button>

                    </div>

                </main>

            </div>

        );

    }


    return (

        <div className="pretest-page">

            {/* Header */}

            <header className="pretest-header">

                <div className="header-brand">
                    HASH INSTRUMENTALITY SYSTEM
                </div>


                <div className="header-center">
                    Pre-test
                </div>


                <div className="header-status">
                    Before learning
                </div>

            </header>


            {/* Main */}

            <main className="pretest-main">

                <section className="intro-section">

                    <p className="eyebrow">
                        KNOWLEDGE CHECK
                    </p>

                    <h1>
                        Test your understanding
                    </h1>

                    <p>
                        Before you start learning,
                        let's see what you already know
                        about cryptographic hashing.
                    </p>

                </section>


                <section className="question-section">

                    {/* Progress */}

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


                    {/* Question */}

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


                    {/* Navigation */}

                    <div className="question-navigation">

                        <button
                            className="back-button"
                            onClick={handleBack}
                            disabled={
                                currentQuestion === 0
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
                                selectedAnswer === null
                            }
                        >
                            {currentQuestion ===
                                totalQuestions - 1
                                ? "Finish"
                                : "Continue"}

                            <span>
                                →
                            </span>

                        </button>

                    </div>

                </section>

            </main>

        </div>

    );

}