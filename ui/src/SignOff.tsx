import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SignOffProps {
  onSignOff: () => void;
}

const SignOff: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={handleClick}>
      Sign Off
    </button>
  );
};

export default SignOff;