import { useResizeHandler } from "../../hooks/resize";
import { MarkProps } from "../../lib/types";
import { ReactElement, useState } from "react";

export function Mark({
  props,
  mark,
}: {
  props: MarkProps;
  mark: (props: MarkProps) => ReactElement<MarkProps>;
}) {
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeHandler({ elem });
  props.width = width;
  props.height = height;
  return (
    <div
      ref={setElem}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "darkgray",
      }}
    >
      {mark(props)}
    </div>
  );
}
