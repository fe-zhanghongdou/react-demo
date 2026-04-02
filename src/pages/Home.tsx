import React, { useState } from 'react'
import Modal, { ModalSlot } from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../store/userInfoReducer';
import TreeNode from '@components/TreeNode'
import type { treeNodeData } from '@components/TreeNode'
import useTree from '@/components/useTree'

const tData: treeNodeData[] = [
  {
    label: '湖北省',
    id: 1,
    children: [
      { label: '襄阳市', id: 2, children: null },
      { label: '武汉市', id: 3, children: null }
    ]
  }
]

const mappedTreeData = (tree) => {
  tree.forEach(item => {
    item.checked = false;
    if (item.children && item.children.length) {
      mappedTreeData(item.children)
    }
  })
}
mappedTreeData(tData);

export default function Home() {

  const userInfo = useSelector((state) => state.userInfo)
  const dispatch = useDispatch();
  const {treeData, toggleNode} = useTree(tData);

  React.useMemo(() => {
    dispatch(setUserInfo({
      name: 'lily',
      age: 23
    }))
    console.log(userInfo)
  }, [userInfo, dispatch])

  const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleToggle = (nodeId) => {
  //   setTreeData((prevData) => {
  //     const updateTree = (nodes) => {
  //       return nodes.map(node => {
  //         if (node.id === nodeId) {
  //           const newChecked = !node.checked; // 切换状态

  //           const updateChildren = (children) => {
  //             if (!children) return;
  //             return children.map(childItem => {
  //               return {
  //                 ...childItem,
  //                 checked: newChecked,
  //                 children: updateChildren(childItem.children)
  //               }
  //             })
  //           }

  //           return {
  //             ...node,
  //             checked: newChecked,
  //             children: updateChildren(node.children)
  //           }
  //         }

  //         if (node.children) {
  //           const updatedChildren = updateTree(node.children);
  //           const allChecked = updatedChildren.every(child => child.checked);
  //           return {
  //             ...node,
  //             checked: allChecked,
  //             children: updatedChildren
  //           }
  //         }
  //         return node;
  //       })
  //     }
  //     return updateTree(prevData)
  //   })
  // }

  const handleOnClose = () => {
    setIsModalVisible(false);
  }

  
  return (
    <div>
      {
        treeData.map(node => <TreeNode key={node.id} node={node} onToggle={toggleNode}></TreeNode>)
      }

      <button className='bg-blue-600 text-white' onClick={() => setIsModalVisible(true)}>打开弹窗</button>

      <Modal
        visible={isModalVisible}
        onClose={handleOnClose}
      >
        <ModalSlot slot='title'>
          <span>标题</span>
        </ModalSlot>
        <ModalSlot slot='content'>
          <span>内容</span>
        </ModalSlot>
        <ModalSlot slot='footer'>
          <button className='bg-gray-400 text-black' onClick={() => setIsModalVisible(false)}>取消</button>
          <button className='bg-blue-600 text-white'>确定</button>
        </ModalSlot>
      </Modal>
    </div>
  )
}
