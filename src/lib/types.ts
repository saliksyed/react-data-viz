// Data

export type Value = string | number;

export type Column = string;

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

export type CategoricalAxis = {
  title: Value;
  subTitle: Value;
  subitems: CategoricalAxis[];
};

export function getCategoricalAxis(items: Column[], data: DataTable) : CategoricalAxis {
  if (items.length === 0) {
    return {
      title: "",
      subitems: [],
      subTitle: "",
    } as CategoricalAxis;
  } else {
    const unique = Array.from(new Set(data.rows.map(d => d[items[0]])));
    const remaining = items.slice(1);
    return {
      title: items[0],
      subitems: unique.map(d => {
        return {
          title: d,
          subTitle: remaining[0],
          subitems: getCategoricalAxis(remaining, data).subitems
        } as CategoricalAxis;
      })
    } as CategoricalAxis;
  }
}