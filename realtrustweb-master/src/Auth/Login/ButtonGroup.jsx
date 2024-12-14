import React from 'react';

const ButtonGroup = ({ isHomeSeeker, onToggle }) => (
  <div className="flex flex-wrap mb-4 gap-2">
    <button
      onClick={() => onToggle(true)}
      className={`flex-1 p-3 rounded-lg ${isHomeSeeker ? 'bg-yellow-500 text-white font-semibold' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
    >
      Home Seeker
    </button>
    <button
      onClick={() => onToggle(false)}
      className={`flex-1 p-3 rounded-lg ${!isHomeSeeker ? 'bg-yellow-500 text-white font-semibold' : 'bg-gray-200 text-gray-700'} transition-colors duration-300`}
    >
      Property Owner
    </button>
  </div>
);

export default ButtonGroup;