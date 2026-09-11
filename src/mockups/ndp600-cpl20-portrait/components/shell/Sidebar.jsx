import { Home } from 'lucide-react';
import { navItems } from '../../constants/nav';

export function Sidebar({ activeTab, setActiveTab, navConfig, itemsOrder }) {
  const visibleItems = itemsOrder
    .map((id) => navItems.find((item) => item.id === id))
    .filter((item) => item && item.id !== 'home' && navConfig[item.id]);

  return (
    <aside className="ndp-sidebar">
      <button 
        className={`ndp-nav-item ${activeTab === 'home' ? 'is-active' : ''}`} 
        type="button" 
        onClick={() => setActiveTab('home')}
      >
        <Home className="ndp-nav-icon" strokeWidth={1.9} />
        <span>Home</span>
      </button>
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const active = activeTab === item.id;
        return (
          <button key={item.id} className={`ndp-nav-item ${active ? 'is-active' : ''}`} type="button" onClick={() => setActiveTab(item.id)}>
            <Icon className="ndp-nav-icon" strokeWidth={1.9} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
