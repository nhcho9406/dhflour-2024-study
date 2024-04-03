import React, { useState } from 'react';

// 에러: Props 인터페이스 타입 정의가 누락되었습니다.
// 에러: "useState"는 React 함수 컴포넌트나 사용자 정의 Hook 함수에서만 호출되어야 합니다.
function badComponent(props) {
  // 에러: 'useState'와 같은 React Hook은 함수형 컴포넌트의 본문 내부에서만 호출되어야 합니다.
  const [count, setCount] = useState(0);

  // 에러: 화살표 함수는 할당을 반환하지 않아야 합니다.
  // 에러: 'e'는 정의되었지만 사용되지 않았습니다.
  const handleClick = (e) => count += 1;

  // 에러: 클릭 이벤트를 가진 보이는, 비대화형 요소는 최소한 하나의 키보드 리스너를 가져야 합니다.
  // 에러: 비대화형 요소에는 마우스나 키보드 이벤트 리스너를 할당해서는 안 됩니다.
  // 에러: JSX 속성은 화살표 함수를 사용하지 않아야 합니다.
  return (
    <div onClick={() => handleClick()} style={{ cursor: 'pointer' }}>
      Count:
      {count}
    </div>
  );
}

export default badComponent;
