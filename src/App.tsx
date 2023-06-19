import { getCategoricalAxis } from "./lib/types";
import { Table } from "./components/layout/Table";

function App() {
  const dataTable = {
    columns: [ "a", "b"],
    rows: [
      { a: 1, b: 1 },
      { a: 2, b: 3 },
      { a: 5, b: 2 },
      { a: 7, b: 1 },
      { a: 3, b: 2 },
      { a: 8, b: 2 },
      { a: 11, b: 3 },
      { a: 1, b: 3 },
    ],
  };

  const axisValues = getCategoricalAxis(["a", "b"], dataTable);

  console.log(axisValues);
  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        background: "yellow",
      }}
    >
      <Table xAxis={axisValues} xPosition="before" yAxis={axisValues} yPosition="after"/>
    </div>
  );
}

export default App;
