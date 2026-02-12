"use server";

import { cookies } from "next/headers";

export async function getAccessToken() {
  //   const token = (await cookies()).get('token');
  //   const authToken = token?.value;
  //   return authToken;

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  const authToken = token?.value;
  return authToken;
}
