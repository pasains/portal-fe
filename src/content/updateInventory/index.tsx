import React, { useState } from "react";
import InventoryForm from "../../container/inputFields";
import { Typography } from "@material-tailwind/react";
import { useInventoryUpdate } from "../../hooks/updateInventory";
import TimedAlert from "../../container/alert";

const UpdateInventoryContent = (id: any) => {
  const { updateInventory, inventoryUpdate, loading, success, error } =
    useInventoryUpdate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateInventory = async (formData: any) => {
    setIsSubmitting(true);
    const data = await updateInventory(id, formData);
    console.log(data);
    console.log("SUSI ", formData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Edit Inventory
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryForm
        onSubmit={handleUpdateInventory}
        initialData={inventoryUpdate}
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

export default UpdateInventoryContent;
