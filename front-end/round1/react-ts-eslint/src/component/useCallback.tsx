import React, { useState, useCallback } from 'react';

function UseCallbackComponent() {
  const [count, setCount] = useState(0);

  // 클릭 이벤트 핸들러를 생성하고 메모이제이션
  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);

  return (
    <div>
      <h1>UseCallback example</h1>
      <p>
        You clicked
        {count}
        {' '}
        times
      </p>
      {/* useCallback으로 메모이제이션된 handleClick 함수 사용 */}
      <button type="button" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default UseCallbackComponent;
