import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface OrganizationProps {
  initialData?: any;
  onSubmit: (organizationData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const OrganizationForm: React.FC<OrganizationProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [organizationData, setOrganizationData] = useState({
    organizationName: "",
    address: "",
    organizationStatus: "",
    note: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setOrganizationData({
        organizationName: initialData.organizationName || "",
        address: initialData.address || "",
        organizationStatus: initialData.organizationStatus || "",
        note: initialData.note || "",
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setOrganizationData({
        organizationName: "",
        address: "",
        organizationStatus: "",
        note: "",
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type === "number" ? +value : value;

    setOrganizationData({
      ...organizationData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(organizationData);
  };

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label>
            <Typography className="mb-2" variant="h6">
              Organization Name
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="organizationName"
              type="text"
              name="organizationName"
              variant="outlined"
              size="md"
              placeholder="Organization Name"
              value={organizationData.organizationName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Address
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="address"
              type="text"
              name="address"
              variant="outlined"
              size="md"
              placeholder="Address"
              value={organizationData.address || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Organization Status
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="organizationStatus"
              type="text"
              name="organizationStatus"
              variant="outlined"
              size="md"
              placeholder="Organization Status"
              value={organizationData.organizationStatus || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Note
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="note"
              type="text"
              name="note"
              variant="outlined"
              size="md"
              placeholder="Note"
              value={organizationData.note || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Borrower" : "Create Borrower"}
        </Button>
      </form>
    </div>
  );
};

export default OrganizationForm;
