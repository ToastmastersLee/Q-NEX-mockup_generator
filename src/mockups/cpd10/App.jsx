import { Cpd10Provider } from './context/Cpd10Context';
import { Cpd10Shell } from './components/shell/Cpd10Shell';
import './styles/cpd10.css';

export default function App() {
  return (
    <Cpd10Provider>
      <Cpd10Shell />
    </Cpd10Provider>
  );
}
