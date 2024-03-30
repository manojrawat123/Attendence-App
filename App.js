import * as React from 'react';
import { DataContext, DataProviderFuncComp } from './src/context';
import Main from './src/main';
import Toast from 'react-native-toast-message';

function App() {


  return (
    <DataProviderFuncComp>
    <Main />
    </DataProviderFuncComp>
  );
}

export default App;