// SkeletonCard.tsx
import React from 'react';
import './SkeletonCard.css'; // 样式可自行定义

const SkeletonCard: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-avatar" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
    </div>
  );
};

export default SkeletonCard;