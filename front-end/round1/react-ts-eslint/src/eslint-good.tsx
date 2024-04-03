import React, { useState, useCallback } from 'react';

interface Props {
  initialCount?: number;
}

const GoodComponent: React.FC<Props> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      Count:
      {' '}
      {count}
    </div>
  );
};

export default GoodComponent;
