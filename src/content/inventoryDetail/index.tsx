import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useInventoryDetail } from "../../hooks/inventoryDetail";

export function InventoryDetailContent() {
  const { inventoryDetail } = useInventoryDetail();
  const createdAtDate = new Date(inventoryDetail.createdAt);
  useEffect(() => {
    console.log(`SUSI: + ${inventoryDetail.description}`);
  }, [inventoryDetail]);
  return (
    <section className="py-16 px-8 place-items-center mx-auto w-full">
      <div
        key={inventoryDetail.id}
        className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2"
      >
        <img
          src={inventoryDetail.image}
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
            Qty: {inventoryDetail.quantity}
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
          <div className="mb-4 flex w-full items-center gap-3 md:w-1/2 ">
            <Button color="gray" className="w-52">
              Borrow
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="w-full flex justify-between items-center mb-3 mt-1">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Inventory History
            </h3>
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
                <th className="p-4 ">
                  <p>Borrowing Id</p>
                </th>
                <th className="p-4">
                  <p>Borrower Name</p>
                </th>
                <th className="p-4">
                  <p>Organization Name</p>
                </th>
                <th className="p-4">
                  <p>Condition</p>
                </th>
                <th className="p-4">
                  <p>Time Stamp</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-4 py-5">
                  <p className="block font-semibold text-sm text-slate-800">
                    Borrowing Id
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">Borrower Name</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">Organization Name</p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">
                    {inventoryDetail.condition}
                  </p>
                </td>
                <td className="p-4 py-5">
                  <p className="text-sm text-slate-500">
                    {createdAtDate.toLocaleDateString()}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between items-center px-4 py-3">
            <div className="text-sm text-slate-500">
              Showing <b>1-10</b>
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Prev
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                1
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                2
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                3
              </button>
              <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
