'use client'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useActionState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const CredentialsSignInForm = () => {

  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: ''
  }) 

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" >
        {pending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>
    )
  }

  return (
    <form className="space-y-6" action={action}>
      <div>
        <Label htmlFor="email" className="block text-sm font-medium">
          البريد الإلكتروني
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full"
          autoComplete="email"
        />
      </div>
      <div>
        <Label htmlFor="password" className="block text-sm font-medium">
          كلمة المرور
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full"
          autoComplete="current-password"
        />
      </div>

      {data && !data.success && (
        <div className="text-sm text-red-600">{data.message}</div>
      )}

      <div>
        <SignInButton />
        <div className="text-sm text-center text-muted-foreground mt-5">
          لا تملك حسابًا؟{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            إنشاء حساب
          </Link>
        </div>
      </div>
    </form>
  );
}
 
export default CredentialsSignInForm;