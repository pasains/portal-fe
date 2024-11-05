import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Textarea } from "@material-tailwind/react";

interface InventoryTypeFormProps {
  initialData?: any;
  onSubmit: (inventoryTypeData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const InventoryTypeForm: React.FC<InventoryTypeFormProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [inventoryTypeData, setInventoryTypeData] = useState({
    inventoryTypeName: "",
    description: "",
    gorupId: undefined,
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setInventoryTypeData({
        inventoryTypeName: initialData.inventoryTypeName || "",
        description: initialData.description || "",
        gorupId: initialData.gorupId || undefined,
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setInventoryTypeData({
        inventoryTypeName: "",
        description: "",
        gorupId: undefined,
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type === "number" ? +value : value;
    console.log("SUSI 3", finalValue);

    setInventoryTypeData({
      ...inventoryTypeData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inventoryTypeData);
  };

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label>
            <Typography className="mb-2" variant="h6">
              Inventory Type Name :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Inventory Type Name"
              type="text"
              name="inventoryTypeName"
              variant="outlined"
              size="md"
              placeholder="Inventory Type Name"
              value={inventoryTypeData.inventoryTypeName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Description:
            </Typography>
            <Textarea
              className="w-full"
              color="orange"
              label="Description"
              variant="outlined"
              name="description"
              value={inventoryTypeData.description || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Inventory Type" : "Create Inventory Type"}
        </Button>
      </form>
    </div>
  );
};

export default InventoryTypeForm;
