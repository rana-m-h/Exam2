"use server";

import { JSON_HEADER } from "../constants/api.constant";

const BASE_URL = process.env.API + "/auth";

export const forgotPasswordAction = async (email: string) => {

  const response = await fetch(BASE_URL + "/forgotPassword", {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await response.json();
  return payload;
};