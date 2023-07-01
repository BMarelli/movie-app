import React from 'react'

interface ErrorProps {
  text: string;
}

export const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <>
      <div className="text-red-500 text-center text-2xl">{text}</div>
    </>);
}