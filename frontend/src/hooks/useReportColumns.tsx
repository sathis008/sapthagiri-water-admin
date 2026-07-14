import { useEffect, useState } from "react";

export const useReportColumns = (
  storageKey: string,
  defaultColumns: string[],
) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    const saved = localStorage.getItem(storageKey);

    if (!saved) return defaultColumns;

    try {
      return JSON.parse(saved);
    } catch {
      return defaultColumns;
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(visibleColumns));
  }, [storageKey, visibleColumns]);

  const resetColumns = () => {
    setVisibleColumns(defaultColumns);

    localStorage.removeItem(storageKey);
  };

  return {
    visibleColumns,

    setVisibleColumns,

    resetColumns,
  };
};
