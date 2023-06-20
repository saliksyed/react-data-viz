import { MarkProps } from "../../lib/types";

export function Text(props : MarkProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      {props.cellData.map((item, i) => {
        const color = "rgba(255, 0, 0, 0.5)";
        return (
          <div
            {...props}
            key={"text-" + i}
            style={{
              border: "0.5px solid white",
              position: "absolute",
              marginTop: props.height - item.yPercent * props.height + (props.yOffset ?? 0),
              ...props.style,
            }}
          >
            {item.xValue ?? ""} {item.yValue ?? ""}{" "}
            {item.filters.map((d) => d.value).join(", ")}
          </div>
        );
      })}
    </>
  );
}
