import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useUpdateOrganization } from "../../../hooks/organization/updateOrganization";
import TimedAlert from "../../../container/alert";
import InventoryTypeForm from "../../../container/inventoryTypeForm";

const UpdateOrganization = () => {
  const { updateOrganization, id, organizationDetail, loading, success, error } =
    useUpdateOrganization();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateOrganization = async (organizationData: any) => {
    setIsSubmitting(true);
    if (id) {
      const result = await updateOrganization(id, organizationData);
      setIsSubmitting(false);
      console.log(result);
    }
  };

  useEffect(() => {
    if (id) {
      console.log("id", id);
    }
  }, [id]);

  return (
    <div>
      <Typography className="py-10 text-center" variant="h3">
        Update Organization
      </Typography>

      {loading && <p className="text-center">Loading...</p>}

      <InventoryTypeForm
        onSubmit={handleUpdateOrganization}
        initialData={organizationDetail}
        isEditMode={true}
        isSubmitting={isSubmitting}
        success={success}
      />

      <div className="fixed z-9999 top-10 right-10">
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

export default UpdateOrganization;

