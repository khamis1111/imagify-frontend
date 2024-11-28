import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div
      className={`shadow-md p-6 bg-[#FFFFFF33] rounded-md border border-[#E1E1E1] ${className}`}
    >
      {children}
    </div>
  );
};
