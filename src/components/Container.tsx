import React from 'react';

export const Container: React.FC = ({ children }) => {
  return <div className="mx-auto max-w-screen-md">{children}</div>;
};
