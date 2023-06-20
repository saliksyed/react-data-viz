import { DataTable, getAxisDefinition } from "./lib/types";
import { Table } from "./components/layout/Table";

function App() {
  const dataTable: DataTable = {
    columns: [
      { type: "categorical", name: "region" },
      { type: "categorical", name: "group" },
      { type: "categorical", name: "c" },
      { type: "quantitative", name: "revenue" },
    ],
    rows: [
      { region: 1, group: 1, c: "true", revenue: 0.1 },
      { region: 2, group: 2, c: "true", revenue: 0.18 },
      { region: 3, group: 3, c: "false", revenue: 0.21 },
      { region: 4, group: 4, c: "true", revenue: 0.91 },
      { region: 5, group: 5, c: "true", revenue: 0.33 },
      { region: 4, group: 5, c: "true", revenue: 0.47 },
      { region: 6, group: 6, c: "false", revenue: 0.25 },
      { region: 7, group: 7, c: "true", revenue: 0.4 },
      { region: 8, group: 8, c: "false", revenue: 0.1 },
    ],
  };

  const xAxisValues = getAxisDefinition(
    [dataTable.columns[0]],
    dataTable
  );
  const yAxisValues = getAxisDefinition(
    [dataTable.columns[2]],
    dataTable
  );

  return (
    <div
      style={{
        width: "30vw",
        height: "50vh",
        background: "rgba(0, 0, 0, 0.1)",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Table
        data={dataTable}
        xAxis={xAxisValues}
        xPosition="before"
        yAxis={yAxisValues}
        yPosition="before"
      />
    </div>
  );
}

export default App;
