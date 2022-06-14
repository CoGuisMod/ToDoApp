import React from "react";
import { useDrag } from "react-dnd";

const DraggableCard = ({ id, cardContent }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "toDoCard",
    item: { id, cardContent },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={dragRef} className={isDragging ? "opacity-0" : "text-purple-500"}>
      {cardContent}
    </div>
  );
};

export default DraggableCard;
