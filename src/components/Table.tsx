import React from 'react';

export const Table: React.FC<JSX.IntrinsicElements['table']> = (props) => {
  const defaultClassName = ' w-full';
  const className = (props.className || '') + defaultClassName;
  props = { ...props, ...{ className: className } };
  return <table {...props} />;
};

export const Th: React.FC<JSX.IntrinsicElements['th']> = (props) => {
  const defaultClassName = ' font-bold bg-gray-100 py-1 px-2 border';
  const className = (props.className || '') + defaultClassName;
  props = { ...props, ...{ className: className } };
  return <th {...props} />;
};

export const Td: React.FC<JSX.IntrinsicElements['td']> = (props) => {
  const baseClasses = ' px-2 py-1 border';
  const className = (props.className || '') + baseClasses;
  props = { ...props, ...{ className: className } };

  return <td {...props} />;
};
