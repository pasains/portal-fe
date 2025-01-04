import React from "react";
import { useNavigate } from "react-router-dom";

const UpperTableDetail = ({
  pageTitle,
  handleDownload,
  titleName,
  titleDescription,
  titleAddress,
  address,
  titleStatus,
  titleNote,
  description,
  name,
  status,
  note,
  createTitle,
  createLink,
}: any) => {
  const navigate = useNavigate();
  return (
    <div className="relative z-0 flex flex-col w-full h-full text-black bg-white shadow-md bg-clip-border">
      <div className="relative mx-4 my-5 overflow-hidden text-black bg-white rounded-none bg-clip-border">
        <div className="flex flex-col justify-between gap-8 md:flex-row ">
          <div className="space-y-1">
            <h1 className="font-semibold leading-snug tracking-normal text-slate-800 mb-2 w-full text-xl max-w-lg lg:max-w-2xl lg:text-3xl">
              {pageTitle}
            </h1>
            <h2>
              <p className="font-bold leading-snug tracking-normal text-slate-800 w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                {titleName}{" "}
                <span className="font-light leading-snug tracking-normal uppercase text-slate-800 mx-auto w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                  {name}
                </span>
              </p>
            </h2>
            <h3>
              <p className="font-bold leading-snug tracking-normal text-slate-800 w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                {titleDescription}{" "}
                <span className="font-light leading-snug tracking-normal text-slate-800 mx-auto w-72 text-sm max-w-xs lg:max-w-md lg:text-lg">
                  {description}
                </span>
              </p>
            </h3>
            <h3>
              <p className="font-bold leading-snug tracking-normal text-slate-800 w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                {titleAddress}{" "}
                <span className="font-light leading-snug tracking-normal uppercase text-slate-800 mx-auto w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                  {address}
                </span>
              </p>
            </h3>
            <h4>
              <p className="font-bold leading-snug tracking-normal text-slate-800 w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                {titleStatus}{" "}
                <span className="font-light leading-snug tracking-normal text-slate-800 mx-auto w-72 text-sm max-w-xs lg:max-w-md lg:text-lg">
                  {status}
                </span>
              </p>
            </h4>
            <h5>
              <p className="font-bold leading-snug tracking-normal text-slate-800 w-full text-sm max-w-xs lg:max-w-md lg:text-lg">
                {titleNote}{" "}
                <span className="font-light leading-snug tracking-normal text-slate-800 mx-auto w-72 text-sm max-w-xs lg:max-w-md lg:text-lg">
                  {note}
                </span>
              </p>
            </h5>
          </div>
          <div className="flex flex-col h-10 pt-2 items-end w-full gap-3 shrink-0 md:w-max">
            <button
              onClick={() => {
                navigate(createLink);
              }}
              className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-3 h-3"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
              </svg>
              {createTitle}
            </button>
            <button
              className="flex select-none items-center w-fit gap-3 rounded-lg bg-gray-900 py-3 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleDownload}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                ></path>
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpperTableDetail;
