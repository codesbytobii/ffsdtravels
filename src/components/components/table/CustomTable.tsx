import { FC } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T & (string | number);
  Cell?: (props: { row: { original: T } }) => JSX.Element; // Optional custom cell rendering
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  header?: string;
}

const CustomTable: FC<CustomTableProps<any>> = ({
  data,
  columns,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
  header,
}) => {
  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primaryRed text-white">
            <tr>
              {header && (
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium uppercase tracking-widest"
                >
                  {header}
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium uppercase tracking-widest"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(8)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((_, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={`px-4 py-2 whitespace-nowrap ${
                      rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div className="animate-pulse bg-gray-400 h-4 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primaryRed text-white">
              <tr>
                {header && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left text-xs font-medium uppercase tracking-widest"
                  >
                    {header}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={String(column.accessor)}
                    className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-widest"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {columns.map((column) => (
                    <td
                      key={String(column.accessor)}
                      className="px-4 py-2 whitespace-nowrap capitalize text-xs font-medium tracking-wider"
                    >
                      {column.Cell ? column.Cell({ row: { original: row } }) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomTable;
