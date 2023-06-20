import { AxisDefinition, Filter, DataTable } from "../../lib/types";
import { Rect } from "../marks/Rect";

export function Grid({
  xAxis,
  yAxis,
  path,
  data,
}: {
  xAxis: AxisDefinition | null;
  yAxis: AxisDefinition | null;
  path: Filter[];
  data: DataTable;
}) {
  const borderColor = "0.25px solid lightgray";

  // Else recursively render a subgrid
  const style: any = {
    display: "grid",
    gridTemplateRows: `repeat(${Math.max(
      1,
      yAxis ? yAxis.subitems.length : 1
    )}, minmax(0, 1fr))`,
    gridTemplateColumns: `repeat(${Math.max(
      1,
      xAxis ? xAxis.subitems.length : 1
    )}, minmax(0, 1fr))`,
    width: "100%",
    height: "100%",
  };

  let gridItems: any = [];

  // if either axis is undefined, render mark
  if (
    !xAxis ||
    !yAxis ||
    (xAxis &&
      xAxis.range &&
      yAxis &&
      yAxis.range)
  ) {
    let xRange = undefined;
    let yRange = undefined;
    if (xAxis && xAxis.range) xRange = xAxis.range;
    if (yAxis && yAxis.range) yRange = yAxis.range;
    console.log('rect', path);
    gridItems = [
      <div
        className="empty"
        style={{
          border: borderColor,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Rect xRange={xRange} yRange={yRange} filters={path} data={data} />
      </div>,
    ];
  } else {
    const xItems = xAxis.subitems.length > 0 ? xAxis.subitems : [{ title: xAxis.title, axis: xAxis}];
    const yItems = yAxis.subitems.length > 0 ? yAxis.subitems : [{ title: yAxis.title, axis: yAxis}];
    gridItems = xItems.map((x) => {
      return yItems.map((y) => {
        let soFar = structuredClone(path);
        if (!soFar) soFar = [];
        if (!xAxis.range) soFar.push({ field: xAxis.title, value: x.title });
        if (!yAxis.range) soFar.push({ field: yAxis.title, value: y.title });
        return (
          <div
            style={{
              border: borderColor,
            }}
          >
            {<Grid data={data} xAxis={x.axis} yAxis={y.axis} path={soFar} />}
          </div>
        );
      });
    });
    
  }
  
  return <div style={style}>{gridItems}</div>;
}
