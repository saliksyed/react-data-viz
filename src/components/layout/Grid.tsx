import { AxisDefinition } from "../../lib/types";

export function Grid({
  xAxis,
  yAxis,
}: {
  xAxis: AxisDefinition;
  yAxis: AxisDefinition;
}) {
  const style: any = {
    display: "grid",
    gridTemplateRows: `repeat(${Math.max(1, yAxis.subitems.length)}, 1fr)`,
    gridTemplateColumns: `repeat(${Math.max(1, xAxis.subitems.length)}, 1fr)`,
    width: "100%",
    height: "100%",
  };
  const borderColor = "0.25px solid lightgray";
  if (xAxis.subitems.length > 0 && yAxis.subitems.length > 0) {
    return (
      <div style={style}>
        {yAxis.subitems.map((y) => {
          return xAxis.subitems.map((x, idx) => {
            return (
              <div
                style={{
                  border: borderColor,
                }}
              >
                {x.axis && y.axis && <Grid xAxis={x.axis} yAxis={y.axis} />}
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
          return (
            <div
              style={{
                border: borderColor,
              }}
            >
              {x.axis && <Grid xAxis={x.axis} yAxis={yAxis} />}
            </div>
          );
        })}
      </div>
    );
  } else if (yAxis.subitems.length > 0) {
    return (
      <div style={style}>
        {yAxis.subitems.map((y, idx) => {
          return (
            <div
              style={{
                border: borderColor,
              }}
            >
              {y.axis && <Grid xAxis={xAxis} yAxis={y.axis} />}
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>X</div>;
  }
}
