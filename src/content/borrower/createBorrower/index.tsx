import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import BorrowerForm from "../../../container/borrowerForm";
import TimedAlert from "../../../container/alert";
import useCreateBorrower from "../../../hooks/borrower/createBorrower";

const CreateBorrowerContent = () => {
  const { createBorrower, success, loading, error } = useCreateBorrower();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateBorrower = async (borrowerData: any) => {
    setIsSubmitting(true);
    const result = await createBorrower(borrowerData);
    console.log(result);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Borrower
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <BorrowerForm
        onSubmit={handleCreateBorrower}
        isEditMode={false}
        isSubmitting={isSubmitting}
        success={success}
      />

      <div className="fixed z-9999 top-4 right-4">
        {success && (
          <TimedAlert message={success} duration={5000} color="green" />
        )}
      </div>
      <div className="fixed z-9999 top-4 right-4">
        {error && <TimedAlert message={error} duration={5000} color="red" />}
      </div>
    </div>
  );
};

export default CreateBorrowerContent;
