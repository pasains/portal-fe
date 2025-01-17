import React, { useRef } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Items, useItemDetail } from "../../hooks/item/itemDetail";

export function Receipt() {
  const { item, borrowingDetail } = useItemDetail();
  const tableHead = [
    { titleHead: "Inventory Name", accessor: "inventoryName" },
    { titleHead: "Reference Id", accessor: "refId" },
    { titleHead: "Inventory Group Name", accessor: "inventoryGroupName" },
    { titleHead: "Description", accessor: "description" },
    { titleHead: "Quantity", accessor: "quantity" },
    { titleHead: "Condition", accessor: "preCondition" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-fit h-screen p-5 bg-white shadow-lg">
        <Typography variant="h4" className="text-center font-bold mb-5">
          Borrowing Invoice
        </Typography>

        <div className="mb-5">
          <Typography variant="h6">
            Invoice #: {borrowingDetail.invoiceNumber}
          </Typography>
          <Typography>
            Date:{" "}
            {borrowingDetail.createdAt
              ? new Date(borrowingDetail.createdAt).toLocaleDateString()
              : "Invalid Date"}
          </Typography>
          <Typography>Borrower: {borrowingDetail.borrowerName}</Typography>
          <Typography>
            Organization Name: {borrowingDetail.organizationName}
          </Typography>
          <Typography> Address: {borrowingDetail.address}</Typography>
          <Typography>
            Identity Card : {borrowingDetail.identityCard}
          </Typography>
          <Typography>
            Identity Number : {borrowingDetail.identityNumber}
          </Typography>
          <Typography>Phone Number : {borrowingDetail.phoneNumber}</Typography>
          <Typography>
            Due Date :{" "}
            {borrowingDetail.dueDate
              ? new Date(borrowingDetail.dueDate).toLocaleDateString()
              : "Invalid Date"}
          </Typography>
        </div>
        <div className="">
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
                        {itm.inventoryGroupName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.quantity}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {itm.preCondition}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
