import React, { useState, useEffect } from "react";

import {
  Button,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import useInventoryType from "../../hooks/inventoryType/inventoryTypeList";

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
  const [inventoryData, setInventoryData] = useState({
    inventoryName: "",
    refId: "",
    description: "",
    condition: "",
    note: "",
    isBorrowable: false,
    inventoryTypeName: "",
    inventoryTypeId: 0,
    descriptionInventoryType: "",
    url: "",
    currentQuantity: 0,
  });
  const [inventoryTypeList, setInventoryTypeList] = useState<
    {
      id: number;
      inventoryTypeName: string;
      description: string;
      displayName: string;
      showCreateNew: boolean;
    }[]
  >();
  const { inventoryType, setInventoryType } = useInventoryType();
  const [currentQuantity, setCurrentQuantity] = useState<number | string>(0);
  const [createNewInventoryType, setCreateNewInventoryType] = useState(false);
  const totalQuantity = currentQuantity;

  useEffect(() => {
    if (isEditMode && initialData) {
      setInventoryData({
        inventoryName: initialData.inventoryName || "",
        refId: initialData.refId || "",
        description: initialData.description || "",
        condition: initialData.condition || "",
        note: initialData.note || "",
        isBorrowable: initialData.isBorrowable || false,
        inventoryTypeName: initialData.inventoryTypeName || "",
        inventoryTypeId: initialData.inventoryTypeId || undefined,
        descriptionInventoryType: initialData.descriptionInventoryType || "",
        url: initialData.url || "",
        currentQuantity: initialData.currentQuantity || 0,
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setInventoryData({
        inventoryName: "",
        refId: "",
        description: "",
        condition: "",
        note: "",
        isBorrowable: false,
        inventoryTypeName: "",
        inventoryTypeId: 0,
        descriptionInventoryType: "",
        url: "",
        currentQuantity: 0,
      });
    }
  }, [success]);

  useEffect(() => {
    console.log(`INVENTORY_DATA_`, inventoryData);
  }, [inventoryData]);

  const handleInputChange = (e: any): void => {
    const {
      name,
      value,
      type = "text",
    } = e.target as HTMLInputElement | HTMLSelectElement;

    let finalValue = type === "number" ? +value : value;
    if (value === "" || Number(value) >= 0) {
      setCurrentQuantity(value); // Store as string for now to allow empty inputs
    }

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

    if (
      initialData.inventoryTypeName &&
      inventoryData.descriptionInventoryType
    ) {
      setInventoryType((prevData) => ({
        ...prevData,
        inventoryTypeId: undefined,
        inventoryTypeName: inventoryData.inventoryTypeName,
        description: inventoryData.descriptionInventoryType,
      }));

      setInventoryTypeList([]);
    }
    const parsedCurrentQuantity = Number(currentQuantity);

    if (isNaN(parsedCurrentQuantity)) {
      alert("Please enter a valid current quantity.");
      return;
    }

    // totalQuantity is the same as currentQuantity for new inventory
    const totalQuantity = parsedCurrentQuantity;
    console.log(`TOTAL_QUANTITY`, totalQuantity);

    setCurrentQuantity(0);
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
        <section className="p-5 mb-10 my-auto items-center border border-b rounded-lg">
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
            <Textarea
              className="w-full"
              color="orange"
              label="Description"
              variant="outlined"
              name="description"
              value={inventoryData.description || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Condition:
            </Typography>
            <Textarea
              className="w-full"
              color="orange"
              label="Condition"
              variant="outlined"
              name="condition"
              value={inventoryData.condition || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Note:
            </Typography>
            <Textarea
              className="w-full"
              color="orange"
              label="Note"
              variant="outlined"
              name="note"
              value={inventoryData.note || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Image URL:
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Image URL"
              type="url"
              name="url"
              variant="outlined"
              size="lg"
              value={inventoryData.url || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Quantity:
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Quantity"
              type="number"
              name="currentQuantity"
              variant="outlined"
              min={0}
              size="lg"
              value={inventoryData.currentQuantity || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label htmlFor="inventoryTypeName">
            <Typography className="mb-2" variant="h6">
              Inventory Type Name:
            </Typography>
            {inventoryTypeList && (
              <Select
                selected={() => {
                  const data = inventoryTypeList.find(
                    (item) =>
                      item.displayName == inventoryData.inventoryTypeName,
                  );
                  if (data == undefined) {
                    return;
                  }
                  return (
                    <Option
                      key={data.id}
                      value={data.id.toString() || ""}
                      className="custom-select bg-white hover:bg-white"
                      onClick={() => {
                        setCreateNewInventoryType(data.showCreateNew);
                      }}
                    >
                      {data?.displayName.trim() || ""}
                    </Option>
                  );
                }}
                className="w-full"
                color="orange"
                variant="outlined"
                size="lg"
                label="Inventory Type Name"
                name="inventoryTypeName"
                value={inventoryData.inventoryTypeName || ""}
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
                    {type.displayName || ""}
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
                    size="lg"
                    value={inventoryData.inventoryTypeName || ""}
                    onChange={(e) =>
                      setInventoryData((prevData) => ({
                        ...prevData,
                        inventoryTypeName: e.target.value,
                      }))
                    }
                    required
                  />
                  <Textarea
                    className="w-full"
                    color="orange"
                    label="Description"
                    variant="outlined"
                    name="descriptionInventoryType"
                    value={inventoryData.descriptionInventoryType || ""}
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

          <label>
            <Typography className="mr-2" variant="h6">
              Is Borrowable?:
            </Typography>
            <Checkbox
              type="checkbox"
              label="Please fill this check box if the item is borrowable"
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

        <Button className="mb-10" type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Inventory" : "Create Inventory"}
        </Button>
      </form>
    </div>
  );
};

export default InventoryForm;
