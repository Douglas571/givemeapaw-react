import React from 'react';
import { useNavigate } from 'react-router-dom';

import IconButton from '@/components/IconButton';

function NavBarEndMenu() {
  const navegation = useNavigate();

  const goBack = () => {
    navegation('..');
  };

  return (
    <div className="bg-white shadow-xl py-2">
      <IconButton
        className="text-primary"
        be="arrow_back"
        onClick={goBack}
      />
    </div>
  );
}

export default NavBarEndMenu;