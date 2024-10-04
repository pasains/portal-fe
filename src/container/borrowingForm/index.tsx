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
    borrowerId: undefined,
    organizationId: undefined,
    dueDate: Date,
    specialInstruction: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setBorrowingData({
        borrowerId: initialData.borrowerId,
        organizationId: initialData.organizationId,
        dueDate: initialData.dueDate,
        specialInstruction: initialData.specialInstruction,
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setBorrowingData({
        borrowerId: undefined,
        organizationId: undefined,
        dueDate: Date,
        specialInstruction: "",
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type == "number" ? +value : value;
    console.log("SUSI 3", finalValue);

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
              Borrower Id
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Borrower Id"
              type="number"
              name="borrowerId"
              variant="outlined"
              size="md"
              placeholder="Borrower Id"
              value={borrowingData.borrowerId || undefined}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Organization Id
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Organization Id"
              type="number"
              name="organizationId"
              variant="outlined"
              size="md"
              placeholder="Organization Id"
              value={borrowingData.organizationId || undefined}
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
