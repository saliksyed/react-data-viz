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

export function getAxisDefinition(
  items: Column[],
  data: DataTable
): AxisDefinition {
  if (items.length === 0) {
    throw "Invalid axis definition";
  } else {
    if (items[0].type === "quantitative") {
      if (items.length > 1) throw "Cannot nest after quantitative field";
      return {
        title: items[0].name,
        range: {
          field: items[0].name,
          min: 0,
          max: 1,
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
