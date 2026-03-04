import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from './store/counterReducer'
import Child from './components/Child'
import useToggle from './components/useToogle'
// import getType from './tools/getType'
import extendClass from './tools/extendClass'
import { debounce } from './tools/debounce'

import Modal from './components/Modal'

import { groupAnagrams, maxArea, threeSum } from './tools/algrithm'
import SSE from './components/sse'


const res = threeSum([-1,0,1,2,-1,-4])


function App() {
  const [count, setCount] = useState(0)
  const [isShow, toggleShow] = useToggle(true)
  const [isModalOpen, setIsModalOpen] = useState(true);

  const dispatch = useDispatch()
  const countValue = useSelector((state: any) => state.counter.count)

  useEffect(() => {
  }, [countValue])

  const list = useMemo(() => {
    const l = []
    for(let i = 0; i < parseInt(Math.random() * 9) + 1; i ++) {
      l.push(i);
    }
    return l
  }, [])

  const handleClickCountAdd = useCallback(() => {
    setCount(count + 1);
  }, [count])


  const handlOnCloseModal = () => {
    console.log('关闭modal')
    setIsModalOpen(false);
  }

  const handleClick = (data1, data2) => {
    dispatch(increment(2))
    toggleShow()
    setIsModalOpen(true);
  }

  // 测试子组件的callback
  const handleGetData = () => {
    console.log('父组件触发了getData')
  }

  const fn = debounce(handleClick, 1000)
  

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClickCountAdd}>
          count is {count}
        </button>
        <button onClick={() => fn([1,2,3], 'test string')}>点击增加2</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Child count={count} />
      <div className="bg-red-500 text-black p-4">
        Hello, Tailwind!
      </div>
      <SSE></SSE>

      <button onClick={() => setIsModalOpen(true)}>点击弹窗显示</button>
      <Modal open={isModalOpen} onClose={handlOnCloseModal} getData={handleGetData}>
        <div className='headear'>
          标题
        </div>
        <div className='content'>
          内容
        </div>
        <div>
          footer
        </div>
      </Modal>
      
    </>
  )
}

export default App
