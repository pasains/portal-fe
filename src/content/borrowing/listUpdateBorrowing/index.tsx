import React, { useEffect, useRef } from "react";
import {
  Input,
  Card,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { Pagination } from "../../../container/pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Items,
  StatusItem,
  useItemDetail,
} from "../../../hooks/item/itemDetail";
import { useUpdateItem } from "../../../hooks/item/updateItem";

const ItemBorrowing: React.FC = ({}) => {
  const {
    id,
    item,
    setItem,
    borrowingDetail,
    refreshData,
    page,
    totalPage,
    setPage,
  } = useItemDetail();
  const { updateItem, setItemsUpdate, loading } = useUpdateItem();
  const tableHead = [
    { titleHead: "Inventory Name", accessor: "inventoryName" },
    { titleHead: "Reference Id", accessor: "refId" },
    { titleHead: "Inventory Type Name", accessor: "inventoryTypeName" },
    { titleHead: "Quantity", accessor: "quantity" },
    { titleHead: "Condition", accessor: "preCondition" },
    { titleHead: "Post Condition", accessor: "postCondition" },
    { titleHead: "Status", accessor: "status" },
  ];

  useEffect(() => {
    setItemsUpdate(item);
  }, [item]);

  const handlePageChange = (newPage: number) => {
    console.log("Page changed to:", newPage);
    setPage(newPage);
  };

  const debounceRef = useRef<Record<number, NodeJS.Timeout>>({});
  const handlePostConditionInput = (id: number, value: string) => {
    setItem((prev) => {
      if (debounceRef.current[id]) {
        clearTimeout(debounceRef.current[id]);
      }
      const updatedItems = prev.map((itm) =>
        itm.id === id ? { ...itm, postCondition: value || "" } : itm,
      );
      debounceRef.current[id] = setTimeout(() => {
        console.log("Updated Post Condition item (debounced):", updatedItems);
      }, 500);
      return updatedItems;
    });
  };

  const handleStatusChange = (id: number, value: string) => {
    setItem((prev) => {
      const updatedItems = prev.map((itm) =>
        itm.id === id ? { ...itm, status: value as StatusItem } : itm,
      );
      console.log("Updated Status Item:", updatedItems);
      return updatedItems;
    });
  };

  const handleSave = async () => {
    try {
      await updateItem(id);
      console.log("Data saved successfully!");
      await refreshData();
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  };

  if (!borrowingDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full w-full">
      <div className="rounded-none flex h-full flex-col gap-4 p-6">
        <div className="flex mb-3 justify-between gap-8">
          <div className="flex flex-col gap-2">
            <div>
              <Typography variant="h5" color="blue-gray">
                List of borrowing item
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Please update the borrowing item status and input the post
                conditions.
              </Typography>
            </div>
            <div>
              <Typography className="mb-2" variant="h6">
                Status Borrowing
              </Typography>
              <Chip
                size="sm"
                variant="ghost"
                value={
                  borrowingDetail?.status === "PENDING" ? "PENDING" : "DONE"
                }
                color={borrowingDetail?.status === "PENDING" ? "red" : "green"}
                className="w-fit"
              />
            </div>
          </div>
          <div className="w-full md:w-72 mt-8">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
        <div className="overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {tableHead.map((head) => (
                  <th
                    key={head.accessor}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 py-5 px-4"
                  >
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="font-semibold leading-none opacity-70"
                    >
                      {head.titleHead}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.map((itm: Items, index) => {
                const isLast = index === item.length - 1;
                const classes = isLast
                  ? "py-3 px-4"
                  : "py-3 px-4 border-b border-blue-gray-50";

                return (
                  <tr key={itm.id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.inventoryName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.refId}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.inventoryTypeName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.preCondition}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Input
                        type="text"
                        label="Post Condition"
                        value={itm.postCondition}
                        onChange={(e) =>
                          handlePostConditionInput(itm.id, e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    </td>
                    <td className={classes}>
                      <select
                        value={itm.status}
                        onChange={(e: any) =>
                          handleStatusChange(itm.id, e.target.value)
                        }
                        className="border p-1 rounded w-fit"
                      >
                        <option value={StatusItem.IN}>IN</option>
                        <option value={StatusItem.OUT}>OUT</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={handlePageChange}
            />
          </table>
        </div>
        <div className="items-end mr-10 mx-auto">
          <Button
            className="text-sm"
            variant="filled"
            size="sm"
            color="blue"
            type="submit"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ItemBorrowing;
