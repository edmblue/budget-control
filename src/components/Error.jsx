import React from 'react';

const Error = ({ children }) => {
  return (
    <div className="px-2 py-2 bg-red-600 rounded text-white my-3 uppercase text-center font-bold w-3/5 mx-auto">
      {children}
    </div>
  );
};

export default Error;
