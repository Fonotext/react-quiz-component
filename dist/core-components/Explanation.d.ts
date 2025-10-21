import React from 'react';
import { QuizQuestion } from '../types';
interface ExplanationProps {
    question: QuizQuestion;
    isResultPage: boolean;
}
declare function Explanation({ question, isResultPage }: ExplanationProps): React.JSX.Element;
export default Explanation;
