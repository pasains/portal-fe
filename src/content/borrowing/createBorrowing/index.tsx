import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../../container/alert";
import BorrowingForm from "../../../container/borrowingForm";
import useCreateBorrowing from "../../../hooks/borrowing/createBorrowing";
import { InventoryList } from "../../../hooks/inventory/inventoryList";
import { BorrowableInventoryList } from "../../../content/borrowing/borrowabelInventoryList";

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
        return { inventoryId: item.id, quantity: item.quantity };
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

  // Refresh page after success
  useEffect(() => {
    if (success) {
      window.location.reload(); // Refresh the page
    }
  }, [success]);
  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Borrowing
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <div className="flex md:flex-row flex-col-reverse w-full px-4">
        <section className="md:w-1/3 w-full p-4">
          <BorrowingForm
            onSubmit={handleCreateBorrowing}
            isEditMode={false}
            isSubmitting={isSubmitting}
            success={success}
            setBorrowerDetail={setBorrowerDetails}
          />
        </section>
        <section className="md:w-2/3 w-full p-4">
          <BorrowableInventoryList onItemsChange={setSelectedItems} />
        </section>
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
