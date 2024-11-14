import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface InventoryGroupProps {
  initialData?: any;
  onSubmit: (inventoryGroupData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const InventoryGroupForm: React.FC<InventoryGroupProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [inventoryGroupData, setInventoryGroupData] = useState({
    inventoryGroupName: "",
    description: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setInventoryGroupData({
        inventoryGroupName: initialData.inventoryGroupName,
        description: initialData.description,
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setInventoryGroupData({
        inventoryGroupName: "",
        description: "",
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type === "number" ? +value : value;
    console.log("Inventory Group", finalValue);

    setInventoryGroupData({
      ...inventoryGroupData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inventoryGroupData);
  };

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label>
            <Typography className="mb-2" variant="h6">
              Inventory Group Name :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Inventory Group Name"
              type="text"
              name="inventoryGroupName"
              variant="outlined"
              size="md"
              value={inventoryGroupData.inventoryGroupName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Description :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Description"
              type="text"
              name="description"
              variant="outlined"
              size="md"
              placeholder="Description"
              value={inventoryGroupData.description || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Inventory Group" : "Create Inventory Group"}
        </Button>
      </form>
    </div>
  );
};

export default InventoryGroupForm;
