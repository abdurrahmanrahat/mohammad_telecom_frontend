"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import Container from "@/components/shared/Ui/Container";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { z } from "zod";

const userSignUpSchema = z.object({
  name: z.string().min(1, "Enter name"),
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

const SignUpPage = () => {
  const handleSignUp = async (values: FieldValues) => {
    console.log(values);
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
                  <MTInput name="password" />
                </div>
              </div>

              <div className="mt-2 w-full">
                <Button className="h-11 cursor-pointer w-full" type="submit">
                  Sign Up
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
