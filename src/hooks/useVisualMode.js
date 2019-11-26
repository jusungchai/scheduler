import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory(history.slice(0, history.length - 1));
    }
    history.push(newMode);
  }
  function back() {
    if (history.length === 1) {
      setMode(history[0]);
    } else {
      setMode(history[history.length - 2]);
      history.pop();
    }
  }
  return { mode, transition, back };
}