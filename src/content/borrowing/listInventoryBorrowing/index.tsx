import { useNavigate } from "react-router-dom";
import { Checkbox, Chip, Input, Typography } from "@material-tailwind/react";
import { Pagination } from "../../../container/pagination";
import { Card } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import useBorrowableInventory from "../../../hooks/inventory/borrowableInventory";
import { InventoryList } from "../../../hooks/inventory/inventoryList";

interface InventoryBorrowingContentProps {
  onItemsChange: (selectedItems: InventoryList[]) => void;
  success?: any;
}

export function InventoryBorrowingContent({
  onItemsChange,
  success,
}: InventoryBorrowingContentProps) {
  const {
    handleSearch,
    borrowableInventory,
    pageBorrowableInventory,
    totalPageBorrowableInventory,
    setBorrowableInventory,
    setPageBorrowableInventory,
  } = useBorrowableInventory();
  const [selectedItems, setSelectedItems] = useState<InventoryList[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const tableHead = [
    { titleHead: "Reference Id", accessor: "refId" },
    { titleHead: "Inventory Name", accessor: "inventoryName" },
    { titleHead: "Inventory Type Name", accessor: "inventoryTypeName" },
    { titleHead: "is Borrowable?", accessor: "isBorrowable" },
    { titleHead: "Description", accessor: "description" },
    { titleHead: "Stock", accessor: "currentQuantity" },
    { titleHead: "Quantity", accessor: "quantity" },
    { titleHead: "" },
  ];
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const result = await handleSearch(e.target.value);
    console.log(result);
  };

  const toggleItemSelection = (item: InventoryList) => {
    setSelectedItems((prev) => {
      const isSelected = prev.find((selected) => selected.id === item.id);
      if (isSelected) {
        return prev.filter((selected) => selected.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleQuantityInput = (id: number, quantity: number) => {
    setBorrowableInventory((prev) =>
      prev.map(
        (itm) => (itm.id === id ? { ...itm, quantity } : itm), // Update the quantity for the selected item
      ),
    );
  };

  useEffect(() => {
    if (success) {
      setSelectedItems([]);
    }
  }, [success]);

  useEffect(() => {
    onItemsChange(selectedItems);
    console.log(`Selected Items`, selectedItems);
  }, [selectedItems, onItemsChange]);

  return (
    <Card className="h-full w-full">
      <div className="rounded-none flex h-full flex-col gap-4 p-6">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Inventory List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Please choose the item you want to borrow.
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
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
              {borrowableInventory.map((item: InventoryList, index) => {
                const isSelected = selectedItems.some(
                  (selected) => selected.id === item.id,
                );
                console.log(`ITEM_ID`, item.id);
                const isLast = index === borrowableInventory.length - 1;
                const classes = isLast
                  ? "py-3 px-4"
                  : "py-3 px-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={item.id}
                    onClick={() => {
                      navigate(`/inventory/${item.id}`);
                    }}
                    className="cursor-pointer hover:bg-blue-gray-50"
                  >
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.refId}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.inventoryName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.inventoryTypeName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={item.isBorrowable ? "Yes" : "No"}
                        color={item.isBorrowable ? "green" : "red"}
                        className="w-fit items-center mx-auto"
                      />
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.description}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-center mx-auto"
                      >
                        {item.currentQuantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Input
                        type="number"
                        label="Quantity"
                        value={item.quantity || ""}
                        onChange={(e) => {
                          const inputQuantity =
                            parseInt(e.target.value, 10) || 0;
                          if (inputQuantity <= item.currentQuantity) {
                            handleQuantityInput(item.id, inputQuantity);
                          } else {
                            console.warn(
                              `Quantity exceeds stock! Maximum available: ${item.currentQuantity}`,
                            );
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row navigation
                          toggleItemSelection(item);
                        }}
                        className="border p-1 rounded"
                        min={0}
                        max={item.currentQuantity} // Restrict input to available stock
                      />
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <div className="mx-auto text-center">
                        <Checkbox
                          color="gray"
                          checked={isSelected}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row navigation
                            toggleItemSelection(item);
                          }}
                        ></Checkbox>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={pageBorrowableInventory}
            totalPages={totalPageBorrowableInventory}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Card>
  );
}
