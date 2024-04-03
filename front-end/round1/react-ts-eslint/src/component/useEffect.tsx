import React, { useState, useEffect } from 'react';

function UseEffectExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

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
