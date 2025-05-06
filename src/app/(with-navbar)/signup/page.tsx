"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import Container from "@/components/shared/Ui/Container";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { loginUser } from "@/services/actions/loginUser";
import { registerUser } from "@/services/actions/registerUser";
import { storeUserInfo } from "@/services/auth.services";
import { decodedToken } from "@/utils/jwt";
import axios from "axios";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const userSignUpSchema = z.object({
  name: z.string().min(1, "Enter name"),
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSignUp = async (values: FieldValues) => {
    setIsLoading(true);
    try {
      const res = await registerUser(values);

      if (res.success) {
        // auto login after user register
        const userRes = await loginUser({
          email: values.email,
          password: values.password,
        });

        if (userRes.success) {
          const user = decodedToken(userRes.data.accessToken);

          dispatch(setUser({ user, token: userRes.data.accessToken }));
          storeUserInfo({ accessToken: userRes.data.accessToken });
          // 🎯 Set HttpOnly cookie from client via API
          await axios.post("/api/auth/set-cookies", {
            accessToken: userRes.data.accessToken,
          });

          toast.success(res.message);

          setIsLoading(false);
          router.push("/");
        }
      } else {
        toast.error(res.message || "Something went wrong!");

        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Container className="max-w-md">
        <div className="flex flex-col justify-center space-y-6 shadow-cardLightShadow rounded-md p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Moh. Telecom</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create an account
            </h1>
            <p className="text-muted-foreground">
              Enter your details to sign up for an account
            </p>
          </div>

          <MTForm
            onSubmit={handleSignUp}
            schema={userSignUpSchema}
            defaultValues={{
              name: "",
              email: "",
              password: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="grid gap-1">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>

                  <MTInput name="name" />
                </div>

                <div className="grid gap-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>

                  <MTInput
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="grid gap-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <MTInput name="password" type="password" />
                </div>
              </div>

              <div className="mt-2 w-full">
                <Button className="h-11 cursor-pointer w-full" type="submit">
                  {isLoading ? (
                    <span className="flex gap-2">
                      <LoaderSpinner /> <span>Signing...</span>
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </div>
          </MTForm>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/90">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
