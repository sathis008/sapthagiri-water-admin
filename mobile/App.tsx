import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/theme';

export default function App() {
  return <GestureHandlerRootView style={{ flex: 1 }}><SafeAreaProvider><Provider store={store}><PaperProvider theme={theme}><StatusBar style="dark" /><AppNavigator /></PaperProvider></Provider></SafeAreaProvider></GestureHandlerRootView>;
}
