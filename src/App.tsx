import { DataTable, getAxisDefinition } from "./lib/types";
import { Table } from "./components/layout/Table";

function App() {
  const dataTable: DataTable = {
    columns: [
      { type: "categorical", name: "a" },
      { type: "categorical", name: "b" },
      { type: "categorical", name: "c" },
      { type: "quantitative", name: "d" },
    ],
    rows: [
      { a: 4, b: 1, c: "true", d: 0.1 },
      { a: 5, b: 3, c: "true", d: 0.1 },
      { a: 5, b: 2, c: "false", d: 0.21 },
      { a: 6, b: 1, c: "true", d: 0.51 },
      { a: 4, b: 2, c: "true", d: 0.33 },
      { a: 4, b: 2, c: "false", d: 0.25 },
      { a: 6, b: 3, c: "true", d: 0.7 },
      { a: 6, b: 3, c: "false", d: 0.1 },
    ],
  };

  const xAxisValues = getAxisDefinition(
    [dataTable.columns[0], dataTable.columns[2], dataTable.columns[3]],
    dataTable
  );
  const yAxisValues = getAxisDefinition(
    [dataTable.columns[2],dataTable.columns[1], dataTable.columns[3]],
    dataTable
  );

  console.log(xAxisValues, yAxisValues);
  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        background: "white",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Table
        xAxis={xAxisValues}
        xPosition="before"
        yAxis={yAxisValues}
        yPosition="before"
      />
    </div>
  );
}

export default App;
