import React from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const UpperTableDetail = ({
  handleDownload,
  handleInputSearch,
  searchQuery,
  pageTitle,
  descriptionPageTitle,
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
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h4" color="blue-gray">
              {pageTitle}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {descriptionPageTitle}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              onClick={() => navigate(createLink)}
              size="md"
            >
              <PencilIcon strokeWidth={2} className="h-4 w-4" /> {createTitle}
            </Button>
            <Button
              className="flex items-center gap-3"
              onClick={handleDownload}
              size="md"
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col w-full md:w-72">
            <Typography color="gray" className="mt-1 font-normal">
              <span className="font-semibold">{titleName} </span>
              {name}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              <span className="font-semibold">{titleDescription} </span>
              {description}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              <span className="font-semibold">{titleAddress} </span>
              {address}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              <span className="font-semibold">{titleStatus} </span>
              {status}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              <span className="font-semibold">{titleNote} </span>
              {note}
            </Typography>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleInputSearch}
            />
          </div>
        </div>
      </CardHeader>
    </div>
  );
};
export default UpperTableDetail;
