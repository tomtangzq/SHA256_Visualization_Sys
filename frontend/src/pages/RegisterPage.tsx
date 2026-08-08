import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();

    return (

        <div>

            <h1>Register</h1>

            <button
                onClick={() => navigate("/login")}
            >
                Register Successfully
            </button>

        </div>

    );

}