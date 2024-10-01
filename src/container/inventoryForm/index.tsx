import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import useInventoryType from "../../hooks/inventoryType";

interface InventoryFormProps {
  initialData?: any;
  onSubmit: (inventoryData: any) => void;
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
  const { inventoryType, setInventoryType } = useInventoryType();
  const [createNewInventoryType, setCreateNewInventoryType] = useState(false);
  const [newInventoryTypeName, setInventoryTypeName] = useState("");
  const [inventoryData, setInventoryData] = useState({
    inventoryName: "",
    refId: "",
    description: "",
    isBorrowable: false,
    inventoryTypeName: "",
    descriptionInventoryType: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setInventoryData({
        inventoryName: initialData.inventoryName || "",
        refId: initialData.refId || "",
        description: initialData.description || "",
        isBorrowable: initialData.isBorrowable || false,
        inventoryTypeName: initialData.inventoryTypeName || "",
        descriptionInventoryType: initialData.descriptionInventoryType || "",
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setInventoryData({
        inventoryName: "",
        refId: "",
        description: "",
        inventoryTypeName: "",
        descriptionInventoryType: "",
        isBorrowable: false,
      });
    }
  }, [success]);

  const handleInputChange = (e: any): void => {
    console.log(`ERROR_`, JSON.stringify(e));
    if (!e.target || !("name" in e.target)) {
      console.error("Event target does not have a 'name' property.");
      return;
    }
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;

    let finalValue = type == "number" ? +value : value;
    console.log("INVENTORY 3", finalValue);

    setInventoryData({
      ...inventoryData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(inventoryData);

    if (newInventoryTypeName.trim() === "") {
      alert("Inventory type cannot be empty.");
      return;
    }

    setInventoryType([]);

    setInventoryTypeName("");
    setCreateNewInventoryType(false);
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
              value={inventoryData.inventoryName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Reference Id :
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Reference Id"
              type="string"
              name="refId"
              variant="outlined"
              size="md"
              placeholder="Ref Id"
              value={inventoryData.refId || ""}
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
              value={inventoryData.description || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label htmlFor="inventoryTypeName">
            <Typography className="mb-2" variant="h6">
              Inventory Type:
            </Typography>
            <Select
              id="inventoryTypeName"
              className="w-full"
              color="orange"
              variant="outlined"
              size="lg"
              label="Inventory Type Name"
              placeholder="Inventory Type Name"
              value={inventoryData.inventoryTypeName}
              onChange={handleInputChange}
            >
              <Option>Select Inventory Type</Option>
              {inventoryType.map((type) => (
                <Option key={type.id} value={type.inventoryTypeName}>
                  {type.inventoryTypeName}
                </Option>
              ))}
              <Option
                value="create-new"
                onClick={() => setCreateNewInventoryType(true)}
              >
                Create New Inventory Type
              </Option>
            </Select>

            {createNewInventoryType && (
              <form onSubmit={handleSubmit}>
                <Typography className="pt-5 pb-2" variant="h6" color="orange">
                  Create Inventory Type Name:
                </Typography>
                <div className="space-y-3">
                  <Input
                    className="w-full"
                    color="orange"
                    label="Inventory Type Name"
                    type="text"
                    name="inventoryTypeName"
                    variant="outlined"
                    placeholder="Inventory Type Name"
                    value={inventoryData.inventoryTypeName || ""}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    className="w-full"
                    color="orange"
                    label="Description"
                    type="text"
                    name="descriptionInventoryType"
                    variant="outlined"
                    placeholder="Description"
                    value={inventoryData.descriptionInventoryType || ""}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="space-x-2">
                    <Button size="sm" color="orange" type="submit">
                      Add
                    </Button>
                    <Button
                      size="sm"
                      color="red"
                      type="button"
                      onClick={() => setCreateNewInventoryType(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </label>
          <br />

          <label className="flex">
            <Typography className="mr-2" variant="h6">
              Is Borrowable?:
            </Typography>
            <input
              type="checkbox"
              placeholder="is Borrowable?"
              checked={inventoryData.isBorrowable || false}
              onChange={(e) =>
                setInventoryData({
                  ...inventoryData,
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
