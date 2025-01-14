"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordAction } from "@/lib/actions/recoverPassword.action";
import FeedbackMessage from "@/components/common/feedback-message";

export default function RecoverPasswordForm() {
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
  };

  const form = useForm<Inputs>({
    defaultValues: {
      email: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    setError(null);
    setLoading(true);

    const response = await forgotPasswordAction(email);

    setLoading(false);

    // If login was successful, redirect to the callback URL
    if (response.message === "success") {
      form.reset();
      router.push("/auth/verifyCode");
      return;
    }

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
    
    <h3 className="text mb-3">Forgot your password?</h3>
     
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

    
     
      {/* Submit / Feedback */}
      <div className="flex flex-col mt-3 ">
        {/* Feedback */}
        <FeedbackMessage>{error}</FeedbackMessage>

        {/* Submit */}
        <Button className="rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{("send email")}</Button>
      </div>
    </form>
  </Form>
  );
}
