import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../container/alert";
import InventoryForm from "../../container/inventoryForm";
import useCreateInventory from "../../hooks/createInventory";

const CreateInventoryContent = () => {
  const { createInventory, loading, error, success } = useCreateInventory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateInventory = async (inventoryData: any) => {
    setIsSubmitting(true);
    const result = await createInventory(inventoryData);
    console.log(result);
    console.log("SUSI ", inventoryData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Inventory
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryForm
        onSubmit={handleCreateInventory}
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

export default CreateInventoryContent;
