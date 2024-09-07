import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface InventoryFormProps {
  initialData?: any;
  onSubmit: (formData: any) => void;
  isEditMode?: boolean;
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
}) => {
  const [formData, setFormData] = useState({
    inventoryName: "",
    description: "",
    inventoryTypeId: "",
    isBorrowable: false,
    image: "",
    quantity: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData(initialData);
    }
  }, [initialData, isEditMode]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
              name="inventory name"
              variant="outlined"
              size="md"
              value={formData.inventoryName}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Quantity :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Quantity"
              type="number"
              name="quantity"
              variant="outlined"
              size="md"
              value={formData.quantity}
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
              value={formData.description}
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
              name="description"
              variant="outlined"
              value={formData.inventoryTypeId}
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
              checked={formData.isBorrowable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isBorrowable: e.target.checked,
                })
              }
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Image URL:
            </Typography>
            <Input
              type="url"
              name="image"
              label="Image URL"
              value={formData.image}
              onChange={handleInputChange}
            />
          </label>
          <br />
        </section>

        <Button type="submit">
          {isEditMode ? "Update Inventory" : "Create Inventory"}
        </Button>
      </form>
    </div>
  );
};

export default InventoryForm;
