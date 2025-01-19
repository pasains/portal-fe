import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import useCreateInventoryType from "../../../hooks/inventoryType/createInventoryType";
import InventoryTypeForm from "../../../container/inventoryTypeForm";
import TimedAlert from "../../../container/alert";

const CreateInventoryTypeContent = () => {
  const { createInventoryType, success, loading, error } =
    useCreateInventoryType();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateInventoryType = async (inventoryTypeData: any) => {
    setIsSubmitting(true);
    const result = await createInventoryType(inventoryTypeData);
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
        Create New Inventory Type
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryTypeForm
        onSubmit={handleCreateInventoryType}
        isEditMode={false}
        isSubmitting={isSubmitting}
        success={success}
      />

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

export default CreateInventoryTypeContent;
