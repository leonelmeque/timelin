import { useState, useEffect } from 'react';

export const useFilterByStatus = (status: string, data: any[]) => {
  const [filteredData, setFilteredData] = useState<any>([]);

  const setFilterStatus = () => {
    if (!data) return;

    const filteredItems = data.filter((item: any) => item.status === status);
    setFilteredData(filteredItems || []);
  };

  useEffect(() => {
    setFilterStatus();
  }, [status]);

  return filteredData;
};
