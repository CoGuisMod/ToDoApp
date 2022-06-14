import React from "react";
import { ToDoUse } from "../ToDoContext";

const DoingColumn = () => {
  const { toDoList, setToDoList } = ToDoUse();
  console.log(toDoList, "toDoList Doing Column");
  return <div>DoingColumn</div>;
};

export default DoingColumn;
