import { useState, useMemo, useEffect } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MOCK_DATA from "../MOCK_DATA.json";
import "../../table.css";
import { TablePagination } from "../common/TablePagination";

const COLUMNS = [
  {
    header: "Id",
    accessor: "id",
    isDisplayed: true,
  },
  {
    header: "Title",
    accessor: "title",
    isDisplayed: true,
  },
  {
    header: "Authors",
    accessor: "books_authors",
    isDisplayed: true,
  },
  {
    header: "Publisher",
    accessor: "publisher",
    isDisplayed: true,
  },
  {
    header: "Gender",
    accessor: "gender",
    isDisplayed: true,
  },
  {
    header: "Year",
    accessor: "year_published",
    isDisplayed: true,
  },
  {
    header: "Description",
    accessor: "description",
    isDisplayed: false,
  },
  {
    header: "Language",
    accessor: "language",
    isDisplayed: false,
  },
  {
    header: "Pages",
    accessor: "num_pages",
    isDisplayed: true,
  },
  {
    header: "Price",
    accessor: "price_before_discount",
    isDisplayed: true,
  },
  {
    header: "Discount",
    accessor: "discount_percentage",
    isDisplayed: false,
  },
  {
    header: "Stock",
    accessor: "copies_available",
    isDisplayed: true,
  },
  {
    header: "Image",
    accessor: "image_link",
    isDisplayed: true,
  },
  // {
  //   Header: 'Date',
  //   accessor: 'date',
  //   Cell: ({ value }) => format(new Date(value, 'dd/MM/yyyy'))  ------------>>>> npm install date-fns / import {format} from 'date-fns
  // },
];

export const AdminProducts: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []); // cache and ensure data is not recreated for every rerender
  const data = useMemo(() => MOCK_DATA, []);

  const itemsOnPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = (currentPage - 1) * itemsOnPage;
  const endIndex = currentPage * itemsOnPage;
  const [currentItemsArr, setCurrentItemsArr] = useState(data.slice(startIndex,endIndex));

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    setCurrentItemsArr(data.slice(startIndex,endIndex));
  }, [currentPage])

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl text-center">Products</h1>

      <div className="flex py-2">
        <input
          type="text"
          placeholder="Search book"
          className="font-semibold pl-2.5 py-0.5 border-2 rounded-md border-[#90afca] placeholder:text-neutral-400 placeholder:focus:text-neutral-400 focus:outline-none"
        />
        <button
          className="w-[70px] border-none rounded-md ml-2 mr-0.5 py-0.5 px-2.5 bg-[#90afca] text-white font-semibold hover:brightness-110 disabled:brightness-100 disabled:opacity-40"
          onClick={() => console.log('search')}
        >
          Search
        </button>
        <button
          className="w-[70px] border-none rounded-md py-0.5 px-2.5 bg-[#90afca] text-white font-semibold hover:brightness-110"
          onClick={() => console.log('reset')}
        >
          Reset
        </button>
      </div>

      <table className="w-screen">
        <thead>
          <tr>
            {columns.map((col) => {
              if (col.isDisplayed === true)
                return <th key={col.header}>{col.header}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {currentItemsArr.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => {
                if (col.isDisplayed === true)
                  return (
                    <td key={col.accessor}>
                      {
                        col.accessor === 'image_link'
                        ? <img src={item[col.accessor]} alt="Book Image" loading="lazy" width={40} height={50} className="w-[40px] h-[50px] m-auto" />
                        : item[col.accessor]
                      }
                    </td>
                  );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination
        dataLength={data.length}
        itemsOnPage={itemsOnPage}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

// TODO Maybe we can create a reusable component for search input ?