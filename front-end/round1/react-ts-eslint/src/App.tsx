import React from 'react';
import UseStateComponent from './component/useState';
import UseEffectExample from './component/useEffect';
import UseMemoComponent from './component/useMemo';
import UseCallbackComponent from './component/useCallback';
import UseEffectCleanup from './component/useEffectCleanup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        react & typescript & eslint test
      </header>
      <UseStateComponent />
      <UseEffectExample />
      <UseEffectCleanup />
      <UseMemoComponent a={99} b={450} />
      <UseCallbackComponent />
    </div>
  );
}

export default App;
