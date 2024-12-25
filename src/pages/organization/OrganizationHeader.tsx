import React from "react";

interface OrganizationHeaderProps {
  pageName: string;
}

const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({ pageName }) => {
  return (
    <div className="w-full h-12 bg-white flex items-center sticky top-0 p-4 shadow-sm shadow-gray-200 z-10 justify-between">
      <p className="font-medium italic capitalize text-base text-gray-600">
        {pageName}
      </p>

      <div>
        Search bar
      </div>
    </div>
  );
};

export default OrganizationHeader;
