import { useState, useCallback } from "react";

export interface TreeNodeData {
  label: string;
  id: string | number;
  children?: treeNodeData[] | null | undefined
}

const useTree = (initialData: TreeNodeData[]) => {
  const [treeData, setTreeData] = useState(initialData);

  const toggleNode = useCallback((nodeId: string | number) => {
    setTreeData((prevData) => {
      // 递归函数：更新树，同时处理勾选联动
      const updateTree = (nodes: TreeNodeData[]): TreeNodeData[] => {
        return nodes.map((node) => {
          // 找到目标节点
          if (node.id === nodeId) {
            const newChecked = !node.checked; // 切换状态
            // 更新当前节点及其所有子孙节点
            const updateChildren = (
              children?: TreeNodeData[],
            ): TreeNodeData[] | undefined => {
              if (!children) return undefined;
              return children.map((child) => ({
                ...child,
                checked: newChecked,
                children: updateChildren(child.children),
              }));
            };
            return {
              ...node,
              checked: newChecked,
              children: updateChildren(node.children),
            };
          }

          // 如果有子节点，递归处理子节点
          if (node.children) {
            const updatedChildren = updateTree(node.children);
            // 回溯时根据子节点状态重新计算当前节点的 checked
            const allChecked = updatedChildren.every((child) => child.checked);
            return {
              ...node,
              checked: allChecked,
              children: updatedChildren,
            };
          }

          // 叶子节点且不是目标节点，直接返回
          return node;
        });
      };

      return updateTree(prevData);
    });
  }, []);

  return { treeData, toggleNode };
};


export default useTree;