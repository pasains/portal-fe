import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import useBorrower from "../../hooks/borrower/borrowersList";
import useOrganization from "../../hooks/organization/organizationList";

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
    borrowerId: 0,
    borrowerName: "",
    identityCard: "",
    identityNumber: "",
    phoneNumber: "",
    status: "",
    organizationId: 0,
    organizationName: "",
    address: "",
    organizationStatus: "",
    note: "",
    dueDate: Date,
    specialInstruction: "",
  });
  const [borrowerList, setBorrowerList] = useState<
    {
      id: number;
      borrowerName: string;
      identityCard: string;
      identityNumber: string;
      phoneNumber: string;
      organizationName: string;
      address: string;
      organizationStatus: string;
      note: string;
      displayName: string;
      showCreateNew: boolean;
    }[]
  >();
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
  const { borrower, setBorrower } = useBorrower();
  const { organization, setOrganization } = useOrganization();
  const [createNewBorrower, setCreateNewBorrower] = useState(false);
  const [createNewOrganization, setCreateNewOrganization] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  //Console log the data
  useEffect(() => {
    console.log(`DATA_1`, borrowingData);
  }, [borrowingData]);

  //  Get data for edit mode and clean data for initial
  useEffect(() => {
    if (isEditMode && initialData) {
      setBorrowingData({
        borrowerId: initialData.borrowerId || 0,
        borrowerName: initialData.borrowerName || "",
        identityCard: initialData.identityCard || "",
        identityNumber: initialData.identityNumber || "",
        status: initialData.status || "",
        phoneNumber: initialData.phoneNumber || "",
        organizationId: initialData.organizationId || 0,
        organizationName: initialData.organizationName || "",
        address: initialData.address || "",
        organizationStatus: initialData.organizationStatus || "",
        note: initialData.note || "",
        dueDate: initialData.dueDate || "",
        specialInstruction: initialData.specialInstruction || "",
      });
    }
  }, [isEditMode, initialData]);

  // Clean data if the data is successfully input
  useEffect(() => {
    if (success) {
      setBorrowingData({
        borrowerId: 0,
        borrowerName: "",
        identityCard: "",
        identityNumber: "",
        status: "",
        phoneNumber: "",
        organizationId: 0,
        organizationName: "",
        address: "",
        organizationStatus: "",
        note: "",
        dueDate: Date,
        specialInstruction: "",
      });
    }
  }, [success]);

  //Console log the data
  useEffect(() => {
    console.log(`DATA_`, borrowingData);
  }, [borrowingData]);

  //Handle input
  const handleInputChange = (e: any) => {
    console.log(`E_ ${JSON.stringify(e)}`);
    const { name, value, type } = e.target as
      | HTMLInputElement
      | HTMLSelectElement;
    let finalValue = type === "number" ? +value : value;

    if (name === "borrowerName") {
      // Find selected borrower by id or name
      const data = borrower.find((element) => element.id == finalValue);

      //If borrower exists, set borrower data
      if (data) {
        setIsLocked(false);
        setBorrowingData({
          ...borrowingData,
          borrowerId: data?.id as any,
          borrowerName: data?.borrowerName as any,
          identityCard: data?.identityCard as any,
          identityNumber: data?.identityNumber as any,
          phoneNumber: data?.phoneNumber as any,
          organizationName: data?.borrowerOrganizationRel
            .organizationName as any,
          address: data?.borrowerOrganizationRel.address as any,
          organizationStatus: data?.borrowerOrganizationRel
            .organizationStatus as any,
          note: data?.borrowerOrganizationRel.note as any,
        });

        // Check if borrower has an associated organization
        if (data?.organizationId) {
          // Find organization details
          const organizationData = organization.find(
            (element) => element.id == data.organizationId,
          );
          // If organization exists, update organization related fields

          if (organizationData) {
            console.log(`ORG_DATA ${JSON.stringify(organizationData)}`);
            handleInputChange({
              target: {
                name: "organizationName",
                value: organizationData.id.toString(),
                type: "text",
              },
            });
            //setBorrowingData({
            //  ...borrowingData,
            //  organizationId: organizationData?.id as any,
            //  organizationName: organizationData?.organizationName as any,
            //  address: organizationData?.address as any,
            //  organizationStatus: organizationData?.organizationStatus as any,
            //  note: organizationData?.note as any,
            //});
            //setIsLocked(true);
          }
        }
      }
    } else if (name === "organizationName") {
      // Handle organization change manually if needed
      const data = organization.find((element) => element.id == finalValue);
      console.log(`ORG_DATA_2 ${JSON.stringify(data)}`);
      setBorrowingData({
        ...borrowingData,
        organizationId: data?.id as any,
        organizationName: data?.organizationName as any,
        address: data?.address as any,
        organizationStatus: data?.organizationStatus as any,
        note: data?.note as any,
      });
    } else {
      // Handle any other fields
      setBorrowingData({
        ...borrowingData,
        [name]: finalValue,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(borrowingData);
    // Check if borrower data exists and if fields are filled
    if (
      borrowingData.borrowerName &&
      borrowingData.identityCard &&
      borrowingData.identityNumber &&
      borrowingData.phoneNumber
    ) {
      // Check if borrower already exist
      const existingBorrower = borrower.find(
        (b) => b.borrowerName === borrowingData.borrowerName,
      );
      if (existingBorrower) {
        // If borrower exists, update the data
        setBorrower((prevData) => ({
          ...prevData,
          borrowerName: borrowingData.borrowerName,
          identityCard: borrowingData.identityCard,
          identityNumber: borrowingData.identityNumber,
          phoneNumber: borrowingData.phoneNumber,
        }));
      } else {
        // If borrower doesnt exists, create a new one
        setBorrower((prevData) => ({
          ...prevData,
          borrowerId: 0,
          borrowerName: borrowingData.borrowerName,
          identityCard: borrowingData.identityCard,
          identityNumber: borrowingData.identityNumber,
          phoneNumber: borrowingData.phoneNumber,
        }));
      }
      setBorrowerList([]);
    }

    // Check if organization data exists and if fields are filled
    if (
      borrowingData.organizationName &&
      borrowingData.address &&
      borrowingData.organizationStatus &&
      borrowingData.note
    ) {
      // Check if organization already exist
      const existingOrganization = organization.find(
        (org) => org.organizationName,
      );
      if (existingOrganization) {
        // If organization exists, update the data
        setOrganization((prevData) => ({
          ...prevData,
          organizationName: borrowingData.organizationName,
          address: borrowingData.address,
          organizationStatus: borrowingData.organizationStatus,
          note: borrowingData.note,
        }));
      } else {
        // If organization doesnt exists, create a new one
        setOrganization((prevData) => ({
          ...prevData,
          organizationId: 0,
          organizationName: borrowingData.organizationName,
          address: borrowingData.address,
          organizationStatus: borrowingData.organizationStatus,
          note: borrowingData.note,
        }));
      }
      setOrganizationList([]);
    }
    setCreateNewBorrower(false);
    setCreateNewOrganization(false);
  };

  useEffect(() => {
    const dataBorrower = Array.isArray(borrower)
      ? borrower.map((type) => ({
          id: type.id,
          borrowerName: type.borrowerName,
          identityCard: type.identityCard,
          identityNumber: type.identityNumber,
          phoneNumber: type.phoneNumber,
          organizationName: type.borrowerOrganizationRel.organizationName,
          address: type.borrowerOrganizationRel.address,
          organizationStatus: type.borrowerOrganizationRel.organizationStatus,
          note: type.borrowerOrganizationRel.note,
          displayName: type.borrowerName,
          showCreateNew: false,
        }))
      : [];
    dataBorrower.push({
      id: 0,
      borrowerName: "",
      displayName: "Create New Borrower",
      identityCard: "",
      identityNumber: "",
      phoneNumber: "",
      organizationName: "",
      address: "",
      organizationStatus: "",
      note: "",
      showCreateNew: true,
    });
    const dataOrganization = Array.isArray(organization)
      ? organization.map((type) => ({
          id: type.id,
          organizationName: type.organizationName,
          address: type.address,
          organizationStatus: type.organizationStatus,
          note: type.note,
          displayName: type.organizationName,
          showCreateNew: false,
        }))
      : [];
    dataOrganization.push({
      id: 0,
      organizationName: "",
      address: "",
      organizationStatus: "",
      note: "",
      displayName: "Create New Organization",
      showCreateNew: true,
    });
    setBorrowerList([...dataBorrower]);
    setOrganizationList([...dataOrganization]);
  }, [borrower, organization]);

  return (
    <div className="w-[520px] mx-auto items-center">
      <form onSubmit={handleSubmit}>
        <section className="p-5 mb-10 items-center border border-b rounded-lg">
          <label htmlFor="borrowerName">
            <Typography className="mb-2" variant="h6">
              Borrower Name:
            </Typography>
            {borrowerList && (
              <Select
                className="w-full"
                color="orange"
                variant="outlined"
                size="lg"
                label="Borrower Name"
                name="borrowerName"
                onChange={(e) => {
                  handleInputChange({
                    target: {
                      name: "borrowerName",
                      value: e,
                      type: "text",
                    },
                  });
                }}
              >
                {borrowerList.map((type) => (
                  <Option
                    key={type.id}
                    value={type.id.toString()}
                    onClick={() => {
                      setCreateNewBorrower(type.showCreateNew);
                    }}
                  >
                    {type.displayName || ""}
                  </Option>
                ))}
              </Select>
            )}
            {createNewBorrower && (
              <form onSubmit={handleSubmit}>
                <Typography className="pt-5 pb-2" variant="h6" color="orange">
                  Create Borrower Name:
                </Typography>
                <div className="space-y-3">
                  <Input
                    className="w-full"
                    color="orange"
                    label="Borrower Name"
                    type="text"
                    id="borrowerName"
                    variant="outlined"
                    size="lg"
                    value={borrowingData.borrowerName || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        borrowerName: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    className="w-full"
                    color="orange"
                    label="Identity Card"
                    type="text"
                    variant="outlined"
                    name="identityCard"
                    size="lg"
                    value={borrowingData.identityCard || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        identityCard: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    className="w-full"
                    color="orange"
                    label="Identity Number"
                    type="text"
                    name="identityNumber"
                    variant="outlined"
                    size="lg"
                    value={borrowingData.identityNumber || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        identityNumber: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    className="w-full"
                    color="orange"
                    label="Phone Number"
                    type="text"
                    name="note"
                    variant="outlined"
                    size="lg"
                    value={borrowingData.phoneNumber || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        phoneNumber: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </form>
            )}
          </label>
          <br />

          <label htmlFor="organizationName">
            <Typography className="mb-2" variant="h6">
              Organization Name:
            </Typography>
            {organizationList && (
              <Select
                className="w-full"
                color="orange"
                variant="outlined"
                size="lg"
                disabled={isLocked}
                label="Organization Name"
                name="organizationName"
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
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
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
                    value={borrowingData.address || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        address: e.target.value,
                      }))
                    }
                    required
                  />
                  <Input
                    className="w-full"
                    color="orange"
                    label="Organization Status"
                    type="text"
                    name="organizationStatus"
                    variant="outlined"
                    size="lg"
                    value={borrowingData.organizationStatus || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        organizationStatus: e.target.value,
                      }))
                    }
                    required
                  />
                  <Textarea
                    className="w-full"
                    color="orange"
                    label="Note"
                    name="note"
                    variant="outlined"
                    size="lg"
                    value={borrowingData.note || ""}
                    onChange={(e) =>
                      setBorrowingData((prevData) => ({
                        ...prevData,
                        note: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </form>
            )}
          </label>
          <br />

          <label>
            <Typography className="mb-2" variant="h6">
              Status:
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
              value={borrowingData.status || ""}
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
