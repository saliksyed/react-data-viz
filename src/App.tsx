import { DataTable, MarkProps } from "./lib/types";
import { Table } from "./components/layout/Table";
import { Rect } from "./components/marks/Rect";
import { Text } from "./components/marks/Text";
import { useState } from "react";

function NewMark(props: MarkProps) {
  const [hover, setHover] = useState(false);
  const filter = props.filters.find(d => d.field === "customer") ;
  const isCustomer = filter &&  filter.value === "true";
  return (
    <>
      <Rect
        style={{
          background: isCustomer ? "red" : "blue",
        }}
        cellData={props.cellData}
        onClick={() => { setHover(!hover)}}
        filters={props.filters}
        data={props.data}
        xRange={props.xRange}
        yRange={props.yRange}
        width={props.width}
        height={props.height}
      />
      {hover &&
      <Text
        style={{
          background: "rgba(255, 255, 255, 0.5)",
          zIndex: 999
        }}
        yOffset={-20}
        cellData={props.cellData}
        filters={props.filters}
        data={props.data}
        xRange={props.xRange}
        yRange={props.yRange}
        width={props.width}
        height={props.height}
      />
      }
    </>
  );
}

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
      { region: 3, group: 5, customer: "false", revenue: 0.21, profit: 3.25 },
      { region: 4, group: 2, customer: "true", revenue: 0.91, profit: 2.11 },
      { region: 5, group: 5, customer: "false", revenue: 0.33, profit: 0.1 },
      { region: 4, group: 2, customer: "true", revenue: 0.47, profit: 1.3 },
      { region: 6, group: 6, customer: "true", revenue: 0.25, profit: 3.7 },
      { region: 7, group: 7, customer: "true", revenue: 0.4, profit: 100.1 },
      { region: 8, group: 8, customer: "false", revenue: 0.3, profit: 0.01 },
    ],
  };

  return (
    <div
      style={{
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Table
        mark={NewMark}
        rows={[2]}
        columns={[0]}
        data={dataTable}
        xPosition="before"
        yPosition="before"
      />
      <Table
        mark={NewMark}
        rows={[1]}
        columns={[3]}
        data={dataTable}
        xPosition="before"
        yPosition="before"
      />
    </div>
  );
}

export default App;
