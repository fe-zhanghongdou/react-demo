import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "./store/counterReducer";
import Child from "./components/Child";
import useToggle from "./components/useToogle";
// import getType from './tools/getType'
import extendClass from "./tools/extendClass";
import { debounce, throttle, myBind, myCall } from "./tools/debounce";

import Modal from "./components/Modal";

import { groupAnagrams, maxArea, threeSum, bubbleSort, insertSort, selectSort } from "./tools/algrithm";
import SSE from "./components/sse";



// const obj =  {
//   value: 1
// }

// function bar(name, age) {
//   console.log('name', name)
//   console.log('age', age)
//   console.log(this.value);
// }

// Function.prototype.myCall = function(context) {
//   context.fn = this;
// 	context.fn();
//   var args = []
//   const len = arguments.length;
//   for (var i = 1; i < len; i ++) {
//     args.push(arguments[i]);
//   }
//   console.log('args', args)
// 	delete context.fn;
// }
// bar.myCall(obj, 'Jim', 17);



console.log(selectSort([4,2,3, 5, 1, 8, 22, 10, 4, 17]))




function App() {
  const [count, setCount] = useState(0);
  const [isShow, toggleShow] = useToggle(true);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const dispatch = useDispatch();
  const countValue = useSelector((state: any) => state.counter.count);

  useEffect(() => {}, [countValue]);

  const list = useMemo(() => {
    const l = [];
    for (let i = 0; i < parseInt(Math.random() * 9) + 1; i++) {
      l.push(i);
    }
    return l;
  }, []);

  const handleClickCountAdd = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const handlOnCloseModal = () => {
    console.log("关闭modal");
    setIsModalOpen(false);
  };

  const handleClick = (data1, data2) => {
    dispatch(increment(2));
    toggleShow();
    setIsModalOpen(true);
  };

  // 测试子组件的callback
  const handleGetData = () => {
    console.log("父组件触发了getData");
  };

  const fn = debounce(handleClick, 1000);

  const handleThrottleClick = (data) => {
    console.log('触发了throttle', data)
  };

  const throttleFn = throttle(handleThrottleClick, 1000, { leading: true, trailing: false });

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClickCountAdd}>count is {count}</button>
        <button onClick={() => fn([1, 2, 3], "test string")}>点击增加2</button>
        <button onClick={() => throttleFn('testthrottle')}>点击Throttle触发</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Child count={count} />
      <div className="bg-red-500 text-black p-4">Hello, Tailwind!</div>
      <SSE></SSE>

      <button onClick={() => setIsModalOpen(true)}>点击弹窗显示</button>
      <Modal
        open={isModalOpen}
        onClose={handlOnCloseModal}
        getData={handleGetData}
      >
        <div className="headear">标题</div>
        <div className="content">内容</div>
        <div>footer</div>
      </Modal>
    </>
  );
}

export default App;
