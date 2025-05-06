"use client";

import GoogleAuthWrapper from "@/components/common/Login/GoogleAuthWrapper";
import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import Container from "@/components/shared/Ui/Container";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { loginUser } from "@/services/actions/loginUser";
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

const userLoginSchema = z.object({
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    console.log(values);
    setIsLoading(true);
    try {
      const res = await loginUser(values);

      if (res.success) {
        const user = decodedToken(res.data.accessToken);

        dispatch(setUser({ user, token: res.data.accessToken }));

        storeUserInfo({ accessToken: res.data.accessToken });
        // 🎯 Set HttpOnly cookie from client via API
        await axios.post("/api/auth/set-cookies", {
          accessToken: res.data.accessToken,
        });

        toast.success(res.message);

        setIsLoading(false);
        router.push("/");
      } else {
        toast.error(res.message || "Something went wrong!");

        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
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
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <MTForm
            onSubmit={handleLogin}
            schema={userLoginSchema}
            defaultValues={{
              email: "",
              password: "",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
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
                    "Sign In"
                  )}
                </Button>
              </div>
            </div>
          </MTForm>

          <GoogleAuthWrapper />

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
}
