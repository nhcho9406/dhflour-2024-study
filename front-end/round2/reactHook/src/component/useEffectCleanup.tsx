import React, { useState, useEffect } from 'react';

function UseEffectCleanup() {
  // window.innerWidth: 브라우저 창의 내부 너비를 픽셀 단위로 나타냅니다.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // window.addEventListener:특정 이벤트가 발생할 때마다 지정한 함수가 실행되도록 하는 방법입니다.
    // 'resize' 이벤트는 사용자가 브라우저의 크기를 조절할 때마다 발생합니다.
    window.addEventListener('resize', handleResize);

    // cleanup 함수 => 컴포넌트가 언마운트되거나 업데이트되기 전에 필요한 정리 작업을 수행합니다.
    // 클린업 함수는 주로 이벤트 리스너를 제거하거나, 구독을 해지하거나, 타이머를 취소하는 데 사용됩니다.
    return () => {
      // window.removeEventListener: 추가된 이벤트 리스너를 제거하는 방법입니다.
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 의존성 배열 => 컴포넌트가 언마운트 될때 클린업 함수 실행, 의존성 배열에 값이 있을 경우 => 해당 값이 변경될 때마나 클린업 함수 실행

  return (
    <div>
      <h1>UseCallback Cleanup example</h1>
      <p>
        Current window width:
        {windowWidth}
      </p>
    </div>
  );
}

export default UseEffectCleanup;
