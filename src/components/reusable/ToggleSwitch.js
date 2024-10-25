import React from 'react';

const ToggleSwitch = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className="relative h-8 w-16 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={{ backgroundColor: checked ? '#3B82F6' : '#D1D5DB' }}
      >
        <span
          className={`absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </div>
  );
};

export default ToggleSwitch;