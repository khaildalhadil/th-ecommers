'use server'

import { signIn, signOut } from "@/auth"
import { signInFormSchema, signUpFormSchema } from "../validators"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { hashSync } from "bcrypt-ts-edge"
import prisma from "../db"

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

export async function signUpUser(pervState: unknown, data: FormData) {

  let userToSignIn;
  
  try  {
    const user = signUpFormSchema.parse({
      name: data.get("name") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
      confirmPassword: data.get("confirmPassword") as string,
    })

    const planPassword = user.password
    user.password = hashSync(user.password, 10)

    await prisma.user.create({data: {
      name: user.name,
      email: user.email,
      password: user.password
    }})

    userToSignIn = signInFormSchema.parse({
      email: user.email,
      password: planPassword
    })
    
  } catch(err) {
    console.error("Error signing up", err)  
    return {success: false, message: 'الرجاء التحقق من صحة البيانات المدخلة'}
  }
  await signIn("credentials", userToSignIn)
  return {success: true, message: 'تم إنشاء الحساب بنجاح'}
}