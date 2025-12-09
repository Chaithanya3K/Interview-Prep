// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { Form, FormField } from "@/components/ui/form";
// import Link from "next/link";
// import { toast } from "sonner";

// interface AuthFormProps {
//   type: "sign-in" | "sign-up";
// }

// const authFormSchema = (type: "sign-in" | "sign-up") =>
//   z.object({
//     name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
//     email: z.string().email("Invalid email address"),
//     password: z.string().min(3, "Password must be at least 3 characters"),
//   });

// const AuthForm = ({ type }: AuthFormProps) => {
//   const router = useRouter();
//   const formSchema = authFormSchema(type);

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     try {
//       if (type === "sign-in") {
//         toast.success("Signed in successfully!");
//         router.push("/");
//       } else {
//         toast.success("Account created successfully!");
//         router.push("/sign-in");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("There was an error. Please try again.");
//     }
//   };

//   const isSignIn = type === "sign-in";

//   return (
//     <div className="card-border lg:min-w-[566px]">
//       <div className="flex flex-col gap-6 card py-14 px-10">
//         <div className="flex flex-col items-center gap-2 text-center">
//           <img src="/logo.svg" alt="logo" height={32} width={38} />
//           <h2 className="text-primary-100 text-2xl font-semibold">Chai break</h2>
//         </div>
//         <h3 className="text-white/80 text-base">
//           Practice job interview with AI
//         </h3>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
//             {!isSignIn && (
//               <FormField
//                 control={form.control}
//                 name="name"
//                 label="Name"
//                 placeholder="Enter your name"
//               />
//             )}

//             <FormField
//               control={form.control}
//               name="email"
//               label="Email"
//               placeholder="Enter your email address"
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               label="Password"
//               placeholder="Enter your password"
//               type="password"
//             />

//             <Button className="btn" type="submit">
//               {isSignIn ? "Sign In" : "Create an Account"}
//             </Button>
//           </form>
//         </Form>

//         <p className="text-center">
//           {isSignIn ? "No account yet?" : "Have an account already?"}
//           <Link
//             href={!isSignIn ? "/sign-in" : "/sign-up"}
//             className="font-black text-user-primary ml-1"
//           >
//             {!isSignIn ? "Sign In" : "Sign Up"}
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const authFormSchema = (type: "sign-in" | "sign-up") =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3)
        : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        })

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <img src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 text-2xl font-semibold">
            Chai break
          </h2>
        </div>

        <h3 className="text-white/80 text-base">
          Practice job interview with AI
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      type="email"
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
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="btn w-full" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-white/80">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-black text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

