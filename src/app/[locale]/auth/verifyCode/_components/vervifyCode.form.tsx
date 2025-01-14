"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FeedbackMessage from "@/components/common/feedback-message";
import { verifyCodeAction } from "@/lib/actions/verifyCode.action";

export default function VervifyCodeForm() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form & Validation
  type Inputs = {
    resetCode: string;
  };

  const form = useForm<Inputs>({
    defaultValues: {
      resetCode: "",
    },
  });

  // Functions
  const onSubmit: SubmitHandler<Inputs> = async ({ resetCode }) => {
    setError(null);
    setLoading(true);
    const response = await verifyCodeAction(resetCode);

    setLoading(false);



    if (response.status === "Success") {
      // Clear the form after successful registration
      form.reset();
      router.push("/auth/setNewPassword");
      return;
    }else{console.log("erorr")}

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
    
    <h3 className="text">Verify Code</h3>
     
      {/* Email */}
      <FormField
        name="resetCode"
        control={form.control}
        render={({ field }) => (
          <FormItem>
          
            {/* Input */}
            <Input {...field} placeholder={("Enter Code")} />

            {/* Feedback */}
            <FormMessage />
          </FormItem>
        )}
      />

    
     
      {/* Submit / Feedback */}
      <div className="flex flex-col  mt-3">
        {/* Feedback */}
        <FeedbackMessage>{error}</FeedbackMessage>

        {/* Submit */}
        <Button className="rounded-5" disabled={loading || (form.formState.isSubmitted && !form.formState.isValid)}>{("send Code")}</Button>
      </div>
    </form>
  </Form>
  );
}
