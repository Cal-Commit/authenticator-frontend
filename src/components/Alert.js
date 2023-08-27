import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

function Icon() {
  return <InformationCircleIcon className="h-6 w-6" />;
}

export function AlertIcon({msg}) {
  return (
    <Alert icon={<Icon />}>{msg}</Alert>
  );
}
