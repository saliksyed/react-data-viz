import {
  AxisDefinition,
  AxisOrientation,
  AxisPosition,
  Value,
  Range
} from "../../lib/types";
import { useState, useEffect } from "react";
import * as d3 from 'd3';

function AxisLabel({
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
        padding: 2,
        background: "lightgray",
        border: "0.25px solid gray",
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

  useEffect(() => {
    if (!svg) return;
    d3.select(svg).selectAll("svg > *").remove();


    let axis = null;
    let transform = null;
    const rect = svg.getBoundingClientRect();
    if (position === "after") {
      if (orientation === "horizontal") {
        const scale = d3.scaleLinear()
                      .domain([range.min, range.max])
                      .range([0, rect.width]);
        axis = d3.axisBottom(scale);
      } else {
        const scale = d3.scaleLinear()
                      .domain([range.max, range.min])
                      .range([0, rect.height]);
        axis = d3.axisRight(scale);
      }
    } else {
      if (orientation === "horizontal") {
        const scale = d3.scaleLinear()
                      .domain([range.min, range.max])
                      .range([0, rect.width]);
        axis = d3.axisTop(scale);
        transform = "translate(0, 35)";
      } else {
        const scale = d3.scaleLinear()
        .domain([range.max, range.min])
        .range([0, rect.height]);
        axis = d3.axisLeft(scale);
        transform = "translate(35, 0)";
      }
    }

    d3.select(svg).append("g").attr("transform", transform).call(axis);


    d3.select(svg).selectAll(".tick").filter((d) => {
      return d === range.min || d === range.max;
    }).remove();

  }, [svg]);
  return (
    <div
      style={{
        display: "flex",
        background: "lightgray",
        overflow: "hidden",
      }}
    >
      <svg style={{
        height: orientation === "vertical" ? "100%" : 35,
        width: orientation === "horizontal" ? "100%" : 35
      }}
        ref={setSvg}
      >
      </svg>
    </div>
  );
}

export function Axis({
  orientation,
  position,
  axis,
}: {
  orientation: AxisOrientation;
  position: AxisPosition;
  axis: AxisDefinition;
}) {
  // set defaults
  if (!orientation) orientation = "horizontal";
  if (!position) position = "after";

  const axisCount = axis.subitems ? axis.subitems.length : 1;
  const style =
    orientation === "vertical"
      ? {
          gridTemplateRows: `repeat(${axisCount}, 1fr)`,
        }
      : {
          gridTemplateColumns: `repeat(${axisCount}, 1fr)`,
        };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: orientation === "horizontal" ? "column" : "row",
        width: orientation === "horizontal" ? "100%" : undefined,
        height: orientation !== "horizontal" ? "100%" : undefined,
      }}
    >
      {position==="before" && <AxisLabel value={axis.title} orientation={orientation}/>}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexGrow: 1,
          flexDirection: orientation === "horizontal" ? "column" : "row",
        }}
      >
        {axis.range && 
          <AxisScale range={axis.range} position={position} orientation={orientation}/>
        }
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
                  key={"axis-item-" + d}
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "stretch",
                    flexDirection:
                      orientation === "horizontal" ? "column" : "row",
                    flexGrow: 1,
                  }}
                >
                  {position==="before" && <AxisLabel value={d.title} orientation={orientation}/>}
                    {d.axis && <Axis
                      position={position}
                      orientation={orientation}
                      axis={d.axis}
                    />}
                  {position==="after" && <AxisLabel value={d.title} orientation={orientation}/>}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {position==="after" && <AxisLabel value={axis.title} orientation={orientation}/>}
    </div>
  );
}
