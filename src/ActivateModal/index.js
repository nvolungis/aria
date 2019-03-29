import React from 'react';
import './styles.css';

export default ({isOn, setIsOn}) => {

  const className = [
    'Modal',
    isOn ? 'Modal--is-hidden' : '',
  ].join(' ');


  return (
    <div className={className}>
      <div className="Modal__content">
        <h1 className="Modal__headline">aria</h1>
        <button
          className="Modal__button"
          onClick={() => setIsOn(true)}
        >
          start yr engines
        </button>
      </div>
    </div>
  );
};
