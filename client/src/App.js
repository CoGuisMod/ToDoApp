import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import { FaPlus } from "react-icons/fa";

const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
  },
  columns: {
    "to-do-column": {
      id: "to-do-column",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    "doing-column": {
      id: "doing-column",
      title: "Doing",
      taskIds: [],
    },
    "done-column": {
      id: "done-column",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["to-do-column", "doing-column", "done-column"],
};

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    const sourceCol = data.columns[source.droppableId];
    const destinationCol = data.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newData);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="text-center">
        <h1 className="font-bold text-4xl py-4">To-Do App</h1>
      </div>
      <div className="flex justify-between items-center gap-8 px-8">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          console.log(tasks, "tasks");

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
      <div className="flex justify-center items-center text-slate-500 py-4">
        <p>It's just a simple app, i will add storage, user auth and CRUD.</p>
      </div>
    </DragDropContext>
  );
}

export default App;
