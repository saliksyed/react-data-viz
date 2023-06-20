import { useResizeHandler } from "../../hooks/resize";
import { useCellData } from "../../hooks/data";
import { MarkProps } from "../../lib/types";
import { useState } from "react";

export function Rect({
  filters,
  data,
  xRange,
  yRange,
}: MarkProps) {
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeHandler({ elem });
  const { cellData } = useCellData({filters, data, xRange, yRange});
  return (
    <div
      ref={setElem}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "darkgray",
      }}
    >
      {cellData.map((range, i) => {
        const color = "rgba(255, 0, 0, 0.5)";
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
