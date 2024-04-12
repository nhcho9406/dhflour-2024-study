import React, { useMemo } from 'react';

function computeExpensiveValue(a: number, b: number): number {
  // 시간이 오래 걸리는 연산을 가정
  return a + b; // 단순 예시
}

interface Props {
  a: number;
  b: number;
}

function UseMemoComponent({ a, b }: Props) {
  // 의존성 배열의 값들이 변경될때만 computeExpensiveValue 함수가 다시 실행.
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

  return (
    <div>
      <h1>UseMemo example</h1>
      <p>
        Count:
        {memoizedValue}
      </p>
    </div>
  );
}

export default UseMemoComponent;
