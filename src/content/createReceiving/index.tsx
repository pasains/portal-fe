import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import TimedAlert from "../../container/alert";
import useCreateReceiving from "../../hooks/createReceiving";
import ReceivingForm from "../../container/receivingForm";

const CreateReceivingContent = () => {
  const { createReceiving, loading, error, success } = useCreateReceiving();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handelCreateReceiving = async (receivingData: any) => {
    setIsSubmitting(true);
    const result = await createReceiving(receivingData);
    console.log(result);
    console.log("RECEIVING ", receivingData);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create New Receiving
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <ReceivingForm
        onSubmit={handelCreateReceiving}
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

export default CreateReceivingContent;
