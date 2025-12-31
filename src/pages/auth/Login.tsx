import { useForm } from "react-hook-form"
import { TextInput } from "../../components/form/Input"
import { InputType } from "../../components/form/Input.contract"
import { FormLabel } from "../../components/form/Label"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axiosInstance from "../../lib/config/Axios"
import { toast } from "sonner"
import { useNavigate, useOutletContext } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth"
import { useEffect } from "react"
import type { IOutletContext } from "../../lib/types/GlobalTypes"
import type { ICredentials } from "../../lib/types/AuthTypes"

// interface ICredentials{
//   email: string, 
//   password: string
// }

//valitation msg
const LoginDTO = z.object({
  email: z.string().min(2, "Email Rquired").nonempty(),
  password: z.string().min(2, "Password Required").nonempty(),
})

export default function LoginPage() {
  const { login, getLoggedInUserProfile } = useAuth()

  const { setPageData } = useOutletContext<IOutletContext>();
  useEffect(() => {
    setPageData({
      title: "Login Page",
      message:
        "Lorem , doloremque modi.",
      button: {
        url: "/register",
        text: "Register",
      },
    });
  }, []);

  const { handleSubmit, control, formState: { errors } } = useForm<ICredentials>({
    defaultValues: { email: "", password: "" }, resolver: zodResolver(LoginDTO)
  });
  // api call 
  const navigate = useNavigate();

  const loginEvent = async (credentials: ICredentials) => {
    try {
      await login(credentials);
      const userProfile = await getLoggedInUserProfile();

      // store user profile in local storage
      localStorage.setItem("user", JSON.stringify(userProfile));
      const response = await axiosInstance.post("/auth/login", credentials);

      const { token } = response.data;

      // web store token
      localStorage.setItem("token", token);

      toast.success("Login successful!");

      // ✅ redirect after login
      navigate("/dashboard");

    } catch (error: any) {
      console.error(error);

      toast.error("Login failed", {
        description:
          error?.response?.data?.msg ||
          "Please check your email and password"
      });
    }
  };

  return (
    <>
      <div className="w-full bg-gray-100">
        <div className="my-20 w-full px-20 flex flex-col gap-20">
          <h1 className="text-4xl text-semibold text-center">Login Form</h1>

          <form
            className="flex flex-col gap-5"
          >
            <div className="flex w-full">
              <FormLabel labelText="Email: " htmlFor="email" />
              <div className="w-2/3">
                <TextInput
                  name="email"
                  control={control}
                  type={InputType.EMAIL}
                  errMsg={errors?.email?.message}
                  placeholder="Enter your Email...."
                  className="rounded-full px-5 py-3"
                />
              </div>
            </div>

            <div className="flex w-full">
              <FormLabel labelText="Password: " htmlFor="password" />
              <div className="w-2/3">
                <TextInput
                  type={InputType.PASSWORD}
                  placeholder="Enter your Password..."
                  name="password"
                  control={control}
                  errMsg={errors?.password?.message}
                  className="rounded-full px-5 py-3"
                />
              </div>
            </div>

            <div className="flex w-full gap-5">
              <button className="w-full hover:bg-red-700 bg-red-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer ">
                Cancel
              </button>
              <button
                type="submit"
                 onSubmit={handleSubmit(loginEvent)}
                className="w-full hover:bg-teal-700 bg-teal-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer ">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}