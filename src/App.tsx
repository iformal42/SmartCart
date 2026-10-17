import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './store/store';
import { Provider } from 'react-redux';
import AppProvider from './features/app/AppProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <AppProvider />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
