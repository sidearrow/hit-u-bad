import React from 'react';
import { Container } from './Container';

export const PageHeader: React.FC = ({ children }) => {
  return (
    <div className="bg-gray-100 py-4">
      <Container>
        <h1 className="text-xl">{children}</h1>
      </Container>
    </div>
  );
};
