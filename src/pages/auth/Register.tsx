import { useForm } from "react-hook-form";
import { TextInput } from "../../components/form/Input";
import { InputType } from "../../components/form/Input.contract";
import { FormLabel } from "../../components/form/Label";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import type { IOutletContext } from "../../lib/types/GlobalTypes";
import { useNavigate, useOutletContext } from "react-router";
import type { IRegsiterData } from "../../lib/types/AuthTypes";
import { RegisterDTO } from "../../lib/dto/AuthDTO";
import axiosInstance from "../../lib/config/Axios";
import { toast } from "sonner";


export default function RegisterPage() {
  const {setPageData} = useOutletContext<IOutletContext>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<IRegsiterData>({
    defaultValues: { fullName: "", email: "", phone: "", password: "", confirmPassword: "" },
    resolver: zodResolver(RegisterDTO)
  });


  // API Call for Registration
  const register = async (data: IRegsiterData) => {
    setIsLoading(true);

    try {
      const payload = {
        username: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password
      };

      console.log("Sending registration request:", payload);

      const response = await axiosInstance.post("/auth/register", payload);

      console.log("Registered:", response);

      toast.success("Registration successful!");

      //Reset the form
      reset();

      //Redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error: any) {
      console.error("Registration failed:", error);

      // Show error toast
      if (error?.code === 400) {
        toast.error("Registration failed: " + error?.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handelCancel = () => {
    reset();
    navigate("/");
  }

  useEffect(() => {
    setPageData({
      title: "EMS-Register",
      message:
        "Work Smarter, Manage Better..",
      button: {
        url: "/",
        text: "Login",
      },
    });
  }, [])


  return (
    <>
      <div className="w-full bg-gray-100">
        <div className="my-20 w-full px-20 flex flex-col gap-10">
          <h1 className="text-4xl text-semibold text-center">Register Form</h1>
          <form
            onSubmit={handleSubmit(register)}
            className="flex flex-col gap-5"
          >
            <div className="flex gap-2">
              <FormLabel htmlFor="fullName" labelText="Full Name: "></FormLabel>
              <div className="w-2/3">
                <TextInput
                  name="fullName"
                  type={InputType.TEXT}
                  control={control}
                  errMsg={errors?.fullName?.message}
             
                />
              </div>
            </div>
            <div className="flex gap-2">
              <FormLabel htmlFor="email" labelText="Email: "></FormLabel>
              <div className="w-2/3">
                <TextInput
                  name="email"
                  type={InputType.EMAIL}
                  control={control}
                  errMsg={errors?.email?.message}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <FormLabel htmlFor="phone" labelText="Phone: "></FormLabel>
              <div className="w-2/3">
                <TextInput
                  name="phone"
                  type={InputType.TEXT}
                  control={control}
                  errMsg={errors?.phone?.message}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <FormLabel htmlFor="password" labelText="Password: "></FormLabel>
              <div className="w-2/3">
                <TextInput
                  name="password"
                  type={InputType.PASSWORD}
                  control={control}
                  errMsg={errors?.password?.message}
              
                />
              </div>
            </div>
            <div className="flex gap-2">
              <FormLabel
                htmlFor="confirmPassword"
                labelText="Re-Password: "
              ></FormLabel>
              <div className="w-2/3">
                <TextInput
                  name="confirmPassword"
                  type={InputType.PASSWORD}
                  control={control}
                  errMsg={errors?.confirmPassword?.message}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handelCancel}
                disabled={isLoading}
                className="disabled:cursor-not-allowed disabled:bg-red-700/50 w-full hover:bg-red-700 bg-red-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="disabled:cursor-not-allowed disabled:bg-teal-700/50 w-full hover:bg-teal-700 bg-teal-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer "
              >
                {isLoading ? (
                  <>
                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                   Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            {/* Login Link
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                Login here
              </button>
            </p>
          </div> */}
          </form>
        </div>
      </div>
    </>
  );
}