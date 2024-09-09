import React, { useState } from "react";
import InventoryForm from "../../container/inputFields";
import { Alert, Typography } from "@material-tailwind/react";
import { useInventoryUpdate } from "../../hooks/updateInventory";
import TimedAlert from "../../container/alert";

const UpdateInventoryContent = (id: any) => {
  const { updateDataById, loading, error } = useInventoryUpdate();

  const handleUpdateInventory = async (formData: any) => {
    const result = await updateDataById(id, formData);
    console.log(result);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Edit Inventory
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <TimedAlert message={error} duration={3000} color="red" />}

      <InventoryForm
        onSubmit={handleUpdateInventory}
        initialData={true}
        isEditMode={true}
      />
    </div>
  );
};

export default UpdateInventoryContent;
