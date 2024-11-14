import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../../container/alert";
import BorrowingForm from "../../../container/borrowingForm";
import useCreateBorrowing from "../../../hooks/borrowing/createBorrowing";
import { InventoryBorrowingContent } from "../listInventoryBorrowing";

const CreateBorrowingContent = () => {
  const { createBorrowing, loading, error, success } = useCreateBorrowing();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelCreateBorrowing = async (borrowingData: any) => {
    setIsSubmitting(true);
    const result = await createBorrowing(borrowingData);
    console.log(result);
    console.log("BORROWING_ ", borrowingData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Borrowing
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <div className="flex flex-cols">
        <div className="w-1/3 pt-4">
          <div className="text-left ml-16 mb-8">
            <Typography variant="h5" color="blue-gray">
              Borrower detail
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Please fill the data.
            </Typography>
          </div>
          <BorrowingForm
            onSubmit={handelCreateBorrowing}
            isEditMode={false}
            isSubmitting={isSubmitting}
            success={success}
          />
        </div>
        <div className="w-2/3 p-4">
          <InventoryBorrowingContent />
        </div>
      </div>

      <div className="fixed z-9999 top-4 right-4">
        {success && (
          <TimedAlert message={success} duration={5000} color="green" />
        )}
      </div>
      <div className="fixed z-9999 top-4 right-4">
        {error && <TimedAlert message={error} duration={5000} color="red" />}
      </div>
    </div>
  );
};

export default CreateBorrowingContent;
