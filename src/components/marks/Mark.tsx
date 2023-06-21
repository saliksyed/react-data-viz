import { useResizeHandler } from "../../hooks/resize";
import { useCellData } from "../../hooks/data";
import { MarkProps } from "../../lib/types";
import { ReactElement, useState } from "react";

export function Mark({
  props,
  mark,
}: {
  props: MarkProps;
  mark: (props: MarkProps) => ReactElement<MarkProps>;
}) {
const { cellData } = useCellData({ filters: props.filters, data: props.data, xRange: props.xRange, yRange: props.yRange });
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeHandler({ elem });
  props.width = width;
  props.height = height;
  props.cellData = cellData;
  return (
    <div
      className="mark"
      ref={setElem}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      {mark(props)}
    </div>
  );
}
