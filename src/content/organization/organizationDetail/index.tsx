import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "../../../container/pagination";
import { useOrganizationDetail } from "../../../hooks/organization/organizationDetail";
import UpperTableDetail from "../../../container/upperTableDetail";
import TimedAlert from "../../../container/alert";
import DeleteAlert from "../../../container/deleteAlert";
import useDebounceRef from "../../../hooks/debounceRef";

export function OrganizationDetailContent() {
  const {
    id,
    organizationDetail,
    organizationList,
    success,
    openAlert,
    handleSearch,
    handleDownload,
    handleDelete,
    handleCloseAlert,
    handleConfirmDelete,
    page,
    totalPage,
    setPage,
  } = useOrganizationDetail();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const tableHead = [
    { titleHead: "Borrower Name", accessor: "borrowerName" },
    { titleHead: "Identity Card", accessor: "identityCard" },
    { titleHead: "Identity Number", accessor: "identityNumber" },
    { titleHead: "Phone Number", accessor: "phoneNumber" },
    { titleHead: "" },
  ];
  const debouncedSearch = useDebounceRef(async (query: string) => {
    const result = await handleSearch(query);
    console.log(result);
  }, 500);
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  const handleEditClick = (borrowerId: number) => {
    setIsEditing(true);
    navigate(`/borrower/update/${borrowerId}`);
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
    <div>
      {id && (
        <section>
          <div>
            <UpperTableDetail
              pageTitle={`Borrower list`}
              titleName="Organization Name :"
              name={organizationDetail.organizationName}
              titleAddress="Address :"
              handleDownload={handleDownloadButton}
              address={organizationDetail.address}
              titleStatus="Organization Status :"
              status={organizationDetail.organizationStatus}
              titleNote="Note :"
              note={organizationDetail.note}
              createTitle={"CREATE BORROWER"}
              createLink={`/borrower/create`}
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
                  {organizationList.map((items) => (
                    <tr key={items.id}>
                      <td className={`px-4 py-3 `}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {items.borrowerName}
                        </Typography>
                      </td>
                      <td className={`px-4 py-3 bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {items.identityCard}
                        </Typography>
                      </td>
                      <td className={`px-4 py-3 `}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {items.identityNumber}
                        </Typography>
                      </td>
                      <td className={`px-4 py-3 bg-blue-gray-50/50`}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {items.phoneNumber}
                        </Typography>
                      </td>
                      <td className={`px-4 py-3 border-b border-blu-gray-50`}>
                        <div className="mx-auto text-center">
                          <button
                            onClick={(e) => {
                              handleEditClick(items.id);
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
                              handleDelete(items.id);
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
                        </div>
                      </td>
                    </tr>
                  ))}
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
          </div>
        </section>
      )}
    </div>
  );
}
