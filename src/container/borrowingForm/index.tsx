import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface BorrowingProps {
  initialData?: any;
  onSubmit: (borrowingData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const BorrowingForm: React.FC<BorrowingProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [borrowingData, setBorrowingData] = useState({
    borrowerName: "",
    identityCard: "",
    identityNumber: "",
    phoneNumber: "",
    organizationName: "",
    address: "",
    organizationStatus: "",
    note: "",
    dueDate: Date,
    specialInstruction: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setBorrowingData({
        borrowerName: initialData.borrowerName || "",
        identityCard: initialData.identityCard || "",
        identityNumber: initialData.identityNumber || "",
        phoneNumber: initialData.phoneNumber || "",
        organizationName: initialData.organizationName || "",
        address: initialData.address || "",
        organizationStatus: initialData.organizationStatus || "",
        note: initialData.note || "",
        dueDate: initialData.dueDate || "",
        specialInstruction: initialData.specialInstruction || "",
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setBorrowingData({
        borrowerName: "",
        identityCard: "",
        identityNumber: "",
        phoneNumber: "",
        organizationName: "",
        address: "",
        organizationStatus: "",
        note: "",
        dueDate: Date,
        specialInstruction: "",
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type === "number" ? +value : value;
    //console.log("BORROWING 3", finalValue);

    setBorrowingData({
      ...borrowingData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(borrowingData);
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
              value={borrowingData.borrowerName || ""}
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
              value={borrowingData.identityCard || ""}
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
              value={borrowingData.identityNumber || ""}
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
              value={borrowingData.phoneNumber || ""}
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
              value={borrowingData.organizationName || ""}
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
              value={borrowingData.address || ""}
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
              value={borrowingData.organizationStatus || ""}
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
              value={borrowingData.note || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Due Date
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Due Date"
              type="date"
              name="dueDate"
              variant="outlined"
              size="md"
              placeholder="Due Date"
              value={borrowingData.dueDate.toString() || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Special Instruction
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Special Instruction"
              type="text"
              name="specialInstruction"
              variant="outlined"
              size="lg"
              placeholder="Special Instruction"
              value={borrowingData.specialInstruction || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Borrowing" : "Create Borrowing"}
        </Button>
      </form>
    </div>
  );
};

export default BorrowingForm;
