import React from 'react';

interface IncorrectProps {
  text: string;
}

function IncorrectPassword({ text }: IncorrectProps) {
  return <p className="text-center bg-red-400 p-2 rounded-md text-white">{text}</p>;
}

export default IncorrectPassword;
