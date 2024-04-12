import React, { useState, useEffect } from 'react';

function UseEffectExample() {
  const [count, setCount] = useState(0);

  //  1. 의존성 배열 내 값이 있을 때 => 배열 내의 값이 변경될 때마다 효과를 실행
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  // 2. 의존성 배열이 빈 배열인 경우 => 컴포넌트가 마운트될 때 한 번만 실행 따라서 처음 마운트될 떄만 실행되어야 할 초기화 로직에 적합합니다.
  // 이는 componentDidMount와 유사하게 작동합니다.
  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // }, []);

  //  3. 의존성 배열이 존재하지 않는 경우 => 모든 렌더링 시에 실행
  //  이는 componentDidUpdate와 유사하게 작동하며, 초기 마운트 시에도 실행됩니다.
  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  // });
  return (
    <div>
      <h1>UseState example</h1>
      <p>
        You clicked
        {count}
        {' '}
        times
      </p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default UseEffectExample;
