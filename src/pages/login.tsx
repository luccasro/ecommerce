import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { buildUrlApi } from "@/utils/buildUrlApi";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    let userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const confirmPassword = formData.get("confirmPassword");

    if (userData.password !== confirmPassword) {
      return toast({
        title: "Something went wrong!",
        description: "Your passwords don't match.",
        variant: "destructive",
      });
    }

    const apiUrl = buildUrlApi({
      path: "/api/user/create",
    });

    try {
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await login(userData.email as string, userData.password as string);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Failed", error);
      toast({
        title: "Something went wrong!",
        description: "There was a problem creating your account!",
        variant: "destructive",
      });
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    await login(
      formData.get("email") as string,
      formData.get("password") as string
    );
  };

  const login = async (email: string, password: string) => {
    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
      redirect: false,
    });

    if (res?.error) {
      setIsSubmitting(false);
      return toast({
        title: "Something went wrong!",
        description: "There was a problem with your login.",
        variant: "destructive",
      });
    }
    router.push("/");
  };

  const loginForm = (
    <>
      <div>
        <h1 className="text-3xl font-bold pb-6">Login</h1>
        <p className="text-balance text-muted-foreground pb-6">
          Enter your email below to login to your account
        </p>
      </div>
      <form className="pb-4" onSubmit={handleSubmitLogin}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className="mb-4"
          />
        </div>
        <div>
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline pb-2"
            >
              Forgot your password?
            </Link>
          </div>
          <Input
            className="mb-4"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full mb-4">
          Login
        </Button>
        <Button variant="outline" disabled={isSubmitting} className="w-full">
          Login with Google
        </Button>
      </form>
    </>
  );

  const registerForm = (
    <>
      <div>
        <h1 className="text-3xl font-bold pb-6">Create account</h1>
        <p className="text-balance text-muted-foreground pb-6">
          Enter your email below to create to your account
        </p>
      </div>
      <form className="pb-4" onSubmit={handleSubmitRegister}>
        <div>
          <Label htmlFor="nme">Name</Label>
          <Input id="name" name="name" type="text" required className="mb-4" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            className="mb-4"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            className="mb-4"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            className="mb-4"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full mb-4">
          Create account
        </Button>
      </form>
    </>
  );

  // console.log(session);

  return (
    <div className="w-full lg:flex items-center h-screen gap-24">
      <div className="lg:w-full items-center flex flex-col justify-center h-full">
        <div className="flex w-auto flex-col justify-center h-full">
          {isLogin ? loginForm : registerForm}
          {isLogin ? (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                onClick={() => setIsLogin(false)}
                className="underline p-0"
              >
                Sign up
              </Button>
            </div>
          ) : (
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => setIsLogin(true)}
                className="underline p-0"
              >
                Signin
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
