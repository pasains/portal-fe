import React, { useState } from "react";
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

const UpperTable = ({
  pageTitle,
  description,
  handleInputSearch,
  createTitle,
  createLink,
  handleDownload,
  searchQuery,
}: any) => {
  const navigate = useNavigate();

  return (
    <div className="relative z-0 flex flex-col w-full h-full text-black bg-white shadow-md bg-clip-border">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h4" color="blue-gray">
              {pageTitle}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {description}
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleInputSearch}
              />
            </div>
            <Button
              className="flex items-center gap-3 bg-black"
              onClick={() => navigate(createLink)}
              size="sm"
            >
              <PencilIcon strokeWidth={2} className="h-4 w-4" /> {createTitle}
            </Button>
            <Button
              className={`flex items-center gap-3 bg-black`}
              onClick={handleDownload}
              size="sm"
            >
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
    </div>
  );
};
export default UpperTable;
