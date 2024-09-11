import React, { useEffect, useState } from "react";
import InventoryForm from "../../container/inputFields";
import { Alert, Typography } from "@material-tailwind/react";
import { useInventoryUpdate } from "../../hooks/updateInventory";
import TimedAlert from "../../container/alert";
import { useInventoryDetail } from "../../hooks/inventoryDetail";

type Params = {
  id: string;
};

const UpdateInventoryContent = () => {
  const { updateDataById, loading, error } = useInventoryUpdate();
  const { id, inventoryDetail } = useInventoryDetail();

  const handleUpdateInventory = async (formData: any) => {
    if (id) {
      const result = await updateDataById(id, formData);
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
        Edit Inventory
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <TimedAlert message={error} duration={3000} color="red" />}

      <InventoryForm
        onSubmit={handleUpdateInventory}
        initialData={inventoryDetail}
        isEditMode={true}
      />
    </div>
  );
};

export default UpdateInventoryContent;
