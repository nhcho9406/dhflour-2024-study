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
