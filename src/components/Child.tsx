import React, { useEffect, useRef, forwardRef } from "react";

type ChildProps = {
  count: number;
  [key: string]: string | number;
};

const Child = forwardRef((props: any, ref) => {
  React.useMemo(() => {
    console.log("count:", props.count);
  }, [props.count]);
  return <div ref={ref}>Child {props.count}</div>;
});

export default Child;
