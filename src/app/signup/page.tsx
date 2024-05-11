import React from "react";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {z} from "zod";
import { error } from "console";

export default async function SignupForm() {
  
  const handleSubmit = async (formdata: FormData) => {
    "use server";
    console.log('formsubmitted')
    const userZodSchema = z.object({
      email:z.coerce.string().email().min(5),
      password: z.string().min(4),
      confirmPassword: z.string().min(4),
    }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match"
      });
    }
    })
    const userInput = {
      email:formdata.get('email'),
      password:formdata.get('password'),
      confirmPassword:formdata.get('confirm_password')
    }
    const result= userZodSchema.safeParse(userInput);
    // const errors = !result.success ? result.error?.flatten().fieldErrors:{}
    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      }
    }
    // console.log('errors in the submission ',errors)
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Hirestud
      </h2>
      <form className="my-8  " action={async(formdata)=>{
        console.log('im in client ');
        const errors = await handleSubmit(formdata);
        }}>
        <div className="p-5 border border-gray-200 rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 ">
            <LabelInputContainer>
              <Input
                id="firstname"
                name="firstname"
                placeholder="Enter first name"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Input
                id="lastname"
                name="lastname"
                placeholder="Enter last name"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Input
              id="confirmpassword"
              name="confirm_password"
              placeholder="confirm password"
              type="confirmpassword"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        </div>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
// https://dribbble.com/shots/22753453-Sign-In-Sign-Up-Form-Mobile-App
// https://dribbble.com/shots/16783412-King-of-Jungle-Landing-Page
// https://dribbble.com/shots/16754227-Seize-perfect-sign-in-sign-up-designs-for-your-next-application
