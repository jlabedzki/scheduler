import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history] = useState([initial]);

  function transition(mode, replace = false) {
    if (replace) {
      history.pop();
    }
    setMode(mode);
    history.push(mode);
  };

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back }
};