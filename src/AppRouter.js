import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import TestSummaryPage from "./pages/TestSummaryPage";
import ResultPage from "./pages/ResultPage";

function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/test-summary" element={<TestSummaryPage />} />
      <Route path="/results" element={<ResultPage />} />
    </Routes>
  );
}

export default AppRouter;
