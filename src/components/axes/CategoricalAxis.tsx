import {
  AxisDefinition,
  AxisOrientation,
  AxisPosition,
  Value,
} from "../../lib/types";



function AxisLabel({
  value,
  orientation,
}: {
  value: Value;
  orientation: AxisOrientation;
}) {
  const style: any =
    orientation === "vertical"
      ? {
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
        }
      : {};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "lightgray",
        border: "0.25px solid gray",
        overflow: "hidden",
      }}
    >
      <span style={style}>{value}</span>
    </div>
  );
}

export function NestedAxis({
  orientation,
  position,
  axis,
}: {
  orientation: AxisOrientation;
  position: AxisPosition;
  axis: AxisDefinition;
}) {
  // set defaults
  if (!orientation) orientation = "horizontal";
  if (!position) position = "after";

  const axisCount = axis.subitems ? axis.subitems.length : 1;
  const style =
    orientation === "vertical"
      ? {
          gridTemplateRows: `repeat(${axisCount}, 1fr)`,
        }
      : {
          gridTemplateColumns: `repeat(${axisCount}, 1fr)`,
        };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "column" : "row",
        width: orientation === "horizontal" ? "100%" : undefined,
        height: orientation !== "horizontal" ? "100%" : undefined,
      }}
    >
      {position==="before" && <AxisLabel value={axis.title} orientation={orientation}/>}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexGrow: 1,
          flexDirection: orientation === "horizontal" ? "column" : "row",
        }}
      >
        {axis.range && 
          <AxisLabel value={"range"} orientation={orientation}/>
        }
        {axis.subitems && axis.subitems.length > 0 && (
          <div
            style={{
              ...style,
              display: "grid",
            }}
          >
            {axis.subitems.map((d, idx) => {
              return (
                <div
                  key={"axis-item-" + d}
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "stretch",
                    flexDirection:
                      orientation === "horizontal" ? "column" : "row",
                    flexGrow: 1,
                  }}
                >
                  {position==="before" && <AxisLabel value={d.title} orientation={orientation}/>}
                    {d.axis && <NestedAxis
                      position={position}
                      orientation={orientation}
                      axis={d.axis}
                    />}
                  {position==="after" && <AxisLabel value={d.title} orientation={orientation}/>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {position==="after" && <AxisLabel value={axis.title} orientation={orientation}/>}
    </div>
  );
}
