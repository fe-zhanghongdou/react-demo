import { useRef, useState } from "react";

const SSEOnlyFE = () => {
  const [data, setData] = useState("");
  const timer = useRef(null);
  const handleClick = () => {
    setData("思考中...");
    clearTimer();
    fetch("http://localhost:3001/sse")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((resData) => {
        console.log(resData)
        setData("");
        // const rst = filterData(resData);
        timerEffect(resData);
      });
  };

  const filterData = (dataString) => {
    let rst = "";
    const dataBlocks = dataString.split("data:");
    // 过滤掉第一个空项（由于split()在字符串开始处不匹配）
    dataBlocks.shift();
    // 遍历每个数据块，解析JSON并提取content
    dataBlocks.forEach((block) => {
      const jsonData = JSON.parse(block);
      // 根据 event 来整合最终的数据
      if (jsonData.event === "start" || jsonData.event === "message") {
        rst += jsonData.content;
      }
      // 因为当前方案的 fetch 请求获取的是 SSE 连接结束后的整体数据，因此不必在意 jsonData.event 为 done 的状态
    });
    return rst;
  };

  // 用 setInterval 来实现逐个字符的输出
  const timerEffect = (contentStr) => {
    const contentList = contentStr.split("");
    timer.current = setInterval(() => {
      if (contentList.length > 0) {
        const content = contentList.shift();
        setData((prevData) => prevData + content);
      } else {
        clearTimer();
      }
    }, 100);
  };

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = null;
  };

  return (
    <div className="m-[20px] ml-[40px]">
      <h2 className="mb-[10px] text-[20px] font-bold">普通请求 + 前端模拟</h2>
      <div className=" p-[10px] w-[400px] h-[200px] bg-slate-200">
        <div
          className="w-[80px] h-[30px]  text-center rounded-[10px] bg-blue-300 cursor-pointer"
          onClick={handleClick}
        >
          <span>发起请求</span>
        </div>
        <div>
          <div>输出结果：</div>
          <div className="text-[#333] w-[300px] ">{data}</div>
        </div>
      </div>
    </div>
  );
};

export default SSEOnlyFE;
