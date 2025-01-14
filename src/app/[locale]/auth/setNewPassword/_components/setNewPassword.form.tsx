"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FeedbackMessage from "@/components/common/feedback-message";
import { setNewPasswordAction } from "@/lib/actions/setNewPassword.action";

export default function SetNewPasswordForm() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form & Validation
  type Inputs = {
    email: string;
    newPassword:string
  };

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
      newPassword:""
    },
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async ({ email , newPassword}) => {
    setError(null);
    setLoading(true);
    const response = await setNewPasswordAction(email , newPassword);

    setLoading(false);

    if (response.message === "success") {
      // Clear the form after successful registration
      form.reset();
     // If login was successful, redirect to the callback URL
      router.push("/auth/login");
      return;
    }else{console.log("eroor")}

    if (Array.isArray(response.message)) {
      response.message.forEach((error) => {
        form.setError(error.field as keyof Inputs, {
          message: error.errorMessage,
          type: "ivnalid",
        });
        return;
      });
    } else {
      setError(response.message);
    }
  };
  
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4 flex flex-col gap-2.5">
    <h3 className="text">Set a Password</h3>

     
      {/* Email */}
      <FormField
        name="email"
        control={form.control}
        render={({ field }) => (
          <FormItem>
          
            {/* Input */}
            <Input {...field} placeholder={t("email-placeholder")} />

            {/* Feedback */}
            <FormMessage />
          </FormItem>
        )}
      />

     {/* Password */}
     <FormField
          name="newPassword"
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
     
      {/* Submit / Feedback */}
      <div className="flex flex-col mt-3 ">
        {/* Feedback */}
        <FeedbackMessage>{error}</FeedbackMessage>

        {/* Submit */}
        <Button className="rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{("sing in")}</Button>
      </div>
    </form>
  </Form>
  );
}
