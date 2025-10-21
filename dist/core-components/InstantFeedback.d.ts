import React from 'react';
import { QuizQuestion } from '../types';
interface InstantFeedbackProps {
    showInstantFeedback?: boolean;
    incorrectAnswer: boolean;
    correctAnswer: boolean;
    question: QuizQuestion;
    onQuestionSubmit?: (obj: {
        question: QuizQuestion;
        userAnswer: any;
        isCorrect: boolean;
    }) => void;
    userAnswer: any;
}
declare function InstantFeedback({ showInstantFeedback, incorrectAnswer, correctAnswer, question, onQuestionSubmit, userAnswer, }: InstantFeedbackProps): React.JSX.Element;
export default InstantFeedback;
