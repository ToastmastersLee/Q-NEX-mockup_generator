import { Sl100Provider } from './context/Sl100Context';
import { Sl100Shell } from './components/shell/Sl100Shell';
import './styles/sl100.css';

export default function App() {
  return (
    <Sl100Provider>
      <Sl100Shell />
    </Sl100Provider>
  );
}
