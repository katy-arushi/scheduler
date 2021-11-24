import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace) => {
    if (!replace) {
      setMode(mode);
      setHistory([...history, mode]);
    } else {
      // a combination of back and transition
      // when true, erase the page we're currently on

      const newHistory = [...history]; 
      newHistory.pop();
      newHistory.push(mode);
      setHistory(newHistory); 
      setMode(newHistory[(newHistory.length) - 1]); // always the last element of the history array
    }
  }

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history]; // copying the history array
      newHistory.pop(); // removing last element
      setHistory(newHistory); // setting the history to the array that doesn't have the last element
      setMode(newHistory[(newHistory.length) - 1]); // setting the mode to the new history, last element in the history array
    }
  }

  return { mode, transition, back };
}