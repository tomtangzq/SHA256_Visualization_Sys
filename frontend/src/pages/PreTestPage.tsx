import { useNavigate } from "react-router-dom";

export default function PreTestPage() {

    const navigate = useNavigate();

    return (

        <div>

            <h1>Pre-test</h1>

            <button
                onClick={() => navigate("/learning")}
            >
                Finish Pre-test
            </button>

        </div>

    );

}