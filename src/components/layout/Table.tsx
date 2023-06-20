import { AxisDefinition, AxisPosition, DataTable, MarkProps, Dimension } from "../../lib/types";
import { useAxes } from "../../hooks/data";
import { Grid } from "./Grid";
import { Axis } from "../axes/Axis";
import { Text } from "../marks/Text";
function TableInner({
  xAxis,
  yAxis,
  xPosition,
  yPosition,
  xAxisDims,
  yAxisDims,
  data,
  mark,
}: {
  xAxis: AxisDefinition;
  yAxis: AxisDefinition;
  xPosition: AxisPosition;
  yPosition: AxisPosition;
  xAxisDims: Dimension;
  yAxisDims: Dimension;
  data: DataTable;
  mark?: (props: MarkProps) => React.ReactElement;
}) {
  if (xPosition === "before" && yPosition == "before") {
    return (
      <>
        <tr>
          <td
            style={{
              padding: 0,
            }}
          ></td>
          <td
            style={{
              padding: 0,
            }}
          >
            <div style={{
              width: xAxisDims.width,
              height: xAxisDims.height,
              overflow: "scroll"
            }}>
              <Axis dimensions={xAxisDims} orientation="horizontal" position="before" axis={xAxis} />  
            </div>
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: 0,
              overflow: "scroll"
            }}
          >
            <div style={{
              width: yAxisDims.height,
              height: yAxisDims.width,
              overflow: "scroll"
            }}>
              <Axis dimensions={yAxisDims} orientation="vertical" position="before" axis={yAxis} />
            </div>
          </td>
          <td
            style={{
              padding: 0,
            }}
          >
            <div style={{
              overflow: "scroll",
              width: xAxisDims.width,
              height: yAxisDims.width,
            }}>
              <Grid mark={mark} data={data} path={[]} xAxis={xAxis} yAxis={yAxis} />
            </div>
          </td>
        </tr>
      </>
    );
  } else if (xPosition === "after" && yPosition == "before") {
    return (
      <>
        <tr>
          <td
            style={{
              padding: 0,
            }}
          >
            <Axis orientation="vertical" position="before" axis={yAxis} />
          </td>
          <td
            style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Grid mark={mark} data={data} path={[]} xAxis={xAxis} yAxis={yAxis} />
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: 0,
            }}
          ></td>
          <td
            style={{
              padding: 0,
            }}
          >
            <Axis orientation="horizontal" position="after" axis={xAxis} />
          </td>
        </tr>
      </>
    );
  } else if (xPosition === "after" && yPosition === "after") {
    return (
      <>
        <tr>
          <td
            style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Grid mark={mark} data={data} path={[]} xAxis={xAxis} yAxis={yAxis} />
          </td>
          <td
            style={{
              padding: 0,
            }}
          >
            <Axis orientation="vertical" position="after" axis={yAxis} />
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: 0,
            }}
          >
            <Axis orientation="horizontal" position="after" axis={xAxis} />
          </td>
          <td
            style={{
              padding: 0,
            }}
          ></td>
        </tr>
      </>
    );
  } else if (xPosition === "before" && yPosition === "after") {
    return (
      <>
        <tr>
          <td
            style={{
              padding: 0,
            }}
          >
            <Axis orientation="horizontal" position="before" axis={xAxis} />
          </td>
          <td
            style={{
              padding: 0,
            }}
          ></td>
        </tr>
        <tr>
          <td
            style={{
              padding: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Grid mark={mark} data={data} path={[]} xAxis={xAxis} yAxis={yAxis} />
          </td>
          <td
            style={{
              padding: 0,
            }}
          >
            <Axis orientation="vertical" position="after" axis={yAxis} />
          </td>
        </tr>
      </>
    );
  }
  return null;
}

export function Table({
  rows,
  columns,
  xPosition,
  yPosition,
  data,
  mark,
}: {
  rows: number[];
  columns: number[];
  xPosition: AxisPosition;
  yPosition: AxisPosition;
  data: DataTable;
  mark?: (props: MarkProps) => React.ReactElement;
}) {
  if (!mark) mark = Text;
  const { x, y, xDims, yDims } = useAxes({ rows, columns, data});
  return (
    <table
      style={{
        borderSpacing: 0,
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <TableInner
          mark={mark}
          data={data}
          xAxis={x}
          yAxis={y}
          xAxisDims={xDims}
          yAxisDims={yDims}
          xPosition={xPosition}
          yPosition={yPosition}
        />
      </tbody>
    </table>
  );
}
