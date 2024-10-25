import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const MenuItem = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleOpen = (e) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <Link
        to={item.path}
        className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none ${
          depth > 0 ? 'pl-' + (depth * 4 + 3) : ''
        }`}
        onClick={toggleOpen}
      >
        <div className="grid place-items-center mr-4">
          {item.icon}
        </div>
        <span className="flex-grow">{item.label}</span>
        {item.badge && (
          <div className="grid place-items-center ml-auto">
            <div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-blue-500/20 text-blue-900 py-1 px-2 text-xs rounded-full">
              <span>{item.badge}</span>
            </div>
          </div>
        )}
        {hasChildren && (
          <div className="ml-auto">
            {isOpen ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </div>
        )}
      </Link>
      {hasChildren && isOpen && (
        <div className="ml-4">
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
};

const SidebarNav = ({ menuItems }) => {
  return (
    <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 hover:scale-105">
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </nav>
  );
};

export default SidebarNav;