// Data

export type Value = string | number;

export type FieldType = "quantitative" | "categorical";

export type QuantitativeField = {
  type: "quantitative";
  name: string;
};

export type CategoricalField = {
  type: "categorical";
  name: string;
};

export type Column = QuantitativeField | CategoricalField;

export type Filter = { field: Value; value: Value };

export type Row = {
  [key: string]: Value;
};

export type DataTable = {
  columns: Column[];
  rows: Row[];
};
// Axes
export type AxisOrientation = "vertical" | "horizontal";
export type AxisPosition = "before" | "after";

export type RangeScale = "log" | "linear";

export type MarkProps = {
  filters: Filter[];
  data: DataTable;
  xRange?: Range;
  yRange?: Range;
  width: number;
  height: number;
};

export type Range = {
  field: string;
  min: number;
  max: number;
  scale: RangeScale;
};

type AxisSubItem = { title: Value; axis: AxisDefinition | null };

export type AxisDefinition = {
  title: Value;
  subitems: AxisSubItem[];
  range?: Range;
};

export type Dimension = { width: number; height: number };

export function getAxisDimensions(axis: AxisDefinition): Dimension {
  const CHAR_WIDTH = 18;
  const CHAR_HEIGHT = 24;
  const AXIS_WIDTH = 54;
  const PADDING = 24;
  const titleWidth = CHAR_WIDTH * ("" + axis.title).length + PADDING;
  const titleHeight = CHAR_HEIGHT;
  if (axis.range) {
    return { width: Math.max(180, titleWidth), height: AXIS_WIDTH };
  }
  let axisTitlesWidth = 0;
  let axisTitlesHeight = CHAR_HEIGHT;
  let axisItemsWidth = 0;
  let axisItemsHeight = 0;
  if (axis.subitems.length > 0) {
    axis.subitems.map((d) => {
      const currTitleWidth = ("" + d.title).length * CHAR_WIDTH;
      axisTitlesWidth += currTitleWidth;
      if (d.axis) {
        const dims = getAxisDimensions(d.axis);
        axisItemsWidth += dims.width;
        axisItemsHeight = Math.max(dims.height, axisItemsHeight);
      }
    });
  }
  return {
    width: Math.max(Math.max(titleWidth, axisItemsWidth), axisTitlesWidth),
    height: titleHeight + axisItemsHeight + axisTitlesHeight,
  };
}

export function getAxisDefinition(
  items: Column[],
  data: DataTable
): AxisDefinition {
  if (items.length === 0) {
    return {
      title: "",
      subitems: [],
    };
  } else {
    if (items[0].type === "quantitative") {
      if (items.length > 1) throw "Cannot nest after quantitative field";
      const values = data.rows
        .map((d) => d[items[0].name])
        .sort((a, b) => (a as number) - (b as number));
      return {
        title: items[0].name,
        range: {
          field: items[0].name,
          min: Math.floor(values[0] as number),
          max: Math.ceil(values[values.length - 1] as number),
          scale: "linear",
        },
        subitems: [],
      } as AxisDefinition;
    } else {
      const remaining = items.slice(1);
      const unique = Array.from(
        new Set(data.rows.map((d) => d[items[0].name]))
      );

      return {
        title: items[0].name,
        subitems: unique.map((d) => {
          return {
            title: d,
            axis:
              remaining.length > 0 ? getAxisDefinition(remaining, data) : null,
          };
        }) as AxisSubItem[],
      };
    }
  }
}
