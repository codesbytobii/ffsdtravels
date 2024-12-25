import React from "react";

interface TableHeader {
  header: string;
}

interface TableSkeletonProps {
  headers: TableHeader[];
  rowCount: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ headers, rowCount }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-primary text-white">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider"
            >
              {header.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {[...Array(rowCount)].map((_, index) => (
          <tr key={index}>
            {headers.map((_, columnIndex) => (
              <td
                key={columnIndex}
                className={`px-4 py-2 whitespace-nowrap ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="animate-pulse bg-primaryDark bg-opacity-[8%] h-4 w-48 rounded"></p>
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
