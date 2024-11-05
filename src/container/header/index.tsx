import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { Avatar } from "flowbite-react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../sidebar";

const Heading: React.FC = () => {
  const  users  = {id: 1, userName:"mecinsusi", role: "ADMIN"};
  const navigate = useNavigate();
  return (
    <main className="bg-black w-full fixed top-0 z-9999">
      <main className="flex">
        <section className="flex w-1/3 items-center p-4">
          <SidebarWithBurgerMenu />
        </section>
        <section className="w-1/3 content-center p-4">
          <Input
            size="lg"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            label="Search"
            color="white"
          />
        </section>
        <section className="flex w-1/3 justify-end p-4 items-center gap-6 text-white">
          <div className="size-6">
            <EnvelopeIcon />
          </div>
          <div className="size-6">
            <BellIcon />
          </div>
          <div className="flex items-center gap-4">
            <Avatar
              onClick={() => {
                navigate(`/user/profile/${users.id}`);
              }}
              img="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              rounded={true}
            />
            <div>
              <Typography variant="h6">{users.userName}</Typography>
              <Typography variant="small" className="font-normal">
                {users.role}
              </Typography>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};
export default Heading;
