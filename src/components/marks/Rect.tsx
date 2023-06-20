import { useResizeHandler } from "../../hooks/resize";
import { Filter, DataTable, AxisOrientation, Range } from "../../lib/types";
import { useState } from "react";
export function Rect({
  filters,
  data,
  orientation,
  range
}: {
  filters: Filter[],
  data: DataTable,
  orientation: AxisOrientation,
  range?: Range
}) {
  
  const [elem, setElem] = useState<HTMLDivElement | null>(null);
  const { width, height } = useResizeHandler({ elem })
  const finalData = data.rows.filter((row) => {
    let passes = true;
    filters.forEach((filter) => {
      if (row[filter.field] !== filter.value) passes = false;
    })
    return passes;
  }).map((row) => {
    const percent =  range ? (row[range.field] as number - range.min) / (range.max - range.min) : 1.0;
    return percent;
  });

  console.log(finalData);

  return <div 
    ref={setElem}
    style={{
      height: "100%",
      width: "100%",
      backgroundColor: "darkgray",
  }}>
    {
      finalData.map((percent,i) => {
        const color = "red";
        
        return <div 
          key={"rect-" + i}
          style={{
            border: "0.5px solid white",
            position: "absolute",
            marginTop: orientation === "vertical" ? height - (percent*height) : 0,
            width: orientation === "horizontal" ? percent*width + "px" : width,
            height: orientation === "vertical" ? percent*height + "px" : height,
            background: color,
        }}/>
      })
    }
  </div>
}