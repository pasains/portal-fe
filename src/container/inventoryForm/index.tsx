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
  const [inventoryTypeList, setInventoryTypeList] = useState<
    {
      id: number;
      inventoryTypeName: string;
      description: string;
      displayName: string;
      showCreateNew: boolean;
    }[]
  >();
  const [createNewInventoryType, setCreateNewInventoryType] = useState(false);
  const [newInventoryTypeName, setInventoryTypeName] = useState("");
  const [newDescription, setDescription] = useState("");
  const [inventoryData, setInventoryData] = useState({
    inventoryName: "",
    refId: "",
    description: "",
    isBorrowable: false,
    inventoryTypeName: "",
    inventoryTypeId: undefined,
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
        inventoryTypeId: initialData.inventoryTypeId || undefined,
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
        isBorrowable: false,
        inventoryTypeName: "",
        inventoryTypeId: undefined,
        descriptionInventoryType: "",
      });
    }
  }, [success]);

  useEffect(() => {
    console.log(`DATA_`, inventoryData);
  }, [inventoryData]);

  const handleInputChange = (e: any): void => {
    const {
      name,
      value,
      type = "text",
    } = e.target as HTMLInputElement | HTMLSelectElement;

    let finalValue = type === "number" ? +value : value;
    console.log("INVENTORY 3", finalValue);

    if (name === "inventoryTypeName") {
      const data = inventoryType.find((element) => element.id == finalValue);
      setInventoryData({
        ...inventoryData,
        inventoryTypeId: data?.id as any,
        inventoryTypeName: data?.inventoryTypeName as any,
        descriptionInventoryType: data?.description as any,
      });
    } else {
      setInventoryData({
        ...inventoryData,
        [name]: finalValue,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inventoryData);

    if (newInventoryTypeName && newDescription) {
      const newInventoryTypeId = undefined;

      setInventoryType((prevData) => ({
        ...prevData,
        inventoryTypeId: newInventoryTypeId,
        inventoryTypeName: newInventoryTypeName,
        description: newDescription,
      }));

      setInventoryTypeList([]);
    }

    setCreateNewInventoryType(false);
  };

  useEffect(() => {
    const data = inventoryType.map((type) => ({
      id: type.id,
      inventoryTypeName: type.inventoryTypeName,
      displayName: type.inventoryTypeName,
      description: type.description,
      showCreateNew: false,
    }));
    data.push({
      id: 0,
      inventoryTypeName: "",
      displayName: "Create Inventory Type Name",
      description: "",
      showCreateNew: true,
    });
    setInventoryTypeList([...data]);
  }, [inventoryType]);

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
            {inventoryTypeList && (
              <Select
                className="w-full"
                color="orange"
                variant="outlined"
                size="lg"
                label="Inventory Type Name"
                placeholder="Inventory Type Name"
                onChange={(e) => {
                  handleInputChange({
                    target: {
                      name: "inventoryTypeName",
                      value: e,
                      type: "text",
                    },
                  });
                }}
              >
                {inventoryTypeList.map((type) => (
                  <Option
                    key={type.id}
                    value={type.id.toString()}
                    onClick={() => {
                      setCreateNewInventoryType(type.showCreateNew);
                    }}
                  >
                    {type.displayName}
                  </Option>
                ))}
              </Select>
            )}
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
                    size="md"
                    placeholder="Inventory Type Name"
                    value={inventoryData.inventoryTypeName}
                    onChange={(e) =>
                      setInventoryData((prevData) => ({
                        ...prevData,
                        inventoryTypeName: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    className="w-full"
                    color="orange"
                    label="Description"
                    type="text"
                    name="descriptionInventoryType"
                    variant="outlined"
                    size="md"
                    placeholder="Description"
                    value={inventoryData.descriptionInventoryType}
                    onChange={(e) =>
                      setInventoryData((prevData) => ({
                        ...prevData,
                        descriptionInventoryType: e.target.value,
                      }))
                    }
                    required
                  />
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
