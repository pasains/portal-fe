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
import useInventoryGroup from "../../hooks/inventoryGroup/inventoryGroupList";

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
    inventoryTypeId: 0,
    inventoryTypeName: "",
    descriptionInventoryType: "",
    inventoryGroupId: 0,
    inventoryGroupName: "",
    descriptionInventoryGroup: "",
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
  const [inventoryGroupList, setInventoryGroupList] = useState<
    {
      id: number;
      inventoryGroupName: string;
      description: string;
      displayName: string;
      showCreateNew: boolean;
    }[]
  >();
  const { inventoryType, setInventoryType } = useInventoryType();
  const { inventoryGroup, setInventoryGroup } = useInventoryGroup();
  const [currentQuantity, setCurrentQuantity] = useState<number | string>(0);
  const [createNewInventoryType, setCreateNewInventoryType] = useState(false);
  const [createNewInventoryGroup, setCreateNewInventoryGroup] = useState(false);
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
        inventoryTypeId: initialData.inventoryTypeId || 0,
        inventoryTypeName: initialData.inventoryTypeName || "",
        descriptionInventoryType: initialData.descriptionInventoryType || "",
        inventoryGroupId: initialData.inventoryGroupId || 0,
        inventoryGroupName: initialData.inventoryGroupName || "",
        descriptionInventoryGroup: initialData.descriptionInventoryGroup || "",
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
        inventoryTypeId: 0,
        inventoryTypeName: "",
        descriptionInventoryType: "",
        inventoryGroupId: 0,
        inventoryGroupName: "",
        descriptionInventoryGroup: "",
        url: "",
        currentQuantity: 0,
      });
    }
  }, [success]);

  useEffect(() => {
    console.log(`INVENTORY_DATA_`, inventoryData);
  }, [inventoryData]);

  // Handle input change
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
    } else if (name === "inventoryGroupName") {
      const data = inventoryGroup.find((element) => element.id == finalValue);
      setInventoryData({
        ...inventoryData,
        inventoryGroupId: data?.id as any,
        inventoryGroupName: data?.inventoryGroupName as any,
        descriptionInventoryGroup: data?.description as any,
      });
    } else {
      setInventoryData({
        ...inventoryData,
        [name]: finalValue,
      });
    }
  };

  //Handle single image  upload
  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file); // Temporary URL for preview
      setInventoryData((prev) => ({
        ...prev,
        url: url,
      }));
    }
  };

  //Handle cancel image upload
  const handleCancelImage = () => {
    setInventoryData((prev) => ({
      ...prev,
      url: "",
    }));
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
        inventoryTypeId: 0,
        inventoryTypeName: inventoryData.inventoryTypeName,
        description: inventoryData.descriptionInventoryType,
      }));
      if (
        initialData.inventoryGroupName &&
        inventoryData.descriptionInventoryGroup
      ) {
        setInventoryGroup((prevData) => ({
          ...prevData,
          inventoryGroupId: 0,
          inventoryGroupName: inventoryData.inventoryGroupName,
          description: inventoryData.descriptionInventoryGroup,
        }));

        setInventoryTypeList([]);
        setInventoryGroupList([]);
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
      setCreateNewInventoryGroup(false);
    }
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

  useEffect(() => {
    const data = inventoryGroup.map((type) => ({
      id: type.id,
      inventoryGroupName: type.inventoryGroupName,
      displayName: type.inventoryGroupName,
      description: type.description,
      showCreateNew: false,
    }));
    data.push({
      id: 0,
      inventoryGroupName: "",
      displayName: "Create Inventory Group Name",
      description: "",
      showCreateNew: true,
    });
    setInventoryGroupList([...data]);
  }, [inventoryGroup]);

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
            <Typography variant="h6">Image</Typography>
            <div className="w-52 mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
                className="w-52"
              />
              {inventoryData.url && (
                <div className="relative">
                  <img
                    src={inventoryData.url}
                    alt="Preview"
                    style={{ width: "200px" }}
                    className="mt-2 h-auto border rounded shadow-lg"
                  />
                  <button
                    onClick={handleCancelImage}
                    className="absolute top-2 right-4 bg-red-700 text-white py-1 px-2 font-bold rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
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
                    {type.displayName.trim() || ""}
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

          <label htmlFor="inventoryGroupName">
            <Typography className="mb-2" variant="h6">
              Inventory Group Name:
            </Typography>
            {inventoryGroupList && (
              <Select
                selected={() => {
                  const data = inventoryGroupList.find(
                    (item) =>
                      item.displayName == inventoryData.inventoryGroupName,
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
                        setCreateNewInventoryGroup(data.showCreateNew);
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
                label="Inventory Group Name"
                name="inventoryGroupName"
                value={inventoryData.inventoryGroupName || ""}
                onChange={(e) => {
                  handleInputChange({
                    target: {
                      name: "inventoryGroupName",
                      value: e,
                      type: "text",
                    },
                  });
                }}
              >
                {inventoryGroupList.map((type) => (
                  <Option
                    key={type.id}
                    value={type.id.toString()}
                    onClick={() => {
                      setCreateNewInventoryGroup(type.showCreateNew);
                    }}
                  >
                    {type.displayName.trim() || ""}
                  </Option>
                ))}
              </Select>
            )}
            {createNewInventoryGroup && (
              <form onSubmit={handleSubmit}>
                <Typography className="pt-5 pb-2" variant="h6" color="orange">
                  Create Inventory Group Name:
                </Typography>
                <div className="space-y-3">
                  <Input
                    className="w-full"
                    color="orange"
                    label="Inventory Group Name"
                    type="text"
                    name="inventoryGroupName"
                    variant="outlined"
                    size="lg"
                    value={inventoryData.inventoryGroupName || ""}
                    onChange={(e) =>
                      setInventoryData((prevData) => ({
                        ...prevData,
                        inventoryGroupName: e.target.value,
                      }))
                    }
                    required
                  />
                  <Textarea
                    className="w-full"
                    color="orange"
                    label="Description"
                    variant="outlined"
                    name="descriptionInventoryGroup"
                    value={inventoryData.descriptionInventoryGroup || ""}
                    onChange={(e) =>
                      setInventoryData((prevData) => ({
                        ...prevData,
                        descriptionInventoryGroup: e.target.value,
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
