import React from "react";
import InventoryForm from "../../container/inputFields";
import { Typography } from "@material-tailwind/react";
import { GetInventoryDetail } from "../../hooks/inventoryDetail";

const UpdateInventoryContent = () => {
  const { updateData, loading, error } = GetInventoryDetail();

  const handleUpdateInventory = async (id:string, formData: any) => {
    try {
      const result = await updateData(id, formData);
      console.log("Inventory updated successfully:", result);
    } catch (err) {
      console.error("Error updating inventory:", err);
    }
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">Edit Inventory</Typography>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

    </div>
  );
};

export default UpdateInventoryContent;
