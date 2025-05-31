import React, { useState, useMemo } from 'react';

const SortableTable = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => requestSort(col.key)}
              className="cursor-pointer border p-2 bg-gray-100 hover:bg-gray-200"
            >
              {col.label}{' '}
              {sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, idx) => (
          <tr key={idx} className="border-t even:bg-gray-50">
            {columns.map((col) => (
              <td key={col.key} className="p-2 border">
                {item[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
