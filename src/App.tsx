import React from 'react';
import ReactDOM from 'react-dom';
import Wiktor from './Wiktor';

const App = () => {
  return (
    <div>
      <Wiktor />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));