import { useResizeHandler } from "../../hooks/resize";
import { Filter, DataTable, AxisOrientation, Range } from "../../lib/types";
import { useState } from "react";
export function Rect({
  filters,
  data,
  xRange,
  yRange,
}: {
  filters: Filter[];
  data: DataTable;
  xRange?: Range;
  yRange?: Range;
}) {
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeHandler({ elem });

  const finalData = data.rows
    .filter((row) => {
      let passes = true;
      filters.forEach((filter) => {
        if (row[filter.field] !== filter.value) passes = false;
      });
      return passes;
    })
    .map((row) => {
      const xPercent = xRange
        ? ((row[xRange.field] as number) - xRange.min) /
          (xRange.max - xRange.min)
        : 1.0;
      const yPercent = yRange
        ? ((row[yRange.field] as number) - yRange.min) /
          (yRange.max - yRange.min)
        : 1.0;
      return { xPercent, yPercent };
    });
  return (
    <div
      ref={setElem}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "darkgray",
      }}
    >
      {finalData.map((range, i) => {
        const color = "red";

        return (
          <div
            key={"rect-" + i}
            style={{
              border: "0.5px solid white",
              position: "absolute",
              marginTop: height - range.yPercent * height,
              width: range.xPercent * width + "px",
              height: range.yPercent * height + "px",
              background: color,
            }}
          />
        );
      })}
    </div>
  );
}
