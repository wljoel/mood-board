import React from 'react';
import './Spinner.styles.css';

const Spinner: React.FC = () => {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="loader" />
    </div>
  );
};

export default Spinner;
