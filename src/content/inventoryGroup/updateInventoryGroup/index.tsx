import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../../container/alert";
import { useUpdateInventoryGroup } from "../../../hooks/inventoryGroup/updateInventoryGroup";
import InventoryGroupForm from "../../../container/inventoryGroupForm";
import { useInventoryGroupDetail } from "../../../hooks/inventoryGroup/inventoryGroupDetail";

const UpdateInventoryGroupContent = () => {
  const { updateInventoryGroup, id, loading, success, error } =
    useUpdateInventoryGroup();
  const { inventoryGroupDetail } = useInventoryGroupDetail();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateInventoryGroup = async (inventoryGroupData: any) => {
    setIsSubmitting(true);
    if (id) {
      const result = await updateInventoryGroup(id, inventoryGroupData);
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
        Update Inventory Group
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryGroupForm
        onSubmit={handleUpdateInventoryGroup}
        initialData={inventoryGroupDetail}
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

export default UpdateInventoryGroupContent;
