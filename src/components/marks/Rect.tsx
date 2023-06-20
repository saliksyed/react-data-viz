import { useCellData } from "../../hooks/data";
import { MarkProps } from "../../lib/types";

export function Rect({
  filters,
  data,
  xRange,
  yRange,
  width,
  height,
}: MarkProps) {
  const { cellData } = useCellData({ filters, data, xRange, yRange });
  return (
    <>
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
    </>
  );
}
