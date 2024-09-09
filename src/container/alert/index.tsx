import React, { useState, useEffect, ReactElement } from "react";
import { Alert } from "@material-tailwind/react";

interface TimedAlertProps {
  message: string | null;
  duration?: number;
  color?: "blue" | "red" | "green" | "yellow";
}

const TimedAlert: React.FC<TimedAlertProps> = ({
  message,
  duration = 3000,
  color = "blue",
}): ReactElement | null => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4">
      <Alert color={color} className="w-96">
        {message}
      </Alert>
    </div>
  );
};

export default TimedAlert;

