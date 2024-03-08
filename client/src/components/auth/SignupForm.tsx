"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Enter a username!",
  }),
  email: z.string().email().min(2),
  password: z.string().min(6, {
    message: "Password should contain 6 characters.",
  }),
});

export default function SignupForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      setUser(data);

      if (res?.status === 200) toast.success("Signup success");
      else toast.error(data.message);

      router.refresh();
      // router.prefetch("/");
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };
  return (
    <div
      className="py-6 px-4 bg-white rounded-md max-w-sm w-full text-black 
    shadow-sm shadow-indigo-50"
    >
      <h1
        className="text-2xl font-bold text-center py-6 bg-gradient-to-r from-fuchsia-500
       to-red-500 via-indigo-600 bg-clip-text text-transparent"
      >
        Login to continue
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="py-6"
                    placeholder="yourname@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="py-6"
                    placeholder="yourname@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="py-6"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="my- w-full py-6 bg-purple-600 hover:bg-purple-600 hover:bg-opacity-80"
          >
            Continue
          </Button>
        </form>
      </Form>
      <p className="flex space-x-2 pt-4 text-sm text-center items-center justify-center">
        <span>Already have an account?</span>
        <Link href="/login" className="text-purple-600">
          Login.
        </Link>
      </p>
    </div>
  );
}
