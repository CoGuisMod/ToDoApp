import { createContext, useContext, useState } from "react";

const ToDoContext = createContext();

export function ToDoContextProvider({ children }) {
  const [toDoList, setToDoList] = useState([]);

  return (
    <ToDoContext.Provider value={{ toDoList, setToDoList }}>
      {children}
    </ToDoContext.Provider>
  );
}

export function ToDoUse() {
  return useContext(ToDoContext);
}
