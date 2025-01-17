

"use client";

import FeedbackMessage from "@/components/common/feedback-message";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

export default function LoginForm() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form & Validation
  const Schema = z.object({
    email: z.string({ required_error: t("email-required") }).min(1, t("email-required")),
    password: z.string({ required_error: t("password-required") }).min(1, t("password-required")),
  });
  type Inputs = z.infer<typeof Schema>;

  const form = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setError(null);
    setLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    
    });

    setLoading(false);

    // If login was successful, redirect to the callback URL
    if (response?.ok) {
      router.replace(response.url || "/dashboard/subjects" ,);
      return;
    }


    // Otherwise, display the error
    setError(response?.error || t("fallback-error-message"));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <h3 className="text mt-3">Sign in</h3>

        {/* email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
           
              {/* Input */}
              <Input {...field} placeholder={t("email-placeholder")}  className="mb-3"/>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
             
              {/* Input */}
              <Input type="password" {...field} placeholder={t("password-placeholder")} />

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />
  <Link href="/auth/recoverPassword" className="d-block text-end mt-2">
              Recover password?
            </Link>
        {/* Submit / Feedback */}
        <div className="mt-6 flex flex-col ">
          {/* Feedback */}
          <FeedbackMessage>{error}</FeedbackMessage>

        
       
          {/* providers */}
          <Button className=" rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{t("login")}</Button>
          <div className="text-center mt-3">
            <p>Or continue with</p>
            <div className="d-flex justify-content-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/dashboard/subjects" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="google" src={"/Logo Google.png"} />
              </div>
              <div
                onClick={() => signIn("facebook", { callbackUrl: "/dashboard/subjects" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="facebook" src={"/Vector.png"} />
              </div>
              <div
                onClick={() => signIn("twitter", { callbackUrl: "/dashboard/subjects" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="twitter" src={"/Logo.png"} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/dashboard/subjects" })}
                className="login-item flex justify-center hover:shadow-lg items-center border p-2 shadow-md rounded-lg cursor-pointer mx-1"
              >
                <img width={20} height={20} alt="github" src={"/Logo (1).png"} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

