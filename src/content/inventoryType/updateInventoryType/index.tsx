import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useUpdateInventoryType } from "../../../hooks/inventoryType/updateInventoryType";
import InventoryTypeForm from "../../../container/inventoryTypeForm";
import TimedAlert from "../../../container/alert";

const UpdateInventoryTypeContent = () => {
  const {
    updateInventoryType,
    id,
    inventoryTypeDetail,
    loading,
    success,
    error,
  } = useUpdateInventoryType();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateInventoryType = async (inventoryTypeData: any) => {
    setIsSubmitting(true);
    if (id) {
      const result = await updateInventoryType(id, inventoryTypeData);
      setIsSubmitting(false);
      console.log(result);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
    }
  }, [id]);
  // Refresh page after success
  useEffect(() => {
    if (success) {
      window.location.reload(); // Refresh the page
    }
  }, [success]);

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Update Inventory Type
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryTypeForm
        onSubmit={handleUpdateInventoryType}
        initialData={inventoryTypeDetail}
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

export default UpdateInventoryTypeContent;
