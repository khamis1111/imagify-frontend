import React from "react";

export const SectionTitle = ({ title, description }) => {
  return (
    <div className="space-y-2 mb-5">
      <p className="font-medium text-4xl">{title}</p>
      <p className="font-normal text-base text-textGray">{description}</p>
    </div>
  );
};
