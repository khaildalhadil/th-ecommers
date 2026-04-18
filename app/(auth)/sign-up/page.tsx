import { APP_NAME } from "@/app/lib/constants";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CredentialsSignUpForm from "./credentials-sign-up-form";

export const metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

const SignUpPage = async () => {

  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href={"/"} className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>

          <CardTitle className="text-center text-2xl font-bold">
            إنشاء حساب جديد
          </CardTitle>

          <CardDescription className="space-y-4">
            <CredentialsSignUpForm />
          </CardDescription>

        </CardHeader>
      </Card>
    </div>
  );
}
 
export default SignUpPage;