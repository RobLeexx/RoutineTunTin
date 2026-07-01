import { AppProvider } from './src/app/AppProvider';
import { CreateRoutineScreen } from './src/screens/CreateRoutineScreen';

export default function App() {
  return (
    <AppProvider>
      <CreateRoutineScreen />
    </AppProvider>
  );
}
