import React from 'react';

const AccessButton = ({ onClick }) => {
  return (
    <a href="/login">
      <button
        onClick={onClick}
        style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none' }}
      >
      Acessar o Sistema
      </button>
    </a>
  );
};

export default AccessButton;