import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useUpdateInventory } from "../../../hooks/inventory/updateInventory";
import { useInventoryDetail } from "../../../hooks/inventory/inventoryDetail";
import InventoryForm from "../../../container/inventoryForm";
import TimedAlert from "../../../container/alert";

const UpdateInventoryContent = () => {
  const { updateInventory, loading, success, error } = useUpdateInventory();
  const { id, inventoryDetail } = useInventoryDetail();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateInventory = async (inventoryData: any) => {
    setIsSubmitting(true);
    if (id) {
      const result = await updateInventory(id, inventoryData);
      setIsSubmitting(false);
      console.log(result);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
    }
  }, [id]);
  useEffect(() => {
    if (inventoryDetail) {
      console.log("inventory detail", inventoryDetail);
    }
  }, [inventoryDetail]);

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Update Inventory
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryForm
        onSubmit={handleUpdateInventory}
        initialData={inventoryDetail}
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
