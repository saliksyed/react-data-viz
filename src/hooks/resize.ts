import { useEffect, useState } from "react";

export function useResizeHandler({ elem }: { elem: HTMLDivElement | null }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (!elem) return;
    const resizeObserver = new ResizeObserver(() => {
      const rect = elem!.getBoundingClientRect();
      setWidth(rect.width);
      setHeight(rect.height);
    });
    const rect = elem.getBoundingClientRect();
    setWidth(rect.width);
    setHeight(rect.height);
    resizeObserver.observe(elem);
    return () => resizeObserver.disconnect();
  }, [elem]);
  return { width, height };
}