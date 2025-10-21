import React from 'react';
interface ProgressBarProps {
    progressBarColor?: string;
    progress: number;
    height?: string;
    quizLength: number;
    isEndQuiz: boolean;
}
declare function ProgressBar({ progressBarColor, progress, height, quizLength, isEndQuiz, }: ProgressBarProps): React.JSX.Element;
export default ProgressBar;
