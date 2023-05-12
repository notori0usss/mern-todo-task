import React from "react";

interface InputProps {
  id?: string;
  onChange: any;
  value: string;
  placeholder: string;
  type?: string;
}
const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  placeholder,
  type,
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="p-3 rounded-md w-full text-gray-600 font-semibold outline-normal"
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default Input;
