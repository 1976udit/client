import React from "react";

const Input = ({
  lable = "",
  name = "",
  type = "text",
  className = "",
  inputClassName = "",
  isRequired = false,
  placeholder = "Enter Data...",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className={`${className}`}>
      <lable
        for={name}
        className="block mb-1 mt-2 text-sm font-medium text-gray-900 "
      >
        {lable}
      </lable>
      <input
        type={type}
        id={name}
        className={`bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm block w-full p-2.5 ${inputClassName}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
};

export default Input;
