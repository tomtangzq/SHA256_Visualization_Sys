import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PreTestPage from "./pages/PreTestPage";
import LearningPage from "./pages/LearningPage";
import PostTestPage from "./pages/PostTestPage";
import ResultPage from "./pages/ResultPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/home"
          element={<HomePage />}
        />

        <Route
          path="/pretest"
          element={<PreTestPage />}
        />

        <Route
          path="/learning"
          element={<LearningPage />}
        />

        <Route
          path="/posttest"
          element={<PostTestPage />}
        />

        <Route
          path="/result"
          element={<ResultPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;