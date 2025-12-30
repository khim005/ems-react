import React, { useState } from "react";
import { LoginFormFields } from "../../components/form/Input.contract";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";


const Login: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="flex items-center justify-center"> 
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="text-black">Login</span> {" "}
          <span className="text-orange-400">here</span>
        </h2>
        {LoginFormFields.map((field) => (
          <div key={field.name} className="mb-4">
            <Label htmlFor={field.name} text={field.label} />
            <Input 
            id={field.name}
            name={field.name}
            type={field.type === "password" && showPassword? "text": field.type}
            placeholder={field.placeholder}
            required={field.required}
            onChange={handleChange}
            showToggle={field.type === "password"}
            isVisible= {showPassword}
            onToggle={() => setShowPassword(!showPassword)}
            />
          </div>
        ))}

        <Button type="submit" title="Login"/>
      </form>
    </div>
  );
};

export default Login;