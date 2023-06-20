import { useResizeHandler } from "../../hooks/resize";
import { useCellData } from "../../hooks/data";
import { MarkProps } from "../../lib/types";
import { useState } from "react";

export function Text({
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
      {cellData.map((item, i) => {
        const color = "rgba(255, 0, 0, 0.5)";
        return (
          <div
            key={"text-" + i}
            style={{
              border: "0.5px solid white",
              position: "absolute",
              marginTop: height - item.yPercent * height,
            }}
          >
            {item.xValue ?? ""} {item.yValue ?? ""} {item.filters.map(d => d.value).join(", ")}
          </div>
        );
      })}
    </div>
  );
}
