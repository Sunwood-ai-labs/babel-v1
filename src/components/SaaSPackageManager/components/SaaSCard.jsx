
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Tower from './Icons/Tower';

const SaaSCard = ({ item, onSaaSClick, renderTowerAnimation }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer" onClick={() => onSaaSClick(item)}>
    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{item.name}</h3>
      <p className="text-sm text-indigo-500 mb-4">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          item.status === 'アクティブ' ? 'bg-green-200 text-green-800' :
          item.status === '保留中' ? 'bg-yellow-200 text-yellow-800' :
          'bg-red-200 text-red-800'
        }`}>
          {item.status}
        </span>
        <span className="text-indigo-600">{item.category}</span>
      </div>
    </div>
    <div className="bg-indigo-100 px-4 py-2 flex justify-between items-center">
      {renderTowerAnimation(item.level)}
      <button className="text-indigo-500 hover:text-indigo-700 transition duration-300">
        <MoreHorizontal size={20} />
      </button>
    </div>
  </div>
);

export default SaaSCard;
