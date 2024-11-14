import useInventory, {
  InventoryList,
} from "../../../hooks/inventory/inventoryList";
import { useNavigate } from "react-router-dom";
import {
  CardHeader,
  Checkbox,
  Chip,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Pagination } from "../../../container/pagination";
import { Card } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export function InventoryBorrowingContent() {
  const { inventory, handleCheck } = useInventory();
  const navigate = useNavigate();
  const tableHead = [
    { titleHead: "Reference Id", accessor: "refId" },
    { titleHead: "Inventory Name", accessor: "inventoryName" },
    { titleHead: "Inventory Type Name", accessor: "inventoryTypeName" },
    { titleHead: "is Borrowable?", accessor: "isBorrowable" },
    { titleHead: "Description", accessor: "description" },
    { titleHead: "" },
  ];

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
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
              {inventory.map((item: InventoryList, index) => {
                const isLast = index === inventory.length - 1;
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
                      <div className="mx-auto text-center">
                        <Checkbox
                          color="gray"
                          onClick={(e) => {
                            handleCheck(item.id);
                            e.stopPropagation();
                          }}
                        ></Checkbox>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Pagination />
      </CardHeader>
    </Card>
  );
}
