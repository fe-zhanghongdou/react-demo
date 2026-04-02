import React from 'react'


export interface treeNodeData {
  label: string;
  id: string | number;
  children?: treeNodeData[] | null | undefined
}

export default function TreeNode({ node, onToggle, level = 0 }) {
  const hasChildren = node.children && node.children.length > 0

  const handleChangeCheckbox = () => {
    onToggle(node.id)
  }

  return (
    <>
      <div style={{ marginLeft: 20 * level + 'px'}}>
        <label>
          <input type="checkbox" value={node.checked} onChange={handleChangeCheckbox} />
          { node.label }
        </label>
      </div>
      {
        hasChildren &&
        node.children.map(childNode => <TreeNode key={childNode.id} node={childNode} level={level + 1} onToggle={onToggle}></TreeNode>)
      }
    </>
  )
}
