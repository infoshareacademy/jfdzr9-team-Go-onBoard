import React from 'react';

interface ButtonProps {
  text: string;
  videoId: string;
}

const Button: React.FC<ButtonProps> = ({ text, videoId }) => {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;