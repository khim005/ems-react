import { useForm } from "react-hook-form"
import { TextInput } from "../../components/form/Input"
import { InputType } from "../../components/form/Input.contract"
import { FormLabel } from "../../components/form/Label"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useNavigate, useOutletContext } from "react-router";
import { useAuth } from "../../lib/hooks/useAuth"
import { useEffect, useState } from "react"
import type { IOutletContext } from "../../lib/types/GlobalTypes"
import type { ICredentials } from "../../lib/types/AuthTypes"
import { LoginDTO } from "../../lib/dto/AuthDTO";


export default function LoginPage() {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { setPageData } = useOutletContext<IOutletContext>();


  useEffect(() => {
    setPageData({
      title: "EMS-Login",
      message:
        "Work Smarter, Manage Better..",
      button: {
        url: "/register",
        text: "Register",
      },
    });
  }, []);

  const { handleSubmit, control, formState: { errors } } = useForm<ICredentials>({
    defaultValues: { email: "", password: "" }, resolver: zodResolver(LoginDTO)
  });


  const navigate = useNavigate();

  const loginEvent = async (credentials: ICredentials) => {
     if (isLoading) return;
    setIsLoading(true);
    try {
      console.log("=== LOGIN ATTEMPT START ===");
      //Api call to login
      await login(credentials);
      console.log("Login response received:", login);
      // Fetch logged in user profile
      console.log("Fetching user profile...");
      // const loggedInUser = await getLoggedInUserProfile();
      console.log("Login successful for user:");

      toast.success("Login successful!");

 
        navigate("/admin");

    } catch (error: any) {
      console.error("=== LOGIN ERROR ===");
      console.error("Error object:", error);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      console.error("Error response:", error.response);

      let errorMessage = "Please check your email and password and try again.";

      if (error?.response?.data?.msg) {
        errorMessage = error.response.data.msg
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.code === 401) {
        errorMessage = "Unauthorized access. Please check your credentials.";
      } else if (error?.code === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error("Login failed", {
        description: errorMessage,
      });


    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  }

  return (
    <>
      <div className="w-full bg-gray-100">
        <div className="my-20 w-full px-20 flex flex-col gap-20">
          <h1 className="text-4xl text-semibold text-center">Login Form</h1>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(loginEvent)}
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
              <button 
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
              className="w-full hover:bg-red-700 bg-red-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer ">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full hover:bg-teal-700 bg-teal-600 p-2 rounded-md text-white transition hover:scale-96 cursor-pointer "
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> 
                      Loading in...
                    </>
                  ) : (
                    "Login"
                  )}
                 
              </button>
            </div>
            {/* Registration link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                Register here
              </button>
            </p>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}