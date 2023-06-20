import { Filter, DataTable, Range, Column, AxisDefinition, getAxisDefinition, getAxisDimensions, Dimension } from "../lib/types";
import { useEffect, useState } from "react";

export type CellData = {
  xPercent: number;
  yPercent: number
  xValue?: number;
  yValue?: number;
  filters: Filter[];
}

export function useAxes({
  rows,
  columns,
  data
} : {
  rows: number[];
  columns: number[];
  data: DataTable;
}) {
  const blankAxis = { title: "", subitems: []};
  const [xDims, setXDims] = useState<Dimension>(getAxisDimensions(blankAxis));
  const [yDims, setYDims] = useState<Dimension>(getAxisDimensions(blankAxis));
  const [x, setX] = useState<AxisDefinition>(blankAxis);
  const [y, setY] = useState<AxisDefinition>(blankAxis);
  
  useEffect(() => {
    const xAxis = getAxisDefinition(rows.map(d => data.columns[d]), data);    
    const yAxis = getAxisDefinition(columns.map(d => data.columns[d]), data);
    setX(xAxis);
    setY(yAxis);
    const xAxisDims = getAxisDimensions(xAxis);
    const yAxisDims = getAxisDimensions(yAxis);
    setXDims(xAxisDims);
    setYDims(yAxisDims);
  }, [rows, columns, data])

  return {xDims, yDims, x, y};
}

export function useCellData({
  filters,
  data,
  xRange,
  yRange,
}:{
  filters: Filter[],
  data: DataTable,
  xRange?: Range,
  yRange?: Range,

}) {
  const [cellData, setCellData] = useState<CellData[]>([]);
  useEffect(() => {
    const finalData : CellData[] = data.rows
      .filter((row) => {
        let passes = true;
        filters.forEach((filter) => {
          if (filter.field && row[filter.field] !== filter.value) passes = false;
        });
        return passes;
      }).map((row) => {
        const xPercent = xRange
          ? ((row[xRange.field] as number) - xRange.min) /
            (xRange.max - xRange.min)
          : 1.0;
        const yPercent = yRange
          ? ((row[yRange.field] as number) - yRange.min) /
            (yRange.max - yRange.min)
          : 1.0;
        const xValue = xRange ? row[xRange.field] as number : undefined;
        const yValue = yRange ? row[yRange.field] as number : undefined;
        return { xPercent, yPercent, xValue, yValue, filters };
      }).sort((a, b) => {
        return (b.yPercent - a.yPercent);
      });
      setCellData(finalData);
  }, [data, filters, xRange, yRange]);
  return { cellData };
}