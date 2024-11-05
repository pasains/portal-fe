import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useUpdateBorrower } from "../../../hooks/borrower/updateBorrower";
import InventoryTypeForm from "../../../container/inventoryTypeForm";
import TimedAlert from "../../../container/alert";

const UpdateBorrower = () => {
  const { updateBorrower, id, borrowerDetail, loading, success, error } =
    useUpdateBorrower();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateBorrower = async (borrowerData: any) => {
    setIsSubmitting(true);
    if (id) {
      const result = await updateBorrower(id, borrowerData);
      setIsSubmitting(false);
      console.log(result);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
    }
  }, [id]);

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Update Borrower
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryTypeForm
        onSubmit={handleUpdateBorrower}
        initialData={borrowerDetail}
        isEditMode={true}
        isSubmitting={isSubmitting}
        success={success}
      />

      <div className="fixed z-9999 top-10 right-10">
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

export default UpdateBorrower;
