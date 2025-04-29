import { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-[90%] max-w-[1240px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;
