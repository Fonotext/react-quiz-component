import React from 'react';
import { AppLocale } from '../types';
type FilterValue = 'all' | 'correct' | 'incorrect' | 'unanswered';
interface QuizResultFilterProps {
    filteredValue: FilterValue;
    handleChange: (event: {
        target: {
            value: FilterValue;
        };
    }) => void;
    appLocale: AppLocale;
}
declare function QuizResultFilter({ filteredValue, handleChange, appLocale }: QuizResultFilterProps): React.JSX.Element;
export default QuizResultFilter;
