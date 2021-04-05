import React, { useRef, useEffect } from "react";

const FocusInput = () => {
  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, []);

  return (
    <div>
      <button>Edit</button>
      <input ref={focusRef} text="text" />
    </div>
  );
};

export default FocusInput;
