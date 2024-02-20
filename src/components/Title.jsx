import React from 'react';

export default function Title({ title, fontSize, margin }) {
  return <h1 className='text-[1.2rem] font-bold pb-2' style={{ fontSize, margin, color: '#616161' }}>{title}</h1>;
}