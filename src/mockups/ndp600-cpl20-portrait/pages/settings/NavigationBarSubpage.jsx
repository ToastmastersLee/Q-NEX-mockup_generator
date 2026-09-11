import { useState } from 'react';
import { Home, Eye, EyeOff } from 'lucide-react';
import { navItems, menuConfigItems } from '../../constants/nav';

export function NavigationBarSubpage({ navConfig, onNavConfigChange, itemsOrder, setItemsOrder }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...itemsOrder];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    setItemsOrder(newOrder);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="ndp-page ndp-scroll-page">
      <div className="ndp-nav-subtitle">
        Long press and drag to order the list
      </div>
      <div className="ndp-nav-list-card">
        {itemsOrder.map((id, index) => {
          const item = menuConfigItems.find(n => n.id === id);
          if (!item) return null;
          const origItem = navItems.find(n => n.id === id);
          const Icon = origItem ? origItem.icon : Home;
          const isVisible = navConfig[id];

          return (
            <div 
              key={id} 
              className={`ndp-nav-sort-row ${draggedIndex === index ? 'is-dragging' : ''} ${!isVisible ? 'is-hidden' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              {/* Eye Visibility Icon */}
              <button 
                type="button" 
                className="ndp-eye-btn"
                onClick={() => onNavConfigChange(id)}
              >
                {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>

              {/* Menu Icon and Label */}
              <div className="ndp-nav-item-info">
                <Icon size={18} className="ndp-nav-row-icon" />
                <span className="ndp-nav-row-label">{item.label}</span>
              </div>

              {/* Drag Handle */}
              <div className="ndp-drag-handle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
