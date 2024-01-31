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
const SORTING = [
  {
    opt: 'a-z',
    name: 'Alphabetical A-Z',
  },
  {
    opt: 'z-a',
    name: 'Alphabetical Z-A',
  },
  {
    opt: 'price-asc',
    name: 'Price Ascending',
  },
  {
    opt: 'price-desc',
    name: 'Price Descending',
  }
];

export const AdminProducts: React.FC = () => {
  const columns = useMemo(() => COLUMNS, []); // cache and ensure data is not recreated for every rerender
  const data = useMemo(() => MOCK_DATA, []);

  const itemsOnPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const startIndex = (currentPage - 1) * itemsOnPage;
  const endIndex = currentPage * itemsOnPage;
  const [initialArr, setInitialArr] = useState(data);

  const [currentItemsArr, setCurrentItemsArr] = useState(initialArr.slice(startIndex,endIndex));

  // search input
  const [searchVal, setSearchVal] = useState<string>("");
  const handleSearch = () => {
    setInitialArr(data.filter(product => product.title.toLowerCase().includes(searchVal)));
    setSelectedOption("default");
  }

  const handleResetSearch = () => {
    setSearchVal("");
    setInitialArr(data);
    setSelectedOption("default");
  }

  // select dropdown
  const [selectedOption, setSelectedOption] = useState<string>("default");
  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    switch(e.target.value) {
      case "a-z": {
        const sortedData = [...initialArr];
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        setInitialArr(sortedData);
        setSelectedOption("a-z");
      }
      break;

      case "z-a": {
        const sortedData = [...initialArr];
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
        setInitialArr(sortedData);
        setSelectedOption("z-a");
      }
      break;

      case "price-asc": {
        const sortedData = [...initialArr];
        sortedData.sort((a, b) => a.price_before_discount - b.price_before_discount);
        setInitialArr(sortedData);
        setSelectedOption("price-asc");
      }
      break;

      case "price-desc": {
        const sortedData = [...initialArr];
        sortedData.sort((a, b) => b.price_before_discount - a.price_before_discount);
        setInitialArr(sortedData);
        setSelectedOption("price-desc");
      }
      break;
      default: {
        setSelectedOption("default");
        setInitialArr(data);
      }
    }
  }

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  useEffect(() => {
    setCurrentItemsArr(initialArr.slice(startIndex,endIndex));
  }, [currentPage, initialArr])

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl text-center">Products</h1>

      <div className="flex flex-col py-2">
        <div className="flex py-2">
          <input
            type="text"
            placeholder="Search book"
            value={searchVal}
            className="font-semibold pl-2.5 py-0.5 border-2 rounded-md border-[#90afca] placeholder:text-neutral-400 placeholder:focus:text-neutral-400 focus:outline-none"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button
            disabled={searchVal === ""}
            className="w-[70px] border-none rounded-md ml-2 mr-0.5 py-0.5 px-2.5 bg-[#90afca] text-white font-semibold hover:brightness-110 disabled:brightness-100 disabled:opacity-40"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            disabled={searchVal === ""}
            className="w-[70px] border-none rounded-md ml-2 mr-0.5 py-0.5 px-2.5 bg-[#90afca] text-white font-semibold hover:brightness-110 disabled:brightness-100 disabled:opacity-40"
            onClick={handleResetSearch}
          >
            Reset
          </button>
        </div>
        <div className="py-2 flex items-center">
          <p className="text-lg font-semibold">Ordoneaza:</p>
          <select value={selectedOption} onChange={handleSorting} className="py-1 ml-2 font-semibold pl-2.5  border-2 rounded-md focus:rounded-b-none border-[#90afca] placeholder:text-neutral-400 placeholder:focus:text-neutral-400 focus:outline-none">
            <option value="default">Select an option</option>
            {SORTING.map((opt) => (
              <option key={opt.opt} value={opt.opt}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
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
        dataLength={initialArr.length}
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