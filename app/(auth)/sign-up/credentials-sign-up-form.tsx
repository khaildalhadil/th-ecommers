'use client'; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const CredentialsSignUpForm = () => {

  const [data, action] = useActionState(signUpUser , {
    success: false,
    message: ''
  }) 

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full" type="submit" >
        {pending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
      </Button>
    )
  }

  return (
    <form className="space-y-6" action={action}>
      <div>
        <Label htmlFor="name" className="block text-sm font-medium">
          الاسم
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full"
          autoComplete="name"
        />
      </div>
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
      <div>
        <Label htmlFor="confirmPassword" className="block text-sm font-medium">
          تأكيد كلمة المرور
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
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
          لديك حساب بالفعل؟{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            تسجيل دخول
          </Link>
        </div>
        
      </div>
    </form>
  );
}
 
export default CredentialsSignUpForm;