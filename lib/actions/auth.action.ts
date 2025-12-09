'use server';

import { db ,auth} from "@/firebase/admin";

import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if user exists in db
    const userRecord = await auth.getUserByEmail(email);
    if (userRecord.exists) {
      return {
        success: false,
        message: "User does not already exists. Create an account.",
      }
    }

await db.collection("users").doc(uid).set({
      name,
      email,

    })
    return{
success: true,
message: "Account created successfully."
    }
  }
  catch (e) {
    console.log(e);

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    }
  }
}
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  })

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  })
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookie(idToken);
  } catch (error: any) {
    console.log("");

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

export async function getCurrentUser(): Promise<User | null>
{
  const cookieStore=await cookies();

  const sessionCookie=cookieStore.get('session')?.value;
  if(!sessionCookie) return null;
  try{

    const decodedClamis=await auth.verifySessionCookie(sessionCookie,true);
    const userRecord=await db.collection('users').doc(decodedClamis.uid).get();

    if(!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    }as User;
  }
  catch(e){
    console.log(e);
    return null;
  }

}

export async function isAuthenticated()
{
  const user=await getCurrentUser();
  return !!user;
}