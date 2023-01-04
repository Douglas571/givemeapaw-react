import React from 'react';

function Title({ children, className }) {
  return (
    <h1 className={`font-bold text-6xl text-title-gray ${className}`}>
      {children}
    </h1>
  );
}

export default Title;
