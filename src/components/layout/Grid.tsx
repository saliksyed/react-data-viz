import { AxisDefinition, Filter, DataTable, MarkProps } from "../../lib/types";
import { Mark } from "../marks/Mark";
import { Rect } from "../marks/Rect";

export function Grid({
  xAxis,
  yAxis,
  path,
  data,
  mark,
}: {
  xAxis: AxisDefinition | null;
  yAxis: AxisDefinition | null;
  path: Filter[];
  data: DataTable;
  mark?: (props: MarkProps) => React.ReactElement;
}) {
  if (!mark) mark = Rect;
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
    (xAxis && xAxis.range && yAxis && yAxis.range) ||
    (xAxis.subitems.length === 0 && yAxis.subitems.length === 0)
  ) {
    let xRange = undefined;
    let yRange = undefined;
    if (xAxis && xAxis.range) xRange = xAxis.range;
    if (yAxis && yAxis.range) yRange = yAxis.range;
    gridItems = [
      <div
        style={{
          border: borderColor,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {
          <Mark
            mark={mark}
            props={{
              xRange,
              yRange,
              filters: path,
              data,
              cellData: [],
              width: 0,
              height: 0,
            }}
          />
        }
      </div>,
    ];
  } else {
    const xItems =
      xAxis.subitems.length > 0
        ? xAxis.subitems
        : [{ title: xAxis.title, axis: xAxis }];
    const yItems =
      yAxis.subitems.length > 0
        ? yAxis.subitems
        : [{ title: yAxis.title, axis: yAxis }];
    gridItems = yItems.map((y) => {
      return xItems.map((x) => {
        let soFar = structuredClone(path);
        if (!soFar) soFar = [];
        if (!yAxis.range) soFar.push({ field: yAxis.title, value: y.title });
        if (!xAxis.range) soFar.push({ field: xAxis.title, value: x.title });
        return (
          <div
            key={"grid-" + x.title + "-" + y.title}
            style={{
              border: borderColor,
            }}
          >
            {
              <Grid
                mark={mark}
                data={data}
                xAxis={x.axis}
                yAxis={y.axis}
                path={soFar}
              />
            }
          </div>
        );
      });
    });
  }

  return <div style={style}>{gridItems}</div>;
}
