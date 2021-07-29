import React, { useState, useEffect } from "react";
import "./Todo.css";

export default function Todo({ text, completed, index, updateTodo, addTodo, deleteTodo }) {
    const [visible, setVisible] = useState(false);

    // Creates a new todo when user hits the enter key
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    }

    // Sets visible to true when the component is mounted
    useEffect(() => {
        setVisible(true);
    }, [])

    // Sets visible to false when the component is unmounted
    const handleClick = () => {
        setTimeout(() => deleteTodo(index), 300);
        setVisible(false);
    }
    return (
        <div className={visible ? "Todo active" : "Todo"}>
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
            />
            <span className="exit" onClick={handleClick}>×</span>
        </div>
    );
}