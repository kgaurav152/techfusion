import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// interface Props {
//   isSubmitting : boolean;
//   children : any,
//   type? : "submit" | "reset" | "button" | undefined,
//   className? : string
// }
const LoaderButton = ({ children, isSubmitting, className, type }) => {
  return (
    <Button className={className} disabled={isSubmitting} type={type}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoaderButton;
