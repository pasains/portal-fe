import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useInventoryDetail } from "../../../hooks/inventory/inventoryDetail";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Pagination } from "../../../container/pagination";
import useInventoryBorrowingHistoryList, {
  InventoryBorrowingHistoryProps,
} from "../../../hooks/inventory/inventoryBorrowingHistoryList";

export function InventoryDetailContent() {
  const { inventoryDetail } = useInventoryDetail();
  const { page, inventory, totalPage, setPage } =
    useInventoryBorrowingHistoryList();
  const navigate = useNavigate();
  const tableHead = [
    { titleHead: "Invoice Number", accessor: "invoiceNumber" },
    { titleHead: "Borrower Name", accessor: "borrowerName" },
    { titleHead: "Organization Name", accessor: "organizationName" },
    { titleHead: "Address", accessor: "address" },
    { titleHead: "Status Borrowing", accessor: "status" },
    { titleHead: "Time Stamp", accessor: "createdAt" },
  ];
  const handlePageChange = (newPage: number) => {
    console.log("Page changed to:", newPage);
    setPage(newPage);
  };
  return (
    <section className="py-16 px-8 place-items-center mx-auto w-full">
      <div
        key={inventoryDetail.id}
        className="mx-auto container place-items-center grid grid-cols-1 md:grid-cols-2"
      >
        <img
          src={inventoryDetail.url}
          alt={inventoryDetail.inventoryName}
          className="h-[36rem]"
        />
        <div>
          <Typography className="text-black" variant="h3">
            {inventoryDetail.inventoryName}
          </Typography>
          <Typography className="mb-4 text-sm">
            {inventoryDetail.inventoryTypeName}
          </Typography>
          <Typography className="text-sm">
            Stock: {inventoryDetail.currentQuantity}
          </Typography>
          <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
            {inventoryDetail.description}
          </Typography>
          <div className="my-8">
            <div className="font-bold text-md">Condition:</div>
            <p className="text-slate-500 text-sm">
              {inventoryDetail.condition}
            </p>
          </div>
          <div className="mb-10">
            <div className="font-bold text-md mb-2">Is Borrowable?</div>
            <Button
              size="sm"
              className={`font-bold ${
                inventoryDetail.isBorrowable
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {inventoryDetail.isBorrowable ? "TRUE" : "FALSE"}
            </Button>
          </div>
          <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
            <Button
              color="gray"
              className="w-fit"
              onClick={() => {
                navigate(`/borrowing/create`);
              }}
            >
              Create Borrowing
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-20 w-3/4">
        <div className="flex justify-between items-center mb-3 mt-1">
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Tracking Borrowing History for Inventory
            </h1>
            <p></p>
          </div>
          <div className="ml-3">
            <div className="w-full max-w-sm min-w-[200px] relative">
              <div className="relative">
                <input
                  className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                  placeholder="Search"
                />
                <button
                  className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    className="w-8 h-8 text-slate-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr className="bg-gray-400 text-black border-b border-slate-200 text-sm font-normal rounded-lg leading-none">
                {tableHead.map((head) => (
                  <th key={head.accessor} className="p-4 ">
                    <p>{head.titleHead}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventory.map((item: InventoryBorrowingHistoryProps, index) => {
                const isLast = index === inventory.length - 1;
                const classes = isLast
                  ? "py-3 px-4"
                  : "py-3 px-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      navigate(`/borrowing/${item.id}`);
                    }}
                    className="cursor-pointer hover:bg-slate-50 border-b border-slate-200"
                  >
                    <td className={classes}>
                      <p className="block font-semibold text-sm text-slate-800">
                        {item.invoiceNumber}
                      </p>
                    </td>
                    <td className={classes}>
                      <p className="text-sm text-slate-500">
                        {item.borrowerName}
                      </p>
                    </td>
                    <td className={classes}>
                      <p className="text-sm text-slate-500">
                        {item.organizationName}
                      </p>
                    </td>
                    <td className={classes}>
                      <p className="text-sm text-slate-500">{item.address}</p>
                    </td>
                    <td className={classes}>
                      <p className="text-sm text-slate-500">{item.status}</p>
                    </td>
                    <td className={classes}>
                      <p className="text-sm text-slate-500">
                        {format(
                          new Date(item.createdAt),
                          "dd MMMM yyyy, hh:mm:ss",
                        )}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between items-center px-4 py-3">
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
