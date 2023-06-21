import {
  AxisDefinition,
  AxisOrientation,
  AxisPosition,
  Value,
  Range,
  Dimension,
} from "../../lib/types";
import { useState, useEffect } from "react";
import * as d3 from "d3";
import { useResizeHandler } from "../../hooks/resize";

function AxisLabel({
  value,
  orientation,
  emphasis,
}: {
  value: Value;
  orientation: AxisOrientation;
  emphasis?: boolean;
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
        padding: 2,
        color: emphasis ? "darkgray" : undefined,
        fontStyle: emphasis ? "italic" : undefined,
        overflow: "hidden",
      }}
    >
      <span style={style}>{value}</span>
    </div>
  );
}

function AxisScale({
  position,
  orientation,
  range,
}: {
  position: AxisPosition;
  orientation: AxisOrientation;
  range: Range;
}) {
  const [svg, setSvg] = useState<SVGElement | null>(null);
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeHandler({ elem });
  useEffect(() => {
    if (!svg) return;
    d3.select(svg).selectAll("svg > *").remove();
    let axis = null;
    let transform = null;
    const rect = svg.getBoundingClientRect();
    if (position === "after") {
      if (orientation === "horizontal") {
        const scale = d3
          .scaleLinear()
          .domain([range.min, range.max])
          .range([0, rect.width]);
        axis = d3.axisBottom(scale);
      } else {
        const scale = d3
          .scaleLinear()
          .domain([range.max, range.min])
          .range([0, rect.height]);
        axis = d3.axisRight(scale);
      }
    } else {
      if (orientation === "horizontal") {
        const scale = d3
          .scaleLinear()
          .domain([range.min, range.max])
          .range([0, rect.width]);
        axis = d3.axisTop(scale);
        transform = "translate(0, 35)";
      } else {
        const scale = d3
          .scaleLinear()
          .domain([range.max, range.min])
          .range([0, rect.height]);
        axis = d3.axisLeft(scale);
        transform = "translate(35, 0)";
      }
    }

    d3.select(svg).append("g").attr("transform", transform).call(axis);

    d3.select(svg)
      .selectAll(".tick")
      .filter((d) => {
        return d === range.min || d === range.max;
      })
      .remove();
  }, [svg, width, height]);
  return (
    <div
      ref={setElem}
      style={{
        display: "flex",
      }}
    >
      <svg
        style={{
          height: orientation === "vertical" ? "100%" : 35,
          width: orientation === "horizontal" ? "100%" : 35,
        }}
        ref={setSvg}
      ></svg>
    </div>
  );
}

function getFinalAxisDims(
  orientation: AxisOrientation,
  dimensions?: Dimension
) {
  if (!dimensions) {
    if (orientation === "horizontal") {
      return { width: "100%", height: undefined };
    } else {
      return { width: undefined, height: "100%" };
    }
  } else {
    if (orientation === "horizontal") {
      return { width: dimensions.width, height: dimensions.height };
    } else {
      return { width: dimensions.height, height: dimensions.width };
    }
  }
}

export function Axis({
  orientation,
  position,
  axis,
  dimensions,
}: {
  orientation: AxisOrientation;
  position: AxisPosition;
  axis: AxisDefinition;
  dimensions?: Dimension;
}) {
  // set defaults
  if (!orientation) orientation = "horizontal";
  if (!position) position = "after";

  const axisCount = axis.subitems ? axis.subitems.length : 1;
  const style =
    orientation === "vertical"
      ? {
          gridTemplateRows: `repeat(${axisCount}, minmax(0, 1fr))`,
        }
      : {
          gridTemplateColumns: `repeat(${axisCount}, minmax(0, 1fr))`,
        };
  const dims = getFinalAxisDims(orientation, dimensions);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "column" : "row",
        width: dims.width,
        height: dims.height,
      }}
    >
      {position === "before" && (
        <AxisLabel value={axis.title} orientation={orientation} />
      )}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexGrow: 1,
          flexDirection: orientation === "horizontal" ? "column" : "row",
        }}
      >
        {axis.range && (
          <AxisScale
            range={axis.range}
            position={position}
            orientation={orientation}
          />
        )}
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
                  key={"axis-item-" + d.title}
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "stretch",
                    flexDirection:
                      orientation === "horizontal" ? "column" : "row",
                    flexGrow: 1,
                  }}
                >
                  {position === "before" && (
                    <AxisLabel value={d.title} emphasis={true} orientation={orientation} />
                  )}
                  {d.axis && (
                    <Axis
                      position={position}
                      orientation={orientation}
                      axis={d.axis}
                    />
                  )}
                  {position === "after" && (
                    <AxisLabel value={d.title} emphasis={true} orientation={orientation} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {position === "after" && (
        <AxisLabel value={axis.title} orientation={orientation} />
      )}
    </div>
  );
}
