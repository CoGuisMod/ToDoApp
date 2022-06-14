import React, { useState } from "react";
import { ToDoUse } from "../ToDoContext";
import { useDrop } from "react-dnd";
import DraggableCard from "./DraggableCard";
import { FaPlus } from "react-icons/fa";

const toDo = [
  { id: 1, cardContent: "Buy milk" },
  { id: 2, cardContent: "Buy eggs" },
  { id: 3, cardContent: "Buy bread" },
  { id: 4, cardContent: "Buy cheese" },
];

const ToDoColumn = () => {
  const { toDoList, setToDoList } = ToDoUse();
  const [toDoColum, setToDoColum] = useState([]);
  const [toDoText, setToDoText] = useState("");

  const [{ isOver }, dropRef] = useDrop({
    accept: "toDoCard",
    drop: (item) =>
      setToDoColum((toDoColum) =>
        !toDoColum.includes(item) ? [...toDoColum, item] : toDoColum
      ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  setToDoList(toDo);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToDoColum((toDoColum) => [
      ...toDoColum,
      { id: toDoColum.length, cardContent: toDoText },
    ]);
  };

  console.log(toDo.filter((item) => item.id !== 1));
  console.log(toDoList, "toDoList ToDoColumn");

  console.log(toDoText, "toDoText ToDoColumn");
  console.log(toDoColum, "toDoColum ToDoColumn");

  return (
    <div className="relative">
      {toDo.map((card) => (
        <DraggableCard
          key={card.id}
          id={card.id}
          cardContent={card.cardContent}
        />
      ))}
      <h1>To-Do</h1>
      <div ref={dropRef} className="bg-neutral-800 w-full h-[75vh]">
        {toDoColum.map((card) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            cardContent={card.cardContent}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add something to do!"
          onChange={(e) => setToDoText(e.target.value)}
        />
        <button>
          <FaPlus className="bg-purple-500 rounded-full text-white" />
        </button>
      </form>
      <div
        onClick={() =>
          setToDoColum((toDoColum) => [
            ...toDoColum,
            { id: toDoColum.length, cardContent: "New Card" },
          ])
        }
        className="absolute right-2 bottom-2"
      ></div>
    </div>
  );
};

export default ToDoColumn;
