"use client";

import { Button } from "@progress/kendo-react-buttons";
import { Typography } from "@progress/kendo-react-common";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <Typography.h3>Welcome to Pulumi Powered Platform</Typography.h3>

      <Button themeColor="primary" onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
}
