import { useCallback, useEffect, useState } from "react";
import { Question } from "./useQuestion";

interface ScoreMap {
  [key: string]: {
    correct: number;
    incorrect: number;
  };
}

const useScore = () => {
  const [scoreMap, setScoreMap] = useState<ScoreMap>({});
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>(
    []
  );

  const saveQuizResult = useCallback(() => {
    // Save accumulated score
    const accumulatedScoreMapStr = localStorage.getItem("accumulatedScoreMap");
    if (accumulatedScoreMapStr) {
      const accumulatedScoreMap: ScoreMap = JSON.parse(accumulatedScoreMapStr);
      const result: ScoreMap = {};

      for (let key in accumulatedScoreMap) {
        if (scoreMap.hasOwnProperty(key)) {
          result[key] = {
            correct: accumulatedScoreMap[key].correct + scoreMap[key].correct,
            incorrect:
              accumulatedScoreMap[key].incorrect + scoreMap[key].incorrect,
          };
        }
      }
      localStorage.setItem("accumulatedScoreMap", JSON.stringify(result));
    } else {
      localStorage.setItem("accumulatedScoreMap", JSON.stringify(scoreMap));
    }

    // save quiz history
    const quizRecord = {
      date: new Date().toISOString(),
      scoreMap,
      incorrectQuestionIds,
    };
    const quizHistoryStr = localStorage.getItem("quizHistory");
    if (quizHistoryStr) {
      const quizHistory = JSON.parse(quizHistoryStr);
      quizHistory.push(quizRecord);
    } else {
      localStorage.setItem("quizHistory", JSON.stringify([{ ...quizRecord }]));
    }
  }, [incorrectQuestionIds, scoreMap]);

  useEffect(() => {
    console.log({ scoreMap });
    localStorage.setItem("scoreMap", JSON.stringify(scoreMap));
  }, [scoreMap]);

  useEffect(() => {
    if (incorrectQuestionIds !== null && incorrectQuestionIds.length > 0) {
      localStorage.setItem(
        "incorrectQuestionIds",
        JSON.stringify(incorrectQuestionIds)
      );
    }
  }, [incorrectQuestionIds]);

  const clearScoreMap = useCallback(() => {
    localStorage.removeItem("scoreMap");
    setScoreMap({});
  }, []);

  const increment = useCallback((question: Question) => {
    setScoreMap((prev) => ({
      ...prev,
      [question.category]: {
        correct: (prev[question.category]?.correct || 0) + 1,
        incorrect: prev[question.category]?.incorrect || 0,
      },
    }));
    setIncorrectQuestionIds((prev) => {
      if (prev.includes(question.id))
        return prev.filter((id) => id !== question.id);
      return prev;
    });
  }, []);

  const decrement = useCallback((question: Question) => {
    setScoreMap((prev) => ({
      ...prev,
      [question.category]: {
        correct: prev[question.category]?.correct || 0,
        incorrect: (prev[question.category]?.incorrect || 0) + 1,
      },
    }));
    setIncorrectQuestionIds((prev) => {
      if (prev.includes(question.id)) return prev;
      return [...prev, question.id];
    });
  }, []);

  const totalScore = Object.values(scoreMap).reduce(
    (acc, curr) => acc + curr.correct,
    0
  );

  return {
    scoreMap,
    totalScore,
    increment,
    decrement,
    clearScoreMap,
    saveQuizResult,
  };
};

export default useScore;
