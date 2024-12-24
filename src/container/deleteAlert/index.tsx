import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const DeleteAlert = ({
  open,
  handleClose,
  handleConfirm,
}: any) => {
  return (
      <Dialog open={open} handler={handleClose}>
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button color="gray" onClick={handleClose}>
            No
          </Button>
          <Button color="red" onClick={handleConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
  );
};

export default DeleteAlert;
