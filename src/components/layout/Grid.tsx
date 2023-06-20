import { AxisDefinition, Filter, DataTable } from "../../lib/types";
import { Rect } from "../marks/Rect";

export function Grid({
  xAxis,
  yAxis,
  path,
  data
}: {
  xAxis: AxisDefinition;
  yAxis: AxisDefinition;
  path?: Filter[];
  data: DataTable;
}) {
  const style: any = {
    display: "grid",
    gridTemplateRows: `repeat(${Math.max(1, yAxis.subitems.length)}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${Math.max(1, xAxis.subitems.length)}, minmax(0, 1fr))`,
    width: "100%",
    height: "100%",
  };
  const borderColor = "0.25px solid lightgray";
  if (xAxis.subitems.length > 0 && yAxis.subitems.length > 0) {
    return (
      <div style={style}>
        {yAxis.subitems.map((y) => {
          return xAxis.subitems.map((x, idx) => {
            let soFar = structuredClone(path);
            if (!soFar) soFar = [];
            soFar.push({ field: yAxis.title, value: y.title});
            soFar.push({ field: xAxis.title, value: x.title});
            return (
              <div
                style={{
                  border: borderColor,
                }}
              >
                {x.axis && y.axis && <Grid data={data} xAxis={x.axis} yAxis={y.axis} path={soFar}/>}
                {x.axis && !y.axis && <Grid data={data} xAxis={x.axis} yAxis={yAxis} path={soFar}/>}
                {!x.axis && y.axis && <Grid data={data} xAxis={xAxis} yAxis={y.axis} path={soFar}/>}
                {(!x.axis && !y.axis) && <Rect orientation={"vertical"} filters={soFar} data={data}/>}
              </div>
            );
          });
        })}
      </div>
    );
  } else if (xAxis.subitems.length > 0) {
    return (
      <div style={style}>
        {xAxis.subitems.map((x, idx) => {
          let soFar = structuredClone(path);
          if (!soFar) soFar = [];
          soFar.push({ field: xAxis.title, value: x.title});
          return (
            <div
              style={{
                border: borderColor,
              }}
            >
              {x.axis && <Grid data={data} xAxis={x.axis} yAxis={yAxis} path={soFar}/>}
              {!x.axis && <Rect range={yAxis.range!} orientation={"vertical"} filters={soFar} data={data}/>}
            </div>
          );
        })}
      </div>
    );
  } else if (yAxis.subitems.length > 0) {
    return (
      <div style={style}>
        {yAxis.subitems.map((y, idx) => {
          let soFar = structuredClone(path);
          if (!soFar) soFar = [];
          soFar.push({ field: yAxis.title, value: y.title});
          return (
            <div
              style={{
                border: borderColor,
              }}
            >
              {y.axis && <Grid data={data} xAxis={xAxis} yAxis={y.axis} path={soFar} />}
              {!y.axis && <Rect range={xAxis.range!}  orientation={"horizontal"} filters={soFar} data={data}/>}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div
      className="empty"
      style={{
        border: borderColor,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
      }}
    />;
  }
}
