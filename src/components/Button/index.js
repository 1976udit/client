// import react from "react";

const Button = ({
  lable = "Button",
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/2 mt-2 p-2.5 text-center ${className}`}
      disabled={disabled}
    >
      {lable}
    </button>
  );
};

export default Button;
