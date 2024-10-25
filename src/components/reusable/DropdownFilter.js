import React, { useState } from 'react';
import { ArrowDownAZ, ArrowDownZA } from 'lucide-react';

const DropdownFilter = ({ filterData, onFilterChange, defaultSelectedFilter }) => {
  const SORT_ASC = 'asc';
  const SORT_DESC = 'desc';

  const [selectedFilter, setSelectedFilter] = useState(defaultSelectedFilter || {});

  const handleDropdownChange = ({target}) => {
    const updated = {
        ...selectedFilter,
        name: target.options[target.selectedIndex].text, 
        value: target.value
      }
    setSelectedFilter(prev => updated);
    onFilterChange(updated);
  };

  const handleSortChange = () => {
    const updated = {
        ...selectedFilter,
        sort: selectedFilter.sort === SORT_DESC ? SORT_ASC : SORT_DESC
      }
    setSelectedFilter(prev => updated);
    onFilterChange(updated);
  }

  return (
    <div className='h-[51px] border rounded w-fit overflow-hidden border-primary'>
      {
        <div 
          key={filterData.category} 
          className='flex flex-row h-full items-center gap-2.5'>
          <div className='cursor-pointer ml-2.5' onClick={handleSortChange}>
          {
            selectedFilter.sort === SORT_ASC ?
              <ArrowDownAZ className=' text-light-100' /> 
              : <ArrowDownZA className=' text-light-100'/>
          }
          </div>
          <label className='font-primary text-light-100 text-xl'>{ filterData.category}</label>
          <div className='bg-light-700 h-full pr-2.5'>
          <select
            value={selectedFilter.value || ''}
            onChange={(e) => handleDropdownChange(e)}
            className='h-full bg-light-700 outline-none cursor-pointer font-primary text-light-100 text-xl p-2.5'
          >
            {filterData.options.map(option => (
              <option 
                key={option.value} 
                value={option.value}
              >
                {option.name}
              </option>
            ))}
          </select>
          </div>
        </div>
      }
    </div>
  );
};

export default DropdownFilter;
