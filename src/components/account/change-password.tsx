import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { changePasswordSchema } from "@/schemas/account";
import { apiRoutes } from "@/utils/routes";
import { useState } from "react";
import axios from "axios";
import { buildUrlApi } from "@/utils/buildUrlApi";

export type AccountFormValues = z.infer<typeof changePasswordSchema>;

export const ChangePassword: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const defaultValues: Partial<AccountFormValues> = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues,
  });

  const onSubmit = async (data: AccountFormValues) => {
    try {
      setIsSubmitting(true);
      const apiUrl = buildUrlApi({
        path: apiRoutes.user.updatePassword,
      });

      await axios.post(apiUrl, {
        ...data,
      });

      toast({
        title: "Account updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating your account.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change Password</h3>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
};
