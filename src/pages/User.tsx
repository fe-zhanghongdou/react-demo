import React, { useState, useMemo } from 'react';

const SortableTable = ({ initialData }) => {
  // 排序状态：{ key: 排序列, direction: 'asc' 或 'desc' }
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // 处理表头点击
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // 根据排序配置对数据进行排序
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return initialData;

    const sorted = [...initialData]; // 创建副本，避免直接修改原数据
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        // 数字类型直接比较
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        // 字符串类型使用 localeCompare
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }
    });
    return sorted;
  }, [initialData, sortConfig]);

  // 获取排序箭头指示符
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
            Name{getSortIndicator('name')}
          </th>
          <th onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>
            Age{getSortIndicator('age')}
          </th>
          <th onClick={() => requestSort('sex')} style={{ cursor: 'pointer' }}>
            Sex{getSortIndicator('sex')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.sex}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export default function User() {
    const data = [
    { name: 'Alice', age: 30, sex: 'Female' },
    { name: 'Bob', age: 25, sex: 'Male' },
    { name: 'Charlie', age: 35, sex: 'Male' },
    { name: 'Diana', age: 28, sex: 'Female' },
  ];
  return (
    <div>
      <h3>可排序表格</h3>
      <SortableTable initialData={data} />
    </div>
  )
}