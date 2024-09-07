import React from "react";
import InventoryForm from "../../container/inputFields";
import GetInventory from "../../hooks/inventory";
import { Typography } from "@material-tailwind/react";

const CreateInventoryContent = () => {
  const { createInventory, loading, error } = GetInventory();

  const handleCreateInventory = async (formData: any) => {
    try {
      console.log("SUSI 2 " + formData)
      const result = await createInventory(formData);
      console.log("Inventory created successfully:", result);
    } catch (err) {
      console.error("Error creating inventory:", err);
    }
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Inventory
      </Typography>
      {loading && <p>Loading...</p>}

      <InventoryForm onSubmit={handleCreateInventory} isEditMode={false} />
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CreateInventoryContent;
