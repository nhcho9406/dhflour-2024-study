import React from 'react';
import UseStateComponent from './page/useState';
import UseEffectExample from './page/useEffect';
import UseMemoComponent from './page/useMemo';
import UseCallbackComponent from './page/useCallback';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        react & typescript & eslint test
      </header>
      <UseStateComponent />
      <UseEffectExample />
      <UseMemoComponent a={99} b={450} />
      <UseCallbackComponent />
    </div>
  );
}

export default App;
