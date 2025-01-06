import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
  EnvelopeIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithBurgerMenu() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const users = { id: 1 };

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer} color="white">
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Link to="/">
              <img
                src={require("../../image/logo-pasains.png")}
                alt="logopasains"
                className="size-16 object-contain"
              />
            </Link>
            <Typography variant="h5" color="black">
              PASAINS
            </Typography>
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="black" className="mr-auto font-normal">
                    Inventory
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-2">
                  <NavLink to="/inventory" className="py-2">
                    Inventory List
                  </NavLink>
                  <NavLink to="/inventorytype" className="py-2">
                    Inventory Type
                  </NavLink>
                  <NavLink to="/inventorygroup" className="py-2">
                    Inventory Group
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="black" className="mr-auto font-normal">
                    Borrow
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-2">
                  <NavLink to="/borrowing" className="py-2">
                    Borrowing
                  </NavLink>
                  <NavLink to="/borrower" className="py-2">
                    Borrower
                  </NavLink>
                  <NavLink to="/organization" className="py-2">
                    Organization
                  </NavLink>
                </List>
              </AccordionBody>
            </Accordion>
            <hr className="my-2 border-black-50" />
            <ListItem
              onClick={() => {
                navigate(`/user/profile/${users.id}`);
              }}
            >
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <EnvelopeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Message
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ArrowUpTrayIcon className="h-5 w-5" />
              </ListItemPrefix>
              Post
            </ListItem>
            <ListItem
              onClick={() => {
                localStorage.removeItem("access_token");
                navigate(`/login`);
              }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
