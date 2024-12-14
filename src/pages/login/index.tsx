import React from "react";

import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function UserLoginPage() {
  return (
    <section className="px-8">
      <div className="container mx-auto h-screen grid place-items-center">
        <Card
          shadow={false}
          className="md:px-16 md:py-12 py-8 border border-gray-300"
        >
          <CardHeader shadow={false} floated={false} className="text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:text-4xl"
            >
              PASAINS
            </Typography>
          </CardHeader>
          <CardBody>
            <form action="#" className="flex flex-col gap-4 md:mt-2">
              <div className="mb-4">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium mb-2"
                  >
                    Your Email
                  </Typography>
                </label>
                <Input
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="name@mail.com"
                  className="w-[280px] placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium my-2"
                  >
                    Password
                  </Typography>
                </label>
                <Input
                  id="password"
                  color="gray"
                  size="lg"
                  type="password"
                  name="password"
                  placeholder="password"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <Button size="lg" color="blue" fullWidth>
                Log in
              </Button>
              <Typography
                variant="small"
                className="text-center pt-10 mx-auto max-w-[19rem] !font-medium !text-gray-600"
              >
                © 2024 Pasains
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default UserLoginPage();
