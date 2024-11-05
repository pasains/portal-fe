import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import useCreateInventoryGroup from "../../../hooks/inventoryGroup/createInventoryGroup";
import InventoryGroupForm from "../../../container/inventoryGorupForm";
import TimedAlert from "../../../container/alert";

const CreateInventoryGroupContent = () => {
  const { createInventoryGroup, loading, error, success } =
    useCreateInventoryGroup();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelCreateInventoryGroup = async (inventoryGroupForm: any) => {
    setIsSubmitting(true);
    const result = await createInventoryGroup(inventoryGroupForm);
    console.log(result);
    console.log("INVENTORY GROUP ", inventoryGroupForm);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Inventory Group
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryGroupForm
        onSubmit={handelCreateInventoryGroup}
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

export default CreateInventoryGroupContent;
