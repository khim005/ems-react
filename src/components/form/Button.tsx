import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "primary" | "secondary" | "success" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  ...props
}) => {
  const baseStyle =
    "w-full cursor-pointer py-2 font-bold rounded-md transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {title}
    </button>
  );
};

export default Button;
