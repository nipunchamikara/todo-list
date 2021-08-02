import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";

export default function Todo({
  text,
  completed,
  index,
  updateTodo,
  addTodo,
  deleteTodo,
}) {
  // Whether app will be visible or not
  const [visible, setVisible] = useState(false);

  // Reference to component
  const todoRef = useRef();

  // Creates a new todo when user hits the enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Sets visible to true when the component is mounted
  useEffect(() => {
    setVisible(true);
  }, []);

  // Sets visible to false when the component is unmounted
  const handleClick = () => {
    setVisible(false);
    setTimeout(() => {
      deleteTodo(index);
      // If component hasn't been unmounted, sets visible to true
      if (todoRef.current) {
        setVisible(true);
      }
    }, 300);
  };

  return (
    <div ref={todoRef} className={visible ? "Todo active" : "Todo"}>
      <input
        className="checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => updateTodo(index, text, !completed)}
      />
      <input
        autoFocus
        onChange={(e) => updateTodo(index, e.target.value, completed)}
        onKeyDown={handleKeyDown}
        className={completed ? "complete" : ""}
        value={text}
        onBlur={(e) => updateTodo(index, e.target.value.trim(), completed)}
      />
      <span className="exit" onClick={handleClick}>
        ×
      </span>
    </div>
  );
}
