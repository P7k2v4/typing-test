// 'use client';
// import { useState, useEffect } from 'react';

// const targetText = 'The quick brown fox jumps over the lazy dog';

// export default function TypingTest() {
//   const [userInput, setUserInput] = useState('');
//   const [startTime, setStartTime] = useState(null);
//   const [wpm, setWpm] = useState(0);

//   useEffect(() => {
//     if (userInput.length === 1 && !startTime) {
//       setStartTime(Date.now());
//     }

//     if (startTime) {
//       const minutes = (Date.now() - startTime) / 1000 / 60;
//       const wordsTyped = userInput.trim().split(/\s+/).length;
//       setWpm(Math.round(wordsTyped / minutes));
//     }
//   }, [userInput]);

//   const renderText = () => {
//     return targetText.split('').map((char, i) => {
//       let className = 'text-secondary';
//       if (userInput[i] == null) className = 'text-muted';
//       else if (userInput[i] === char) className = 'text-success';
//       else className = 'text-danger';
//       return (
//         <span key={i} className={className}>
//           {char}
//         </span>
//       );
//     });
//   };

//   const getAccuracy = () => {
//     let correct = 0;
//     for (let i = 0; i < userInput.length; i++) {
//       if (userInput[i] === targetText[i]) correct++;
//     }
//     return userInput.length ? ((correct / userInput.length) * 100).toFixed(1) : 0;
//   };

//   return (
//     <div>
//       <h1 className="mb-3">Typing Test (JS + Bootstrap)</h1>

//       <div className="mb-3 fs-5 fw-semibold">{renderText()}</div>

//       <textarea
//         className="form-control mb-3"
//         rows={4}
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         placeholder="Start typing here..."
//       ></textarea>

//       <p><strong>WPM:</strong> {wpm}</p>
//       <p><strong>Accuracy:</strong> {getAccuracy()}%</p>
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';

// const targetText = 'The quick brown fox jumps over the lazy dog';

// export default function TypingTest() {
//   const [userInput, setUserInput] = useState('');
//   const [wrongMap, setWrongMap] = useState({});

//   const handleInput = (e) => {
//     const value = e.target.value;
//     setUserInput(value);

//     const errors = {};
//     for (let i = 0; i < value.length; i++) {
//       const correctChar = targetText[i];
//       const typedChar = value[i];

//       if (typedChar !== correctChar) {
//         errors[correctChar] = typedChar;
//       }
//     }
//     setWrongMap(errors);
//   };

//   return (
//     <div>
//       <h2>Typing Test with Error Mapping</h2>

//       <p className="fs-5 fw-bold">
//         {targetText.split('').map((char, i) => {
//           let color = 'text-secondary';
//           if (userInput[i] == null) color = 'text-muted';
//           else if (userInput[i] === char) color = 'text-success';
//           else color = 'text-danger';

//           return (
//             <span key={i} className={color}>
//               {char}
//             </span>
//           );
//         })}
//       </p>

//       <textarea
//         rows="4"
//         className="form-control mb-3"
//         placeholder="Start typing here..."
//         value={userInput}
//         onChange={handleInput}
//       ></textarea>

//       <h5>Wrongly Typed Letters:</h5>
//       <pre>{JSON.stringify(wrongMap, null, 2)}</pre>
//     </div>
//   );
// }


// 'use client';
// import { useState } from 'react';

// const targetText = 'The quick brown fox jumps over the lazy dog';

// export default function TypingTest() {
//   const [userInput, setUserInput] = useState('');
//   const [errorMap, setErrorMap] = useState({}); // keeps track of all wrong attempts

//   const handleInput = (e) => {
//     const value = e.target.value;

//     // Compare only new characters
//     const newCharIndex = value.length - 1;
//     const typedChar = value[newCharIndex];
//     const correctChar = targetText[newCharIndex];

//     // If the user is deleting characters, do nothing (don’t erase history)
//     if (value.length < userInput.length) {
//       setUserInput(value);
//       return;
//     }

//     // Update only if the typed char is wrong
//     if (typedChar && correctChar && typedChar !== correctChar) {
//       setErrorMap((prev) => {
//         const updated = { ...prev };

//         if (!updated[correctChar]) updated[correctChar] = {};
//         if (!updated[correctChar][typedChar]) updated[correctChar][typedChar] = 0;

//         updated[correctChar][typedChar] += 1;
//         return updated;
//       });
//     }

//     setUserInput(value);
//   };

//   return (
//     <div>
//       <h2 className="mb-3">Typing Test with Error Tracking</h2>

//       <p className="fs-5 fw-bold">
//         {targetText.split('').map((char, i) => {
//           let color = 'text-secondary';
//           if (userInput[i] == null) color = 'text-muted';
//           else if (userInput[i] === char) color = 'text-success';
//           else color = 'text-danger';

//           return (
//             <span key={i} className={color}>
//               {char}
//             </span>
//           );
//         })}
//       </p>

//       <textarea
//         rows="4"
//         className="form-control mb-3"
//         placeholder="Start typing here..."
//         value={userInput}
//         onChange={handleInput}
//       ></textarea>

//       <h5>📊 Mistyped Letter Report</h5>
//       <pre>{JSON.stringify(errorMap, null, 2)}</pre>
//     </div>
//   );
// }


// 'use client';
// import { useState } from 'react';

// const targetText = 'The quick brown fox jumps over the lazy dog';

// export default function TypingTest() {
//   const [userInput, setUserInput] = useState('');
//   const [errorMap, setErrorMap] = useState({});
//   const [errorIndexes, setErrorIndexes] = useState(new Set());

//   const handleInput = (e) => {
//     const value = e.target.value;

//     // Backspace: skip error counting
//     if (value.length < userInput.length) {
//       setUserInput(value);
//       return;
//     }

//     const newErrors = { ...errorMap };
//     const newErrorIndexes = new Set(errorIndexes); // copy current set

//     // Check new characters only
//     for (let i = userInput.length; i < value.length; i++) {
//       const correctChar = targetText[i];
//       const typedChar = value[i];

//       // Record error only if wrong & not already recorded at this index
//       if (typedChar !== correctChar && !newErrorIndexes.has(i)) {
//         newErrorIndexes.add(i); // mark index as processed

//         if (!newErrors[correctChar]) newErrors[correctChar] = {};
//         if (!newErrors[correctChar][typedChar]) newErrors[correctChar][typedChar] = 0;

//         newErrors[correctChar][typedChar] += 1;
//       }
//     }

//     setErrorMap(newErrors);
//     setErrorIndexes(newErrorIndexes);
//     setUserInput(value);
//   };

//   return (
//     <div>
//       <h2 className="mb-3">Typing Test with Error Frequency</h2>

//       <p className="fs-5 fw-bold">
//         {targetText.split('').map((char, i) => {
//           let color = 'text-secondary';
//           if (userInput[i] == null) color = 'text-muted';
//           else if (userInput[i] === char) color = 'text-success';
//           else color = 'text-danger';

//           return (
//             <span key={i} className={color}>
//               {char}
//             </span>
//           );
//         })}
//       </p>

//       <textarea
//         rows="4"
//         className="form-control mb-3"
//         placeholder="Start typing here..."
//         value={userInput}
//         onChange={handleInput}
//       ></textarea>

//       <h5>📊 Mistyped Letter Report</h5>
//       <pre>{JSON.stringify(errorMap, null, 2)}</pre>
//     </div>
//   );
// }


// 'use client';
// import { useEffect, useState, useRef } from 'react';

// // Sample word list (you can extend this or use an API)
// const WORDS = [
//   'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
//   'cat', 'runs', 'fast', 'slow', 'zebra', 'tiger', 'elephant',
//   'moon', 'sun', 'star', 'light', 'dark', 'tree', 'leaf', 'river'
// ];

// function generateWords(count = 20) {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     const word = WORDS[Math.floor(Math.random() * WORDS.length)];
//     result.push(word);
//   }
//   return result.join(' ');
// }

// export default function TypingTest() {
//   const [targetText, setTargetText] = useState(generateWords(30));
//   const [userInput, setUserInput] = useState('');
//   const [errorMap, setErrorMap] = useState({});
//   const [errorIndexes, setErrorIndexes] = useState(new Set());
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const timerRef = useRef(null);

//   // Start timer
//   useEffect(() => {
//     if (timerStarted && timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft(prev => prev - 1);
//       }, 1000);
//     }

//     return () => clearInterval(timerRef.current);
//   }, [timerStarted]);

//   // Stop typing after time ends
//   const typingEnded = timeLeft === 0;

//   // Generate more text as needed
//   useEffect(() => {
//     if (targetText.length - userInput.length < 20) {
//       setTargetText(prev => prev + ' ' + generateWords(10));
//     }
//   }, [userInput]);

//   const handleInput = (e) => {
//     const value = e.target.value;
//     if (!timerStarted) setTimerStarted(true);

//     // Disallow typing after time is up
//     if (typingEnded) return;

//     if (value.length < userInput.length) {
//       setUserInput(value);
//       return;
//     }

//     const newErrors = { ...errorMap };
//     const newErrorIndexes = new Set(errorIndexes);

//     for (let i = userInput.length; i < value.length; i++) {
//       const correctChar = targetText[i];
//       const typedChar = value[i];

//       if (typedChar !== correctChar && !newErrorIndexes.has(i)) {
//         newErrorIndexes.add(i);

//         if (!newErrors[correctChar]) newErrors[correctChar] = {};
//         if (!newErrors[correctChar][typedChar]) newErrors[correctChar][typedChar] = 0;
//         newErrors[correctChar][typedChar] += 1;
//       }
//     }

//     setErrorMap(newErrors);
//     setErrorIndexes(newErrorIndexes);
//     setUserInput(value);
//   };

//   return (
//     <div>
//       <h2 className="mb-3">Typing Test</h2>
//       <p><strong>⏱ Time Left:</strong> {timeLeft} sec</p>

//       <p className="fs-5 fw-bold border p-2" style={{ fontFamily: 'monospace' }}>
//         {targetText.split('').map((char, i) => {
//           let color = 'text-secondary';
//           if (userInput[i] == null) color = 'text-muted';
//           else if (userInput[i] === char) color = 'text-success';
//           else color = 'text-danger';
//           return (
//             <span key={i} className={color}>
//               {char}
//             </span>
//           );
//         })}
//       </p>

//       <textarea
//         className="form-control my-3"
//         rows="4"
//         placeholder="Start typing here..."
//         value={userInput}
//         onChange={handleInput}
//         disabled={typingEnded}
//       />

//       <h5>📊 Mistyped Letter Report</h5>
//       <pre>{JSON.stringify(errorMap, null, 2)}</pre>

//       {typingEnded && (
//         <div className="alert alert-info mt-3">
//           ⏰ Time's up! Your typing session is over.
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';
// import { useEffect, useState, useRef } from 'react';

// const WORDS = [
//   'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
//   'cat', 'runs', 'fast', 'slow', 'zebra', 'tiger', 'elephant',
//   'moon', 'sun', 'star', 'light', 'dark', 'tree', 'leaf', 'river'
// ];

// function generateWords(count = 20) {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
//   }
//   return result.join(' ');
// }

// export default function TypingTest() {
//   const [targetText, setTargetText] = useState(generateWords(30));
//   const [userInput, setUserInput] = useState('');
//   const [errorMap, setErrorMap] = useState({});
//   const [errorIndexes, setErrorIndexes] = useState(new Set());
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const timerRef = useRef(null);

//   // Start and stop timer
//   useEffect(() => {
//     if (timerStarted && timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             setIsComplete(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(timerRef.current);
//   }, [timerStarted]);

//   // Auto-grow target string
//   useEffect(() => {
//     if (targetText.length - userInput.length < 20) {
//       setTargetText(prev => prev + ' ' + generateWords(10));
//     }
//   }, [userInput]);

//   const handleInput = (e) => {
//     const value = e.target.value;

//     if (!timerStarted) setTimerStarted(true);
//     if (isComplete) return;

//     if (value.length < userInput.length) {
//       setUserInput(value);
//       return;
//     }

//     const newErrors = { ...errorMap };
//     const newErrorIndexes = new Set(errorIndexes);

//     for (let i = userInput.length; i < value.length; i++) {
//       const correctChar = targetText[i];
//       const typedChar = value[i];

//       if (typedChar !== correctChar && !newErrorIndexes.has(i)) {
//         newErrorIndexes.add(i);

//         if (!newErrors[correctChar]) newErrors[correctChar] = {};
//         if (!newErrors[correctChar][typedChar]) newErrors[correctChar][typedChar] = 0;

//         newErrors[correctChar][typedChar] += 1;
//       }
//     }

//     setErrorMap(newErrors);
//     setErrorIndexes(newErrorIndexes);
//     setUserInput(value);
//   };

//   const restartTest = () => {
//     clearInterval(timerRef.current);
//     setUserInput('');
//     setTargetText(generateWords(30));
//     setErrorMap({});
//     setErrorIndexes(new Set());
//     setTimeLeft(60);
//     setTimerStarted(false);
//     setIsComplete(false);
//   };

//   // WPM = total correct chars / 5 / minutes
//   const totalTyped = userInput.length;
//   const correctChars = Array.from(userInput).filter((ch, i) => ch === targetText[i]).length;
//   const wpm = Math.round((correctChars / 5) / ((60 - timeLeft) / 60 || 1));

//   const accuracy = totalTyped
//     ? ((correctChars / totalTyped) * 100).toFixed(1)
//     : 0;

//   return (
//     <div>
//       <h2 className="mb-3">Typing Test</h2>

//       <p><strong>⏱ Time Left:</strong> {timeLeft}s</p>

//       <div className="border p-3 mb-3" style={{ fontFamily: 'monospace', minHeight: '100px' }}>
//         {targetText.split('').map((char, i) => {
//           let color = 'text-secondary';
//           if (userInput[i] == null) color = 'text-muted';
//           else if (userInput[i] === char) color = 'text-success';
//           else color = 'text-danger';
//           return (
//             <span key={i} className={color}>
//               {char}
//             </span>
//           );
//         })}
//       </div>

//       <textarea
//         className="form-control mb-3"
//         rows="4"
//         placeholder="Start typing here..."
//         value={userInput}
//         onChange={handleInput}
//         disabled={isComplete}
//       />

//       {isComplete && (
//         <>
//           <div className="alert alert-success">
//             <h5>✅ Typing Complete!</h5>
//             <p><strong>WPM:</strong> {wpm}</p>
//             <p><strong>Accuracy:</strong> {accuracy}%</p>
//           </div>

//           <h5>📊 Mistyped Letters</h5>
//           <pre>{JSON.stringify(errorMap, null, 2)}</pre>
//         </>
//       )}

//       <button className="btn btn-primary mt-3" onClick={restartTest}>
//         🔁 Restart Test
//       </button>
//     </div>
//   );
// }


// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import { COMMON_WORDS } from '@/app/utils/commonwords';

// // const fetchWordsFromAPI = async (count = 40) => {
// //   const res = await fetch(`https://random-word-api.herokuapp.com/word?number=${count}`);
// //   const data = await res.json();
// //   return data.join(' ');
// // };
// const getRandomWords = (count = 40) => {
//   const result = [];
//   for (let i = 0; i < count; i++) {
//     const word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
//     result.push(word);
//   }
//   return result.join(' ');
// };

// export default function TypingTest() {
//   const [targetText, setTargetText] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [errorMap, setErrorMap] = useState({});
//   const [errorIndexes, setErrorIndexes] = useState(new Set());
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [timerStarted, setTimerStarted] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const timerRef = useRef(null);

//   // Load initial words from API
//   useEffect(() => {
//     loadNewText();
//   }, []);

//   const loadNewText = async () => {
//     const text =  getRandomWords(40);
//     setTargetText(text);
//   };

//   // Timer
//   useEffect(() => {
//     if (timerStarted && timeLeft > 0) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft(prev => {
//           if (prev <= 1) {
//             clearInterval(timerRef.current);
//             setIsComplete(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }

//     return () => clearInterval(timerRef.current);
//   }, [timerStarted]);



// useEffect(() => {
//   if (targetText.length - userInput.length < 20) {
//     setTargetText(prev => prev + ' ' + getRandomWords(10));
//   }
// }, [userInput]);

//   const handleInput = (e) => {
//     const value = e.target.value;

//     if (!timerStarted) setTimerStarted(true);
//     if (isComplete) return;

//     if (value.length < userInput.length) {
//       setUserInput(value);
//       return;
//     }

//     const newErrors = { ...errorMap };
//     const newErrorIndexes = new Set(errorIndexes);

//     for (let i = userInput.length; i < value.length; i++) {
//       const correctChar = targetText[i];
//       const typedChar = value[i];

//       if (typedChar !== correctChar && !newErrorIndexes.has(i)) {
//         newErrorIndexes.add(i);

//         if (!newErrors[correctChar]) newErrors[correctChar] = {};
//         if (!newErrors[correctChar][typedChar]) newErrors[correctChar][typedChar] = 0;

//         newErrors[correctChar][typedChar] += 1;
//       }
//     }

//     setErrorMap(newErrors);
//     setErrorIndexes(newErrorIndexes);
//     setUserInput(value);
//   };

//   const restartTest = async () => {
//     clearInterval(timerRef.current);
//     setUserInput('');
//     setErrorMap({});
//     setErrorIndexes(new Set());
//     setTimeLeft(60);
//     setTimerStarted(false);
//     setIsComplete(false);
//     const newText = getRandomWords(40);
//     setTargetText(newText);
//   };

//   const totalTyped = userInput.length;
//   const correctChars = Array.from(userInput).filter((ch, i) => ch === targetText[i]).length;
//   const wpm = Math.round((correctChars / 5) / ((60 - timeLeft) / 60 || 1));
//   const accuracy = totalTyped ? ((correctChars / totalTyped) * 100).toFixed(1) : 0;

//   const renderErrorReport = () => {
//     const report = [];
//     for (const correct in errorMap) {
//       for (const wrong in errorMap[correct]) {
//         const count = errorMap[correct][wrong];
//         report.push(
//           `You mistyped "${correct}" as "${wrong}" ${count} ${count === 1 ? 'time' : 'times'}.`
//         );
//       }
//     }
//     return report.length > 0 ? (
//       <ul>
//         {report.map((line, idx) => (
//           <li key={idx}>{line}</li>
//         ))}
//       </ul>
//     ) : (
//       <p>No typing errors recorded 🎉</p>
//     );
//   };

//   return (
//     <div>
//       <h2 className="mb-3">Typing Test</h2>

//       <p><strong>⏱ Time Left:</strong> {timeLeft}s</p>

//       <div className="border p-3 mb-3" style={{ fontFamily: 'monospace', minHeight: '100px' }}>
//         {targetText.split('').map((char, i) => {
//           let className = 'text-secondary';

//           if (userInput[i] == null) className = 'text-muted';
//           else if (userInput[i] === char) className = 'text-success';
//           else className = 'text-danger';

//           const bg = i === userInput.length ? 'bg-warning-subtle px-1 rounded' : '';
//           return (
//             <span key={i} className={`${className} ${bg}`}>
//               {char}
//             </span>
//           );
//         })}
//       </div>

//       <textarea
//         className="form-control mb-3"
//         rows="4"
//         placeholder="Start typing here..."
//         value={userInput}
//         onChange={handleInput}
//         disabled={isComplete}
//       />

//       {isComplete && (
//         <>
//           <div className="alert alert-success">
//             <h5>✅ Typing Complete!</h5>
//             <p><strong>WPM:</strong> {wpm}</p>
//             <p><strong>Accuracy:</strong> {accuracy}%</p>
//           </div>

//           <h5>📊 Mistyped Letters</h5>
//           {renderErrorReport()}
//         </>
//       )}

//       <button className="btn btn-primary mt-3" onClick={restartTest}>
//         🔁 Restart Test
//       </button>
//     </div>
//   );
// }



// ????????????????????????????????????????????????????????????????????????????????????????????????????????????????


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
  }, [timerStarted]);

  // Auto-append more words
  useEffect(() => {
    if (targetText.length - userInput.length < 20) {
      setTargetText(prev => prev + ' ' + getRandomWords(10));
    }
  }, [userInput]);

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

//   const renderErrorReport = () => {
//     const report = [];
//     for (const correct in errorMap) {
//       for (const wrong in errorMap[correct]) {
//         const count = errorMap[correct][wrong];
//         report.push(`You mistyped "${correct}" as "${wrong}" ${count} ${count === 1 ? 'time' : 'times'}.`);
//       }
//     }
//     return report.length > 0 ? (
//       <ul className="list-group list-group-flush">
//         {report.map((line, idx) => (
//           <li key={idx} className="list-group-item">{line}</li>
//         ))}
//       </ul>
//     ) : (
//       <p className="text-success">No typing errors recorded 🎉</p>
//     );
//   };

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
          You mistyped "<strong>{entry.correct}</strong>" as "<strong>{entry.wrong}</strong>" {entry.count} {entry.count === 1 ? 'time' : 'times'}.
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
