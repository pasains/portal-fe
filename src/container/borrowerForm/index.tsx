import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import useOrganization from "../../hooks/organization/organizationList";

interface BorrowerProps {
  initialData?: any;
  onSubmit: (borrowerData: any) => void;
  isEditMode?: boolean;
  isSubmitting?: any;
  success?: any;
}
type BorrowerData = {
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  organizationId: number | undefined;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
};

const BorrowerForm: React.FC<BorrowerProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [borrowerData, setBorrowerData] = useState<BorrowerData>({
    borrowerName: "",
    identityCard: "",
    identityNumber: "",
    phoneNumber: "+62",
    organizationId: undefined,
    organizationName: "",
    address: "",
    organizationStatus: "",
    note: "",
  });

  const [organizationList, setOrganizationList] = useState<
    {
      id: number;
      organizationName: string;
      address: string;
      organizationStatus: string;
      note: string;
      displayName: string;
      showCreateNew: boolean;
    }[]
  >();
  const { organization, setOrganization } = useOrganization();
  const [createNewOrganization, setCreateNewOrganization] = useState(false);

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
        organizationId: 0,
        organizationName: "",
        address: "",
        organizationStatus: "",
        note: "",
      });
    }
  }, [success]);

  useEffect(() => {
    console.log(`BORROWER`, borrowerData);
  }, [borrowerData]);

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    let finalValue = type === "number" ? +value : value;

    if (name === "organizationName") {
      const data = organization.find((element) => element.id == finalValue);
      setBorrowerData({
        ...borrowerData,
        organizationId: data?.id as any,
        organizationName: data?.organizationName as any,
        address: data?.address as any,
        organizationStatus: data?.organizationStatus as any,
        note: data?.note as any,
      });
    } else {
      setBorrowerData({
        ...borrowerData,
        [name]: finalValue,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(borrowerData);

    if (
      initialData.organizationName &&
      borrowerData.address &&
      borrowerData.organizationStatus &&
      borrowerData.note
    ) {
      setOrganization((prevData) => ({
        ...prevData,
        organizationId: undefined,
        organizationName: borrowerData.organizationName,
        address: borrowerData.address,
        organizationStatus: borrowerData.organizationStatus,
        note: borrowerData.note,
      }));
      setOrganizationList([]);
    }
    setCreateNewOrganization(false);
  };

  useEffect(() => {
    if (!Array.isArray(organization)) {
      console.error("Organization is not an array:", organization);
      return;
    }
    const data = organization.map((org) => ({
      id: org.id,
      organizationName: org.organizationName,
      displayName: org.organizationName,
      address: org.address,
      organizationStatus: org.organizationStatus,
      note: org.note,
      showCreateNew: false,
    }));
    data.push({
      id: 0,
      organizationName: "",
      displayName: "Create Organization",
      address: "",
      organizationStatus: "",
      note: "",
      showCreateNew: true,
    });
    setOrganizationList([...data]);
  }, [organization]);

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

          <label htmlFor="organizationName">
            <Typography className="mb-2" variant="h6">
              Organization Name
            </Typography>
            {organizationList && (
              <Select
                selected={() => {
                  const data = organizationList.find(
                    (item) => item.displayName == borrowerData.organizationName,
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
                        setCreateNewOrganization(data.showCreateNew);
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
                label="Organization Name"
                name="organizationName"
                value={borrowerData.organizationName || ""}
                onChange={(e) => {
                  handleInputChange({
                    target: {
                      name: "organizationName",
                      value: e,
                      type: "text",
                    },
                  });
                }}
              >
                {organizationList.map((type) => (
                  <Option
                    key={type.id}
                    value={type.id.toString()}
                    onClick={() => {
                      setCreateNewOrganization(type.showCreateNew);
                    }}
                  >
                    {type.displayName || ""}
                  </Option>
                ))}
              </Select>
            )}
            {createNewOrganization && (
              <form onSubmit={handleSubmit}>
                <Typography className="pt-5 pb-2" variant="h6" color="orange">
                  Create Organization Name:
                </Typography>
                <div className="space-y-3">
                  <Input
                    className="w-full"
                    color="orange"
                    label="Organization Name"
                    type="text"
                    name="organizationName"
                    variant="outlined"
                    size="lg"
                    value={borrowerData.organizationName || ""}
                    onChange={(e) =>
                      setBorrowerData((prevData) => ({
                        ...prevData,
                        organizationName: e.target.value,
                      }))
                    }
                    required
                  />
                  <Textarea
                    className="w-full"
                    color="orange"
                    label="Address"
                    variant="outlined"
                    name="address"
                    value={borrowerData.address || ""}
                    onChange={(e) =>
                      setBorrowerData((prevData) => ({
                        ...prevData,
                        address: e.target.value,
                      }))
                    }
                    required
                  />
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
                </div>
              </form>
            )}
          </label>
          <br />
        </section>

        <Button className="mb-10" type="submit" disabled={isSubmitting}>
          {isEditMode ? "Update Borrower" : "Create Borrower"}
        </Button>
      </form>
    </div>
  );
};

export default BorrowerForm;
