import React from "react";
import TimedAlert from "../../../container/alert";
import { BorrowingDetail } from "../getBorrowing";
import { useItemDetail } from "../../../hooks/item/itemDetail";
import BorrowedInventoryList from "../../../content/borrowing/borrowedInventoryList";
import { Typography } from "@material-tailwind/react";

const UpdateBorrowingContent = () => {
  const { error } = useItemDetail();

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Update Borrowing
      </Typography>

      <div className="flex lg:flex-row flex-col-reverse w-full px-4">
        <div className="w-full lg:w-1/3 p-4">
          <BorrowingDetail />
        </div>
        <div className="w-full lg:w-2/3 p-4">
          <BorrowedInventoryList />
        </div>
      </div>

      <div className="fixed z-9999 top-4 right-4">
        {error && <TimedAlert message={error} duration={5000} color="red" />}
      </div>
    </div>
  );
};

export default UpdateBorrowingContent;
