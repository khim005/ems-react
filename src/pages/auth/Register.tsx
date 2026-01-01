import { useForm } from "react-hook-form";
import { TextInput } from "../../components/form/Input";
import { InputType } from "../../components/form/Input.contract";
import { FormLabel } from "../../components/form/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../lib/config/Axios";
import { useEffect } from "react";
import type { IOutletContext } from "../../lib/types/GlobalTypes";
import { useOutletContext } from "react-router";
import type { IRegsiterData } from "../../lib/types/AuthTypes";
import { RegisterDTO } from "../../lib/dto/AuthDTO";


export default function RegisterPage() {
  const {setPageData} = useOutletContext<IOutletContext>()

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { fullName: "", email: "", phone: "", password: "", confirmPassword: "" },
    resolver: zodResolver(RegisterDTO)
  });


  // Api
  const register = async (data: IRegsiterData) => {
    try {
      const payload = {
        username: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password
      };

      const response = await api.post("/auth/register", payload);

      console.log("Registered:", response.data);

      alert("Registration successful!");

      //  redirect to login page
      // Navigate("/login");

    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.msg ||
        error?.response?.data?.error ||
        "Registration failed"
      );
    }
  };


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
                onClick={() => reset()}
                className="disabled:cursor-not-allowed disabled:bg-red-700/50 w-full hover:bg-red-700 bg-red-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="disabled:cursor-not-allowed disabled:bg-teal-700/50 w-full hover:bg-teal-700 bg-teal-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer "
              >
                Register
              </button>
            </div>
          </form>

          {isSubmitting ? "Loading" : "/"}
        </div>
      </div>
    </>
  );
}