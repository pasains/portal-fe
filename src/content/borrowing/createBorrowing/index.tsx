import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../../container/alert";
import BorrowingForm from "../../../container/borrowingForm";
import useCreateBorrowing from "../../../hooks/borrowing/createBorrowing";
import { InventoryBorrowingContent } from "../listInventoryBorrowing";
import { InventoryList } from "../../../hooks/inventory/inventoryList";

const CreateBorrowingContent = () => {
  const { createBorrowing, loading, error, success } = useCreateBorrowing();
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [combineData, setCombineData] = useState<any>({});
  const [selectedItems, setSelectedItems] = useState<InventoryList[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = { ...borrowerDetails, items: combineData?.items };
    setCombineData(data);
  }, [borrowerDetails]);

  useEffect(() => {
    const data = {
      ...combineData,
      items: selectedItems.map((item) => {
        return { inventoryId: item.id, quantity: 1 };
      }),
    };
    setCombineData(data);
  }, [selectedItems]);

  useEffect(() => {
    console.log(`Combine Data`, combineData);
  }, [combineData]);

  const handleCreateBorrowing = async () => {
    if (!Object.keys(borrowerDetails).length || selectedItems.length === 0) {
      alert("Please provide borrower details and select items.");
      return;
    }

    setIsSubmitting(true);
    const result = await createBorrowing(combineData);
    console.log(result);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Borrowing
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <div className="flex flex-cols">
        <div className="w-1/3 p-4">
          <div className="mb-8 mt-2 ml-12">
            <Typography variant="h5" color="blue-gray">
              Borrower detail
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Please fill the data.
            </Typography>
          </div>
          <BorrowingForm
            onSubmit={handleCreateBorrowing}
            isEditMode={false}
            isSubmitting={isSubmitting}
            success={success}
            setBorrowerDetail={setBorrowerDetails}
          />
        </div>
        <div className="w-2/3 p-4">
          <InventoryBorrowingContent onItemsChange={setSelectedItems} />
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
