import { useNavigate } from "react-router-dom";

export default function PostTestPage() {

    const navigate = useNavigate();

    return (

        <div>

            <h1>Post-test</h1>

            <button
                onClick={() => navigate("/result")}
            >
                Submit
            </button>

        </div>

    );

}