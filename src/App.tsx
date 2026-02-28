import { useState, useEffect, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './store/counterReducer'
import Child from './components/Child'
import useToggle from './components/useToogle'
// import getType from './tools/getType'
import extendClass from './tools/extendClass'


function App() {
  const [count, setCount] = useState(0)
  const [isShow, toggleShow] = useToggle(true)

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


  const handleClick = () => {
    dispatch(increment(2))
    toggleShow()
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleClick}>点击增加2</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Child count={count} />
      { isShow }
    </>
  )
}

export default App
