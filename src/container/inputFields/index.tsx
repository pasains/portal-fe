import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface InventoryFormProps {
  initialData?: any;
  onSubmit: (formData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [formData, setFormData] = useState({
    inventoryName: "",
    refId: "",
    description: "",
    inventoryTypeId: undefined,
    isBorrowable: false,
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        inventoryName: initialData.inventoryName || "",
        refId: initialData.refId || "",
        description: initialData.description || "",
        inventoryTypeId: initialData.inventoryTypeId || undefined,
        isBorrowable: initialData.isBorrowable || false,
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setFormData({
        inventoryName: "",
        refId: "",
        description: "",
        inventoryTypeId: undefined,
        isBorrowable: false,
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type == "number" ? +value : value;
    console.log("SUSI 3", finalValue);

    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label>
            <Typography className="mb-2" variant="h6">
              Inventory Name :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Inventory Name"
              type="text"
              name="inventoryName"
              variant="outlined"
              size="md"
              placeholder="Inventory Name"
              value={formData.inventoryName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Ref Id :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="RefId"
              type="string"
              name="refId"
              variant="outlined"
              size="md"
              placeholder="Ref Id"
              value={formData.refId || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            <Typography className="mb-2" variant="h6">
              Description:
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Description"
              type="text"
              name="description"
              variant="outlined"
              size="lg"
              placeholder="Description"
              value={formData.description || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Inventory Type Id:
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Inventory Type Id"
              type="number"
              name="inventoryTypeId"
              variant="outlined"
              placeholder="Inventory Type Id"
              value={formData.inventoryTypeId || undefined}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label className="flex">
            <Typography className="mr-2" variant="h6">
              Is Borrowable?:
            </Typography>
            <input
              type="checkbox"
              placeholder="is Borrowable?"
              checked={formData.isBorrowable || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isBorrowable: e.target.checked,
                })
              }
            />
          </label>
          <br />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Inventory" : "Create Inventory"}
        </Button>
      </form>
    </div>
  );
};

export default InventoryForm;
