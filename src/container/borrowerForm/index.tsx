import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface BorrowerProps {
  initialData?: any;
  onSubmit: (borrowerData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const BorrowerForm: React.FC<BorrowerProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [borrowerData, setBorrowerData] = useState({
    borrowerName: "",
    identityCard: "",
    identityNumber: "",
    phoneNumber: "",
    organizationId: undefined,
    organizationName: "",
    address: "",
    organizationStatus: "",
    note: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setBorrowerData({
        borrowerName: initialData.borrowerName || "",
        identityCard: initialData.identityCard || "",
        identityNumber: initialData.identityNumber || "",
        phoneNumber: initialData.phoneNumber || "",
        organizationId: initialData.organizationId || undefined,
        organizationName: initialData.organizationName || "",
        address: initialData.address || "",
        organizationStatus: initialData.organizationStatus || "",
        note: initialData.note || "",
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setBorrowerData({
        borrowerName: "",
        identityCard: "",
        identityNumber: "",
        phoneNumber: "",
        organizationId: undefined,
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

    setBorrowerData({
      ...borrowerData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(borrowerData);
  };

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label>
            <Typography className="mb-2" variant="h6">
              Borrower Name
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Borrower Name"
              type="text"
              name="borrowerName"
              variant="outlined"
              size="md"
              placeholder="Borrower Name"
              value={borrowerData.borrowerName || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Identity Card
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="identityCard"
              type="text"
              name="identityCard"
              variant="outlined"
              size="md"
              placeholder="Identity Card"
              value={borrowerData.identityCard || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Identity Number
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="identityNumber"
              type="text"
              name="identityNumber"
              variant="outlined"
              size="md"
              placeholder="Identity Number"
              value={borrowerData.identityNumber || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Phone Number
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="phoneNumber"
              type="text"
              name="phoneNumber"
              variant="outlined"
              size="md"
              placeholder="Phone Number"
              value={borrowerData.phoneNumber || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

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
              value={borrowerData.organizationName || ""}
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
              value={borrowerData.address || ""}
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
              value={borrowerData.organizationStatus || ""}
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
              value={borrowerData.note || ""}
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

export default BorrowerForm;
