import logo from "./pie-chart.svg";
import "./App.css";
import "./components/forms/forms.css";
// import Inputs from "./components/inputs/inputs";
// import Graph from "./components/graph/plot";
import Form from "./components/forms/form";
// import Board from "./components/sample/sample1";
// import {useState} from "react"


function App() {
  // const [setLabels, setValues] = useState(0);
  // const [setVisualized] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="200" />
        <p>ポートフォリオを可視化する</p>
        <label>アセット名と投資金額を入力してください。</label>
        <Form />
        {/* <Inputs /> */}
        <div className="graph-wrapper">
          {/* <Graph /> */}
        </div>
          {/* <Board /> */}
      </header>
    </div>
  );
}

export default App;
