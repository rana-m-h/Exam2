
"use server";

import { JSON_HEADER } from "../constants/api.constant";

const BASE_URL = process.env.API + "/auth";

export const setNewPasswordAction = async (email: string , newPassword:string) => {
  
  const response = await fetch(BASE_URL + "/resetPassword", {
    method: "PUT",
    body: JSON.stringify({ email , newPassword}),
    headers: {
      ...JSON_HEADER,
  
    },
  });

  const payload = await response.json();
  return payload;
};