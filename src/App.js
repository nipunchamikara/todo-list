import React, { useEffect, useState } from "react";
import "./App.css";

import Todo from "./Todo";

export default function App() {
    // Gets data from local storage
    const data = localStorage.getItem("list");
    const [list, setList] = useState((data) ? JSON.parse(data) : []);

    // Updates local storage whenever the component updates
    useEffect (() => {
        // Saves non-empty todos
        const filteredList = list.filter(todo => todo.text !== "");
        localStorage.setItem("list", JSON.stringify(filteredList));
    });

    // Appends new todo to list
    const addTodo = () => {
        setList([...list, {"text": "", "completed": false}]);
    }

    // Updates a todo
    const updateTodo = (id, newTodo, completed) => {
        const newList = list.map((todo, index) => {
            if (index === id) {
                return {"text": newTodo, "completed": completed}
            }
            return todo;
        })
        setList(newList);
    }

    // Deletes a todo
    const deleteTodo = (id) => {
        setList(list.filter((todo, index) => index !== id));
    }

    /**
     * Creates a list of Todo components using the map method.
     * If the list length is 0, displays that the list is empty.
     */
    const todoList = (list.length === 0) ? <p>such empty</p> : list.map((todo, index) => (
        <Todo key={index} 
            index={index} 
            text={todo.text} 
            completed={todo.completed} 
            updateTodo={updateTodo} 
            addTodo={addTodo} 
            deleteTodo={deleteTodo} 
        />
    ));

    return (
        <div className="App col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <h1>To Do List</h1><hr/>
            <div>
                {todoList}
            </div>
            <button onClick={addTodo} className="btn btn-dark">+</button>
        </div>
    );
}