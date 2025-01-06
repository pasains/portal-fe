import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Typography } from "@material-tailwind/react";
import useBorrowing, {
  BorrowingProps,
  Status,
} from "../../../hooks/borrowing/borrowingList";
import UpperTable from "../../../container/upperTable";
import { Pagination } from "../../../container/pagination";
import DeleteAlert from "../../../container/deleteAlert";
import TimedAlert from "../../../container/alert";

export function BorrowingContent() {
  const {
    borrowing,
    openAlert,
    page,
    totalPage,
    success,
    setPage,
    handleSearch,
    handleDownload,
    handleDelete,
    handleConfirmDelete,
    handleCloseAlert,
  } = useBorrowing();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const tableHead = [
    { titleHead: "Borrower Name", accessor: "borrowerName" },
    { titleHead: "Organization Name", accessor: "organizationName" },
    { titleHead: "Address", accessor: "address" },
    { titleHead: "Identity Card", accessor: "identityCard" },
    { titleHead: "Identity Number", accessor: "identityNumber" },
    { titleHead: "Phone Number", accessor: "phoneNumber" },
    { titleHead: "Status", accessor: "status" },
    { titleHead: "Special Instruction", accessor: "specialInstruction" },
    { titleHead: "Due Date", accessor: "dueDate" },
    { titleHead: "" },
  ];
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const result = await handleSearch(e.target.value);
    console.log(result);
  };

  const handleEditClick = (id: any) => {
    setIsEditing(true);
    navigate(`/borrowing/${id}`);
  };
  const handlePageChange = (newPage: number) => {
    console.log("Page changed to:", newPage);
    setPage(newPage);
  };
  const handleDownloadButton = async () => {
    setClicked(true);
    const result = await handleDownload();
    window.location.reload();
    console.log(result);
  };

  return (
    <section>
      <UpperTable
        pageTitle={"Borrowing list"}
        description="List of borrowing."
        createTitle={"CREATE BORROWING"}
        createLink={`/borrowing/create`}
        handleDownload={handleDownloadButton}
        handleInputSearch={handleSearchChange}
        searchQuery={searchQuery}
      />
      <div className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head.accessor}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 py-5 px-4"
                >
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {head.titleHead}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {borrowing.map((item: BorrowingProps, index) => {
              const isLast = index === borrowing.length - 1;
              const classes = isLast
                ? "py-3 px-4"
                : "py-3 px-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={item.id}
                  onClick={() => {
                    navigate(`/borrowing/${item.id}`);
                  }}
                  className="cursor-pointer hover:bg-blue-gray-50"
                >
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.borrowerName}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.organizationName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.address}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.identityCard}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.identityNumber}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.phoneNumber}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      size="sm"
                      variant="ghost"
                      value={item.status === Status.DONE ? "DONE" : "PENDING"}
                      color={item.status === Status.DONE ? "green" : "red"}
                      className="w-fit items-center mx-auto"
                    ></Chip>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.specialInstruction}
                    </Typography>
                  </td>
                  <td className={`${classes}`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {item.dueDate
                        ? new Date(item.dueDate).toLocaleDateString()
                        : "Invalid Date"}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <div className="mx-auto text-center">
                      <button
                        onClick={(e) => {
                          handleEditClick(item.id);
                          e.stopPropagation(); // Stop the event from propagating to the parent
                        }}
                        disabled={isEditing}
                        className="relative z-9999 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            className="w-4 h-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(item.id);
                          e.stopPropagation(); // Stop the event from propagating to the parent
                        }}
                        className="relative z-9999 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                      <div className="fixed z-9999 top-10 right-10">
                        {success && (
                          <TimedAlert
                            message={success}
                            duration={5000}
                            color="green"
                          />
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="fixed z-9999 top-10 right-10">
          {success && (
            <TimedAlert message={success} duration={5000} color="green" />
          )}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
        <DeleteAlert
          open={openAlert}
          handleClose={handleCloseAlert}
          handleConfirm={handleConfirmDelete}
        />
      </div>
    </section>
  );
}
