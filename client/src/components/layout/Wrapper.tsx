import React, { ReactNode } from "react";
interface WrapperProps {
  children: ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <section className={"max-w-7xl mx-auto px-16 py-10"}>{children}</section>
  );
};
export default Wrapper;
