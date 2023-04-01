import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/functions';

interface ButtonProps {
  text: string;
  functionName: string;
}

const Button: React.FC<ButtonProps> = ({ text, functionName }) => {
  const [result, setResult] = useState<any>(null);

  const handleClick = async () => {
    const fn = firebase.functions().httpsCallable(functionName);
    const response = await fn();
    setResult(response.data);
    
  };

  return (
    <>
      {result ? (
        <div>{result}</div>
      ) : (
        <button onClick={handleClick}>
          {text}
        </button>
      )}
    </>
  );
};

export default Button;