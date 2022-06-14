import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  console.log(tasks);
  return (
    <div className="border border-slate-800 rounded w-full max-w-lg h-[80vh]">
      <div className="flex justify-center items-center bg-slate-800 py-2">
        <h2 className="font-bold text-xl">{column.title}</h2>
      </div>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className="flex flex-col gap-2 w-full h-full p-4"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    className="bg-slate-700 rounded px-2 py-1"
                  >
                    {task.content}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
