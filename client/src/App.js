import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToDoContextProvider } from "./ToDoContext";
import DoingColumn from "./components/DoingColumn";
import ToDoColumn from "./components/ToDoColumn";

function App() {
  return (
    <>
      <div>
        <h1>To-Do Site</h1>
      </div>
      <ToDoContextProvider>
        <DndProvider backend={HTML5Backend}>
          <div>
            <ToDoColumn />
            <DoingColumn />
          </div>
        </DndProvider>
      </ToDoContextProvider>
    </>
  );
}

export default App;
