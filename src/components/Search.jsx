import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


Search.defaultProps = {
  searchRoute: '/search/',
  defaultRoute: '/',
  placeholder: 'Search Food Amailo!',
};

export default function Search({
  searchRoute,
  defaultRoute,
  margin,
  placeholder,
}) {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? '');
  }, [searchTerm]);

  const search = async () => {
    term ? navigate(searchRoute + term) : navigate(defaultRoute);
  };
  return (
    <div className={`w-full flex justify-center items-center pb-6 `} style={{ margin }}>
      
      <div className='flex w-[350px] border overflow-hidden rounded-full justify-between items-center'>
        <input
        type="text"
        placeholder={placeholder}
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && search()}
        value={term}
        className='py-2 ml-4'
      />
      <button className='bg-red-500 py-2 px-2 text-white font-bold h-full' onClick={search}>Search</button>
      </div>
      
    </div>
  );
}