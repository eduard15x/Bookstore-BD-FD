interface ITablePaginationProps {
  dataLength: number;
  itemsOnPage: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  handlePageChange: (pageDisplayed: number) => void;
}

export const TablePagination = ({
  dataLength,
  itemsOnPage,
  startIndex,
  endIndex,
  currentPage,
  handlePageChange,
}: ITablePaginationProps) => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsOnPage = 10;
  const totalPagesBasedOnData = Math.ceil(dataLength / itemsOnPage);

  const showPrevPage = () => {
    // setCurrentPage(currentPage - 1);
    handlePageChange(currentPage - 1);
  };

  const showNextPage = () => {
    // setCurrentPage(currentPage + 1);
    handlePageChange(currentPage + 1);
  };

  return (
    <div className="w-full flex py-2 mt-2">
      <button
        disabled={currentPage === 1}
        onClick={showPrevPage}
        className="w-[60px] border-none rounded-md py-0.5 px-2.5 bg-[#90afca] text-white font-semibold hover:brightness-110 disabled:brightness-100 disabled:opacity-40"
      >
        Prev
      </button>
      <p className="mx-3">
        Showing <strong>{startIndex + 1}</strong> - <strong>{endIndex < dataLength ? endIndex : dataLength}</strong> of <strong>{dataLength}</strong> results
      </p>
      <button
        disabled={currentPage === totalPagesBasedOnData}
        onClick={showNextPage}
        className="w-[60px] border-none rounded-md py-0.5 px-2.5 bg-[#90afca] text-white font-semibold hover:brightness-110 disabled:brightness-100 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};
