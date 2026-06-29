import { AppProvider } from './src/app/AppProvider';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <AppProvider>
      <HomeScreen />
    </AppProvider>
  );
}
