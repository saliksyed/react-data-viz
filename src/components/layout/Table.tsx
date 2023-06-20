import { AxisDefinition, AxisPosition } from "../../lib/types";
import { Grid } from "./Grid";
import { Axis } from "../axes/Axis";

function TableInner({
  xAxis,
  yAxis,
  xPosition,
  yPosition,
}: {
  xAxis: AxisDefinition;
  yAxis: AxisDefinition;
  xPosition: AxisPosition;
  yPosition: AxisPosition;
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
            <Axis
              orientation="horizontal"
              position="before"
              axis={xAxis}
            />
          </td>
        </tr>
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
              width: "100%",
              height: "100%",
              padding: 0,
            }}
          >
            <Grid xAxis={xAxis} yAxis={yAxis} />
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
            <Grid xAxis={xAxis} yAxis={yAxis} />
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
            <Axis
              orientation="horizontal"
              position="after"
              axis={xAxis}
            />
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
            <Grid xAxis={xAxis} yAxis={yAxis} />
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
            <Axis
              orientation="horizontal"
              position="after"
              axis={xAxis}
            />
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
            <Axis
              orientation="horizontal"
              position="before"
              axis={xAxis}
            />
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
            <Grid xAxis={xAxis} yAxis={yAxis} />
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
  xAxis,
  yAxis,
  xPosition,
  yPosition,
}: {
  xAxis: AxisDefinition;
  yAxis: AxisDefinition;
  xPosition: AxisPosition;
  yPosition: AxisPosition;
}) {
  return (
    <table
      style={{
        width: "100%",
        height: "100%",
        borderSpacing: 0,
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        <TableInner
          xAxis={xAxis}
          yAxis={yAxis}
          xPosition={xPosition}
          yPosition={yPosition}
        />
      </tbody>
    </table>
  );
}
