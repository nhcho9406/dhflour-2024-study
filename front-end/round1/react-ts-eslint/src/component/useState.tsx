import React, { useState } from 'react';

// useState를 사용하여 상태를 관리하는 함수형 컴포넌트 정의
function UseStateComponent() {
  // count 상태와 setCount 함수를 선언하여 상태를 관리
  const [count, setCount] = useState(0);

  // count 상태를 증가시키는 함수
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>UseState example</h1>
      <p>
        Count:
        {count}
      </p>
      <button type="button" onClick={incrementCount}>Increase Count</button>
    </div>
  );
}

export default UseStateComponent;
