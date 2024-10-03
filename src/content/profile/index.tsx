import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Typography,
} from "@material-tailwind/react";
import { List, ListItem } from "flowbite-react";
import { useUsers } from "../../hooks/profile";

export function ProfileContent() {
  const { users } = useUsers();
  const data = [
    "Name",
    "username",
    "Phone Number",
    "Address",
    "Email",
    "Position",
  ];
  return (
    <div key={users.id} className="flex w-full">
      <Card className="mt-14 ml-14 w-1/3" color="white">
        <img
          className="z-1 h-96 w-96 my-5 rounded-full object-cover object-center items-center mx-auto justify-center"
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="profile user"
        />
        <CardBody>
          <List className="space-y-4 text-black">
            <ListItem className="text-center">{users.userName}</ListItem>
            <ListItem className="text-center">{users.role}</ListItem>
          </List>
        </CardBody>
        <CardFooter className="pt-0 items-center mx-auto">
          <Button color={users.isActive ? "blue" : "gray"}>
            {users.isActive ? "Active" : "Non Active"}
          </Button>
        </CardFooter>
      </Card>
      <Card className="mt-14 ml-10 mr-14 w-2/3 p-6" color="white">
        <Typography variant="h5">Detail User</Typography>
        <table className="flex w-full min-w-max text-left">
          <thead>
            <tr>
              {data.map((data) => (
                <th key={data} className="flex flex-row p-8">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {data}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="flex flex-col space-y-2">
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal p-6"
                >
                  {": " + users.firstName + " " + users.lastName}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal p-6"
                >
                  {": " + users.userName}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal p-6"
                >
                  {": " + users.phoneNumber}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal p-6"
                >
                  {": " + users.address}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal p-6"
                >
                  {": " + users.email}
                </Typography>
              </td>
              <td>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal p-6"
                >
                  {": " + users.position}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="place-items-center mx-auto mt-5">
          <Button>Edit</Button>
        </div>
      </Card>
    </div>
  );
}
