import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

interface ReceivingProps {
  initialData?: any;
  onSubmit: (receivingData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}

const ReceivingForm: React.FC<ReceivingProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [receivingData, setReceivingData] = useState({
    userId: undefined,
    notes: "",
    status: "",
  });

  useEffect(() => {
    if (isEditMode && initialData) {
      setReceivingData({
        userId: initialData.userId,
        notes: initialData.notes,
        status: initialData.status,
      });
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (success) {
      setReceivingData({
        userId: undefined,
        notes: "",
        status: "",
      });
    }
  }, [success]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    let finalValue = type == "number" ? +value : value;
    console.log("SUSI 3", finalValue);

    setReceivingData({
      ...receivingData,
      [name]: finalValue,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(receivingData);
  };

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label>
            <Typography className="mb-2" variant="h6">
              User Id
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="User Id"
              type="number"
              name="userId"
              variant="outlined"
              size="md"
              placeholder="User Id"
              value={receivingData.userId || undefined}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Notes
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Notes"
              type="text"
              name="notes"
              variant="outlined"
              size="md"
              placeholder="Notes"
              value={receivingData.notes || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Status
            </Typography>
            <Input
              className="w-full"
              color="orange"
              label="Status"
              type="text"
              name="status"
              variant="outlined"
              size="lg"
              placeholder="Status"
              value={receivingData.status || ""}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Receiving" : "Create Receiving"}
        </Button>
      </form>
    </div>
  );
};

export default ReceivingForm;
