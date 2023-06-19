import {
  CategoricalAxis,
  AxisOrientation,
  AxisPosition,
  Value,
} from "../../lib/types";

function AxisLabel({ value }: { value: Value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>{value}</span>
    </div>
  );
}

function AxisTitle({
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
        padding: 4,
        background: "gray",
        border: "1px solid black"
      }}
    >
      <span style={style}>{value}</span>
    </div>
  );
}

// function AxisItem() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flex: 1,
//         flexGrow: 1,
//         background: "blue",
//         border: "1px solid red",
//       }}
//     >
//     </div>
//   );
// }

function NestedItems({
  axis,
  position,
  orientation,
}: {
  axis: CategoricalAxis
  position: AxisPosition;
  orientation: AxisOrientation;
}) {
  const style =
    orientation === "vertical"
      ? {
          gridTemplateRows: `repeat(${axis.subitems.length}, 1fr)`,
        }
      : {
          gridTemplateColumns: `repeat(${axis.subitems.length}, 1fr)`,
        };
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexGrow: 1,
        flexDirection: orientation === "horizontal" ? "column" : "row",
      }}
    >
      {position === "before" && axis.subTitle && (
        <AxisTitle value={axis.subTitle} orientation={orientation} />
      )}
      {axis.subitems.length > 0 && <div
        style={{
          ...style,
          display: "grid",
        }}
      >
        {Array.from({ length: axis.subitems.length }, (value, index) => index).map(
          (d, idx) => {
            return (
              <div
                key={"axis-item-" + d}
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "stretch",
                  flexDirection: orientation === "horizontal" ? "column" : "row",
                  flexGrow: 1,
                }}
              >
                <NestedAxis position={position} orientation={orientation} axis={axis.subitems[d]}/>
              </div>
            );
          }
        )}
      </div>}
      {position === "after" && axis.subTitle && (
        <AxisTitle value={axis.subTitle} orientation={orientation} />
      )}
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
  axis: CategoricalAxis

}) {
  // set defaults
  if (!orientation) orientation = "horizontal";
  if (!position) position = "after";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "column" : "row",
        width: orientation === "horizontal" ? "100%" : undefined,
        height: orientation !== "horizontal" ? "100%" : undefined,
      }}
    >
      {position === "before" && axis.title && (
        <AxisTitle value={axis.title} orientation={orientation} />
      )}
      <NestedItems position={position} orientation={orientation} axis={axis}/>
      {position === "after" && axis.title && (
        <AxisTitle value={axis.title} orientation={orientation} />
      )}
    </div>
  );
}
