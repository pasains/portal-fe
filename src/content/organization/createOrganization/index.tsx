import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import OrganizationForm from "../../../container/organizationForm";
import TimedAlert from "../../../container/alert";
import useCreateOrganization from "../../../hooks/organization/createOrganization";

const CreateOrganizationContent = () => {
  const { createOrganization, success, loading, error } =
    useCreateOrganization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrganization = async (organizationData: any) => {
    setIsSubmitting(true);
    const result = await createOrganization(organizationData);
    console.log(result);
    setIsSubmitting(false);
  };

  return (
    <div>
      <Typography className="py-10 text-center" variant="h2">
        Create Organization
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <OrganizationForm
        onSubmit={handleCreateOrganization}
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

export default CreateOrganizationContent;
