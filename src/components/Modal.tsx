import React, { useState,memo } from "react";
import { createPortal } from "react-dom";

export default memo(function Modal({ open, onClose, children, getData }) {
	const [childCount, setChildCount] = useState(1.1);

	console.log('子组件渲染了')

  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
				<button className="bg-sky-500 hover:bg-sky-700" onClick={getData}>按钮</button>

        {children}
      </div>
    </div>,
    document.body,
  );
})
