import { DataTable } from "./lib/types";
import { Table } from "./components/layout/Table";
import { Rect } from "./components/marks/Rect";

function App() {
  const dataTable: DataTable = {
    columns: [
      { type: "categorical", name: "region" },
      { type: "categorical", name: "group" },
      { type: "categorical", name: "customer" },
      { type: "quantitative", name: "revenue" },
      { type: "quantitative", name: "profit" },
    ],
    rows: [
      { region: 1, group: 1, customer: "true", revenue: 0.1, profit: 5.41 },
      { region: 2, group: 2, customer: "true", revenue: 0.18, profit: 4.31 },
      { region: 3, group: 3, customer: "false", revenue: 0.21, profit: 3.25 },
      { region: 4, group: 4, customer: "true", revenue: 0.91, profit: 2.11 },
      { region: 5, group: 5, customer: "true", revenue: 0.33, profit: 0.1 },
      { region: 4, group: 5, customer: "false", revenue: 0.47, profit: 1.3 },
      { region: 6, group: 6, customer: "false", revenue: 0.25, profit: 3.7 },
      { region: 7, group: 7, customer: "true", revenue: 0.4, profit: 100.1 },
      { region: 8, group: 8, customer: "false", revenue: 0.1, profit: 0.01 },
    ],
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Table
        mark={Rect}
        rows={[1,2]}
        columns={[3]}
        data={dataTable}
        xPosition="before"
        yPosition="before"
      />
    </div>
  );
}

export default App;
