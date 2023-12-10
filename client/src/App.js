import "./App.css";
import NewRequest from "./components/NewRequest";
import EditRequest from "./components/EditRequest";

function App() {
  return (
    <div className="App">
      <EditRequest />
      <NewRequest />
    </div>
  );
}

export default App;
