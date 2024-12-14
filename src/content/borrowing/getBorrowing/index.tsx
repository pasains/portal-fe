import { Input, Typography, Chip } from "@material-tailwind/react";
import { useItemDetail } from "../../../hooks/item/itemDetail";

export function BorrowingDetail() {
  const { borrowingDetail } = useItemDetail();

  return (
    <div className="w-[520px] mx-auto items-center">
      <section className="p-5 mb-10 my-auto items-center border border-b rounded-lg">
        <label>
          <Typography className="mb-2" variant="h6">
            Borrower Name
          </Typography>
          <Input
            className="w-full uppercase"
            color="orange"
            label="Borrower Name"
            type="string"
            variant="outlined"
            size="md"
            disabled={true}
            value={borrowingDetail.borrowerName}
          />
        </label>
        <br />

        <label>
          <Typography className="mb-2" variant="h6">
            Identity Card
          </Typography>
          <Input
            className="w-full uppercase"
            color="orange"
            label="Identity Card"
            type="string"
            variant="outlined"
            size="md"
            disabled={true}
            value={borrowingDetail.identityCard}
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
            type="string"
            label="Identity Number"
            size="md"
            disabled={true}
            variant="outlined"
            value={borrowingDetail.identityNumber}
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
            type="string"
            label="Phone Number"
            size="md"
            disabled={true}
            variant="outlined"
            value={borrowingDetail.phoneNumber}
          />
        </label>
        <br />

        <label>
          <Typography className="mb-2" variant="h6">
            Organization Name
          </Typography>
          <Input
            className="w-full uppercase"
            color="orange"
            type="string"
            size="md"
            label="Organization Name"
            disabled={true}
            variant="outlined"
            value={borrowingDetail.organizationName}
          />
        </label>
        <br />

        <label>
          <Typography className="mb-2" variant="h6">
            Address
          </Typography>
          <Input
            className="w-full uppercase"
            color="orange"
            label="Address"
            type="text"
            variant="outlined"
            size="md"
            disabled={true}
            value={borrowingDetail.address}
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
            type="text"
            variant="outlined"
            size="md"
            disabled={true}
            value={
              borrowingDetail?.dueDate
                ? `${new Intl.DateTimeFormat("en-US", {
                    weekday: "long",
                  }).format(
                    new Date(borrowingDetail.dueDate),
                  )}, ${new Date(borrowingDetail.dueDate).toISOString().split("T")[0]}`
                : ""
            }
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
            variant="outlined"
            size="md"
            disabled={true}
            value={borrowingDetail.specialInstruction}
          />
        </label>
        <br />

      </section>
    </div>
  );
}
