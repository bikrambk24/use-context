import React, { useState, useEffect } from 'react';
import { createContext, useContext } from "react";


export const TodoContext = createContext();

 const Todo = () => {

    const [todoList, setTodoList] = useState([]);
    const fetchData = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos");
        const result = await data.json();
        setTodoList(result);
      };

      useEffect(() => {
        fetchData();
      }, []);


  return (
    <>
        <center><h1>TODO LISTS</h1></center>
        <TodoContext.Provider value={{todoList,setTodoList}}>
            <FetchedList/>
        </TodoContext.Provider>
    </>
  );
};

  const FetchedList = () => {
    const context = useContext(TodoContext);

        const forStrike = (i) => {
            const lineTodo = context.todoList.map((todo, index) => {
              if (index === i) return { ...todo, isStriked: !todo.isStriked };
              else return todo;
            });
            context.setTodoList(lineTodo);
          };

    return(
      <div>
          <center>
          <h2>
            {context.todoList.map((value, index) => {
              return (
                <div key={index}>
                  <div>
                    <div style={{
                        cursor: "pointer",
                        textDecoration: value.isStriked
                          ? "blue line-through"
                          : "none",
                      }}
                    onClick={() => forStrike(index)} >
                      {value.title}
                    </div>
                  </div>
                </div>
              );
            })
            }
        </h2>
        </center>
      </div>
    )
  }

export default Todo;