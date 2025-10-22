# Quiz Results Guide

## Getting Quiz Results Without Points

This guide explains how to access quiz results, including the number of correct answers and detailed answer states, even when point values are not set.

## Using the `onComplete` Callback

### **Basic Usage:**

```typescript
import Quiz, { QuestionSummary } from 'react-quiz-component';

function MyQuiz() {
  const handleQuizComplete = (summary: QuestionSummary) => {
    // Number of correct answers
    console.log('Correct answers:', summary.numberOfCorrectAnswers);
    console.log('Total questions:', summary.numberOfQuestions);
    console.log('Incorrect answers:', summary.numberOfIncorrectAnswers);
    
    // Detailed state of each question
    console.log('User answers:', summary.userInput);
    console.log('All questions:', summary.questions);
    
    // Points (will be 0 if not set)
    console.log('Points scored:', summary.correctPoints);
    console.log('Total points:', summary.totalPoints);
    
    // Time taken
    console.log('Time taken (seconds):', summary.timeTaken);
  };

  return (
    <Quiz 
      quiz={myQuiz} 
      onComplete={handleQuizComplete}
    />
  );
}
```

## QuestionSummary Interface

The `onComplete` callback receives a `QuestionSummary` object with the following properties:

```typescript
interface QuestionSummary {
  numberOfQuestions: number;           // Total number of questions
  numberOfCorrectAnswers: number;      // ✅ Count of correct answers
  numberOfIncorrectAnswers: number;    // ❌ Count of incorrect answers
  questions: QuizQuestion[];           // Array of all question objects
  userInput: any[];                    // ✅ User's answer for each question
  totalPoints: number;                 // Total possible points (0 if not set)
  correctPoints: number;               // Points earned (0 if not set)
  timeTaken: number;                   // Time taken in seconds
}
```

## Accessing Detailed Answer States

### **Example: Check Each Question's Result**

```typescript
const handleQuizComplete = (summary: QuestionSummary) => {
  // Get number of correct answers
  const correctCount = summary.numberOfCorrectAnswers;
  const totalCount = summary.numberOfQuestions;
  
  console.log(`You got ${correctCount} out of ${totalCount} correct!`);
  
  // Get detailed state of each question
  summary.questions.forEach((question, index) => {
    const userAnswer = summary.userInput[index];
    const correctAnswer = question.correctAnswer;
    
    // Check if answer was correct
    let isCorrect = false;
    if (question.answerSelectionType === 'single') {
      isCorrect = String(userAnswer) === String(correctAnswer);
    } else {
      // Multiple choice - check if arrays match
      isCorrect = JSON.stringify(userAnswer?.sort()) === 
                  JSON.stringify(correctAnswer.sort());
    }
    
    console.log(`Q${index + 1}: ${question.question}`);
    console.log(`  User answered: ${userAnswer}`);
    console.log(`  Correct answer: ${correctAnswer}`);
    console.log(`  Status: ${isCorrect ? '✅ Correct' : '❌ Incorrect'}`);
  });
};
```

## Practical Examples

### **1. Calculate Percentage Score**

```typescript
const handleQuizComplete = (summary: QuestionSummary) => {
  const percentage = (summary.numberOfCorrectAnswers / summary.numberOfQuestions) * 100;
  
  console.log(`Score: ${percentage.toFixed(1)}%`);
  
  if (percentage >= 70) {
    console.log('✅ Passed!');
  } else {
    console.log('❌ Failed. Try again!');
  }
};
```

### **2. Build Custom Results Object**

```typescript
const handleQuizComplete = (summary: QuestionSummary) => {
  const percentage = (summary.numberOfCorrectAnswers / summary.numberOfQuestions) * 100;
  
  const results = {
    score: `${summary.numberOfCorrectAnswers}/${summary.numberOfQuestions}`,
    percentage: `${percentage.toFixed(1)}%`,
    passed: percentage >= 70,
    timeTaken: summary.timeTaken,
    details: summary.questions.map((q, i) => ({
      question: q.question,
      userAnswer: summary.userInput[i],
      correctAnswer: q.correctAnswer,
      wasAnswered: summary.userInput[i] !== undefined,
      explanation: q.explanation
    }))
  };
  
  console.log('Quiz Results:', results);
  
  // Send to API, save to localStorage, etc.
  saveResultsToBackend(results);
};
```

### **3. Display Custom Results Page**

```typescript
import Quiz, { QuestionSummary } from 'react-quiz-component';

function MyQuiz() {
  const customResultPage = (summary: QuestionSummary) => {
    const percentage = (summary.numberOfCorrectAnswers / summary.numberOfQuestions) * 100;
    
    return (
      <div className="custom-results">
        <h2>Quiz Complete!</h2>
        <p>Score: {summary.numberOfCorrectAnswers} / {summary.numberOfQuestions}</p>
        <p>Percentage: {percentage.toFixed(1)}%</p>
        <p>Time: {summary.timeTaken} seconds</p>
        
        <h3>Detailed Results:</h3>
        {summary.questions.map((question, index) => {
          const userAnswer = summary.userInput[index];
          const isCorrect = String(userAnswer) === String(question.correctAnswer);
          
          return (
            <div key={index} className={isCorrect ? 'correct' : 'incorrect'}>
              <h4>Q{index + 1}: {question.question}</h4>
              <p>Your answer: {question.answers[userAnswer - 1]}</p>
              <p>Status: {isCorrect ? '✅ Correct' : '❌ Incorrect'}</p>
              {question.explanation && <p>Explanation: {question.explanation}</p>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Quiz 
      quiz={myQuiz} 
      customResultPage={customResultPage}
      showDefaultResult={false}
    />
  );
}
```

### **4. Save Results to Backend**

```typescript
const handleQuizComplete = async (summary: QuestionSummary) => {
  const results = {
    userId: getCurrentUserId(),
    quizId: myQuiz.quizTitle,
    score: summary.numberOfCorrectAnswers,
    total: summary.numberOfQuestions,
    percentage: (summary.numberOfCorrectAnswers / summary.numberOfQuestions) * 100,
    timeTaken: summary.timeTaken,
    answers: summary.userInput,
    completedAt: new Date().toISOString()
  };
  
  try {
    await fetch('/api/quiz-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
    console.log('Results saved successfully!');
  } catch (error) {
    console.error('Failed to save results:', error);
  }
};
```

### **5. Track Unanswered Questions**

```typescript
const handleQuizComplete = (summary: QuestionSummary) => {
  const unanswered = summary.questions
    .map((q, i) => ({ question: q, index: i }))
    .filter((item) => summary.userInput[item.index] === undefined);
  
  if (unanswered.length > 0) {
    console.log(`Warning: ${unanswered.length} questions were not answered:`);
    unanswered.forEach(item => {
      console.log(`- Q${item.index + 1}: ${item.question.question}`);
    });
  }
};
```

## Per-Question Callback

If you need real-time feedback as each question is answered, use the `onQuestionSubmit` callback:

```typescript
const handleQuestionSubmit = (obj: { 
  question: QuizQuestion; 
  userAnswer: any; 
  isCorrect: boolean 
}) => {
  console.log('Question submitted:');
  console.log('  Question:', obj.question.question);
  console.log('  User answer:', obj.userAnswer);
  console.log('  Is correct:', obj.isCorrect);
  
  // Track progress, send analytics, etc.
  trackQuestionAnswer(obj);
};

<Quiz 
  quiz={myQuiz} 
  onQuestionSubmit={handleQuestionSubmit}
  showInstantFeedback={true}
/>
```

## Key Points

✅ **Works without points**: All answer tracking works even if `point` is undefined  
✅ **Number of correct answers**: Available via `summary.numberOfCorrectAnswers`  
✅ **Detailed answer states**: Access via `summary.userInput` and `summary.questions`  
✅ **Real-time tracking**: Use `onQuestionSubmit` for per-question feedback  
✅ **Custom results**: Use `customResultPage` prop for fully custom result displays  
✅ **TypeScript support**: Full type safety with `QuestionSummary` interface  

## Source Code Reference

The `QuestionSummary` object is created in `src/lib/Core.tsx` (lines 74-85):

```typescript
useEffect(() => {
  setQuestionSummary({
    numberOfQuestions: questions.length,
    numberOfCorrectAnswers: correct.length,
    numberOfIncorrectAnswers: incorrect.length,
    questions,
    userInput,
    totalPoints,
    correctPoints,
    timeTaken: timer ? timer - (timeRemaining || 0) : 0,
  });
}, [totalPoints, correctPoints]);
```

This summary is passed to the `onComplete` callback when the quiz ends.
