import { MarkProps } from "../../lib/types";

export function Rect(props : MarkProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {props.cellData.map((range, i) => {
        const color = "rgba(255, 0, 0, 0.5)";
        return (
          <div
            {...props}
            key={"rect-" + i}
            style={{
              border: "0.5px solid white",
              position: "absolute",
              marginTop: props.height - range.yPercent * props.height,
              width: range.xPercent * props.width + "px",
              height: range.yPercent * props.height + "px",
              background: color,
              ...props.style
            }}
          />
        );
      })}
    </>
  );
}
