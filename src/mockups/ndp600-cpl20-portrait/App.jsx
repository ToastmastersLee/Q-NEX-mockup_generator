import { Ndp600Provider } from './context/Ndp600Context';
import { Ndp600Shell } from './components/shell/Ndp600Shell';
import './styles.css';

export default function Ndp600PortraitApp() {
  return (
    <Ndp600Provider>
      <Ndp600Shell />
    </Ndp600Provider>
  );
}
