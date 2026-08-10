import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigate = useNavigate();

    return (

        <div>

            <h1 >Welcome</h1>

            <p>

                Welcome to the SHA-256 Interactive Learning System.

            </p>

            <button
                onClick={() => navigate("/pretest")}
            >
                Start Pre-test
            </button>

        </div>

    );

}