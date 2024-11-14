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

type BorrowingData = {
  borrowerId: number;
  borrowerName: string;
  identityCard: string;
  identityNumber: string;
  phoneNumber: string;
  status: string;
  organizationId: number | undefined;
  organizationName: string;
  address: string;
  organizationStatus: string;
  note: string;
  dueDate: Date | undefined;
  specialInstruction: string;
};

const BorrowingForm: React.FC<BorrowingProps> = ({
  initialData = {},
  onSubmit,
  isEditMode = false,
  isSubmitting,
  success,
}) => {
  const [borrowingData, setBorrowingData] = useState<BorrowingData>({
    borrowerId: 0,
    borrowerName: "",
    identityCard: "",
    identityNumber: "",
    phoneNumber: "",
    status: "",
    organizationId: undefined,
    organizationName: "",
    address: "",
    organizationStatus: "",
    note: "",
    dueDate: undefined,
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

  const emptiedBorrower = () => {
    setBorrowingData({
      borrowerId: 0,
      borrowerName: "",
      identityCard: "",
      identityNumber: "",
      status: "",
      phoneNumber: "",
      organizationId: borrowingData.organizationId,
      organizationName: borrowingData.organizationName,
      address: borrowingData.address,
      organizationStatus: borrowingData.organizationStatus,
      note: borrowingData.note,
      dueDate: undefined,
      specialInstruction: "",
    });
  };

  const emptiedOrganization = () => {
    setBorrowingData({
      borrowerId: borrowingData.borrowerId,
      borrowerName: borrowingData.borrowerName,
      identityCard: borrowingData.identityCard,
      identityNumber: borrowingData.identityNumber,
      status: borrowingData.status,
      phoneNumber: borrowingData.phoneNumber,
      organizationId: 0,
      organizationName: "",
      address: "",
      organizationStatus: "",
      note: "",
      dueDate: undefined,
      specialInstruction: "",
    });
  };

  //Console log the data
  useEffect(() => {
    console.log(`BORROWING_DATA: `, borrowingData);
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
        dueDate: undefined,
        specialInstruction: "",
      });
    }
  }, [success]);

  //Handle input
  const handleInputChange = (e: any) => {
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
          organizationId: data?.organizationId as any,
        });

        if (data?.organizationId) {
          setIsLocked(true);
        }
      }
    } else if (name === "organizationName") {
      // Handle organization change manually if needed
      const data = organization.find((element) => element.id == finalValue);
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
          organizationId: borrowingData.organizationId,
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
                      if (type.showCreateNew) {
                        emptiedBorrower();
                        setIsLocked(false);
                      }
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
                selected={() => {
                  const data = organizationList.find(
                    (item) =>
                      item.displayName == borrowingData.organizationName,
                  );
                  if (data == undefined) {
                    return;
                  }
                  return (
                    <Option
                      key={data.id}
                      value={data.id.toString() || ""}
                      className="custom-select bg-gray-200 hover:bg-white"
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
                disabled={isLocked}
                label="Organization Name"
                value={borrowingData.organizationName || ""}
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
                      if (type.showCreateNew) {
                        emptiedOrganization();
                      }
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
                    value={borrowingData.organizationName || ""}
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
              value={borrowingData?.dueDate?.toString() || ""}
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
