import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./page/Board";
import View from "./page/View";
import Create from "./page/Create";
import Update from "./page/Update";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Board />} />
          <Route path="/view/:id" exact element={<View />} />
          <Route path="/create/" exact element={<Create />} />
          <Route path="/update/:id" exact element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
