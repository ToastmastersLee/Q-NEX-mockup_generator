import { NmpProvider } from './context/NmpContext';
import { NmpShell } from './components/shell/NmpShell';

function App() {
  return (
    <NmpProvider>
      <NmpShell />
    </NmpProvider>
  );
}

export default App;
