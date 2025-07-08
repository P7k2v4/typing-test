
'use client';
import { useEffect, useState, useRef } from 'react';
import { COMMON_WORDS } from '@/app/utils/commonwords';

const getRandomWords = (count = 40) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    result.push(word);
  }
  return result.join(' ');
};

export default function TypingTest() {
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [errorMap, setErrorMap] = useState({});
  const [errorIndexes, setErrorIndexes] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);

  // Initial text load
  useEffect(() => {
    loadNewText();
  }, []);

  const loadNewText = () => {
    const text = getRandomWords(40);
    setTargetText(text);
  };

  // Timer logic
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [timerStarted, timeLeft]);

  // Auto-append more words
  useEffect(() => {
    if (targetText.length - userInput.length < 20) {
      setTargetText(prev => prev + ' ' + getRandomWords(10));
    }
  }, [userInput, targetText.length]);


  const handleInput = (e) => {
    const value = e.target.value;
    if (!timerStarted) setTimerStarted(true);
    if (isComplete) return;

    if (value.length < userInput.length) {
      setUserInput(value);
      return;
    }

    const newErrors = { ...errorMap };
    const newErrorIndexes = new Set(errorIndexes);

    for (let i = userInput.length; i < value.length; i++) {
      const correctChar = targetText[i];
      const typedChar = value[i];

      if (typedChar !== correctChar && !newErrorIndexes.has(i)) {
        newErrorIndexes.add(i);
        if (!newErrors[correctChar]) newErrors[correctChar] = {};
        if (!newErrors[correctChar][typedChar]) newErrors[correctChar][typedChar] = 0;
        newErrors[correctChar][typedChar] += 1;
      }
    }

    setErrorMap(newErrors);
    setErrorIndexes(newErrorIndexes);
    setUserInput(value);
  };

  const restartTest = () => {
    clearInterval(timerRef.current);
    setUserInput('');
    setErrorMap({});
    setErrorIndexes(new Set());
    setTimeLeft(60);
    setTimerStarted(false);
    setIsComplete(false);
    const newText = getRandomWords(40);
    setTargetText(newText);
  };

  const totalTyped = userInput.length;
  const correctChars = Array.from(userInput).filter((ch, i) => ch === targetText[i]).length;
  const wpm = Math.round((correctChars / 5) / ((60 - timeLeft) / 60 || 1));
  const accuracy = totalTyped ? ((correctChars / totalTyped) * 100).toFixed(1) : 0;



const renderErrorReport = () => {
  const report = [];

  for (const correct in errorMap) {
    for (const wrong in errorMap[correct]) {
      const count = errorMap[correct][wrong];
      report.push({ correct, wrong, count });
    }
  }

  // Sort by mistake frequency (highest first)
  report.sort((a, b) => b.count - a.count);

  return report.length > 0 ? (
    <ul className="list-group list-group-flush">
      {report.map((entry, idx) => (
        <li key={idx} className="list-group-item">
          {/* You mistyped "<strong>{entry.correct}</strong>" as "<strong>{entry.wrong}</strong>" {entry.count} {entry.count === 1 ? 'time' : 'times'}. */}
        You mistyped &quot;{entry.correct}&quot; as &quot;{entry.wrong}&quot; {entry.count} {entry.count === 1 ? 'time' : 'times'}.


        </li>
      ))}
    </ul>
  ) : (
    <p className="text-success">No typing errors recorded 🎉</p>
  );
};


  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow-lg p-4">
        <h2 className="mb-3 text-center text-primary">Typing Test</h2>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span><strong>⏱ Time Left:</strong> {timeLeft}s</span>
          {timerStarted && !isComplete && <span className="badge bg-warning text-dark">Test Running</span>}
          {isComplete && <span className="badge bg-success">Test Complete</span>}
        </div>

        <div
          className="border rounded p-3 mb-3 bg-light"
          style={{ fontFamily: 'monospace', minHeight: '120px', lineHeight: '1.8rem' }}
        >
          {targetText.split('').map((char, i) => {
            let className = 'text-secondary';

            if (userInput[i] == null) className = 'text-muted';
            else if (userInput[i] === char) className = 'text-success';
            else className = 'text-danger';

            const bg = i === userInput.length ? 'bg-warning px-1 rounded' : '';
            return (
              <span key={i} className={`${className} ${bg}`}>
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          className="form-control mb-4"
          rows="4"
          placeholder="Start typing here..."
          value={userInput}
          onChange={handleInput}
          disabled={isComplete}
          style={{ fontFamily: 'monospace' }}
        />

        {isComplete && (
          <div className="alert alert-info">
            <h5>✅ Typing Summary</h5>
            <p><strong>WPM:</strong> {wpm}</p>
            <p><strong>Accuracy:</strong> {accuracy}%</p>
          </div>
        )}

        {isComplete && (
          <>
            <h5 className="mt-4">📊 Mistyped Letters</h5>
            {renderErrorReport()}
          </>
        )}

        <div className="text-center mt-4">
          <button className="btn btn-outline-primary px-4" onClick={restartTest}>
            🔁 Restart Test
          </button>
        </div>
      </div>
    </div>
  );
}
