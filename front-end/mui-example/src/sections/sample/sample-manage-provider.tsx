import {createContext, useCallback, useContext, useMemo, useState,} from 'react';
import {useSnackbar} from "notistack";

// ----------------------------------------------------------------------
// Props 타입을 정의합니다. 컴포넌트에서 사용할 props의 타입을 지정해줍니다.
type Props = {
  param1: string;
  param2: number;
  param3: boolean;
  value1: string | undefined;

  handleMethod: (name: string) => void;
  handleChangeValue1: (value: string) => void;
};

// 초기 상태를 정의합니다. 이 상태는 컨텍스트의 기본값으로 사용됩니다.
const initialState: Props = {
  param1: '',
  param2: 0,
  param3: false,
  value1: '',

  handleMethod: (name: string) => {
  },
  handleChangeValue1: (value: string) => {
  },
};

// createContext를 사용하여 새로운 컨텍스트를 생성합니다. initialState를 기본값으로 사용합니다.
export const SampleManagerContext = createContext(initialState);

// 컨텍스트를 사용하기 위한 훅입니다. 이 훅은 컨텍스트를 구독하고, 컨텍스트가 제공되지 않을 때 오류를 발생시킵니다.
export const useSampleManagerContext = () => {
  const context = useContext(SampleManagerContext);

  if (!context)
    throw new Error(
      'useSampleManagerContext must be use inside SampleManagerProvider'
    );

  return context;
};

// Provider 컴포넌트의 props 타입을 정의합니다.
type ManagerProviderProps = {
  children: React.ReactNode;
};

// Provider 컴포넌트를 정의합니다. 이 컴포넌트는 자식 컴포넌트들에게 컨텍스트를 제공합니다.
export function SampleManageProvider({children}: ManagerProviderProps) {
  // 스낵바 훅을 사용하여 알림 기능을 구현합니다.
  const {enqueueSnackbar} = useSnackbar();

  // 파라미터들을 정의하고 상수로 초기화합니다.
  const param1: string = "1";
  const param2: number = 2;
  const param3: boolean = true;


  // value1 상태를 관리하기 위해 useState 훅을 사용합니다.
  const [value1, setValue1] = useState<string>();

  // 파라미터 이름을 출력하고 알림을 띄우는 메서드를 useCallback으로 메모이제이션합니다.
  const handleMethod = useCallback((name: string) => {
      console.log(name, 'name');
      enqueueSnackbar('Hello!');
    },
    []
  );

// value1 값을 업데이트하는 함수를 useCallback으로 메모이제이션합니다.
  const handleChangeValue1 = useCallback(
    (value: string) => {
      setValue1(value); // value1 상태를 업데이트합니다.
    },
    [] // 이 함수는 외부 의존성이 없으므로 의존성 배열이 비어 있습니다.
  );

  // 컨텍스트로 전달할 값들을 useMemo를 사용하여 메모이제이션합니다.
  const memoizedValue = useMemo(
    () => ({
      param1,
      param2,
      param3,
      value1,
      handleMethod,
      handleChangeValue1
    }),
    [
      param1,
      param2,
      param3,
      value1,
      handleMethod,
      handleChangeValue1]
  );

  // 컨텍스트 프로바이더를 사용하여 memoizedValue를 자식 컴포넌트에게 제공합니다.
  return (
    <SampleManagerContext.Provider value={memoizedValue}>
      {children}
    </SampleManagerContext.Provider>
  );
}
