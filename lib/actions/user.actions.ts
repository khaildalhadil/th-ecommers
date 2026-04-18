'use server'

import { signIn, signOut } from "@/auth"
import { signInFormSchema } from "../validators"
import { isRedirectError } from "next/dist/client/components/redirect-error"

// Sign in the user with credentials email and password
export async function signInWithCredentials(prevState: unknown ,data: FormData) {

  try{

    const user = signInFormSchema.parse({
      email: data.get("email") as string,
      password: data.get("password") as string
    })
    
    await signIn("credentials", user)
    return {success: true, message: 'تم تسجيل الدخول بنجاح'}

  } catch(err) {

    if (isRedirectError(err)) {
      throw err;
    }

    console.error("Error signing in", err)  
    return {success: false, message: 'بريد إلكتروني أو كلمة مرور غير صالحة'}

  }
}

export async function signOutUser() {
  await signOut()
}