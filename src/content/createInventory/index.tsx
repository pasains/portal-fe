import React, { useState } from "react";
import InventoryForm from "../../container/inputFields";
import { Typography } from "@material-tailwind/react";
import useInventory from "../../hooks/inventory";
import TimedAlert from "../../container/alert";

const CreateInventoryContent = () => {
  const { createInventory, success, loading, error } = useInventory();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateInventory = async (formData: any) => {
    setIsSubmitting(true);
    const result = await createInventory(formData);
    console.log(result);
    console.log("SUSI ", formData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Inventory
      </Typography>
      {loading && <p>Loading...</p>}
      <div className="fixed z-9999 top-4 right-4">
        {success && (
          <TimedAlert message={success} duration={5000} color="green" />
        )}
      </div>
      <div className="fixed z-9999 top-4 right-4">
        {error && <TimedAlert message={error} duration={5000} color="red" />}
      </div>
      <InventoryForm
        onSubmit={handleCreateInventory}
        isEditMode={false}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default CreateInventoryContent;
