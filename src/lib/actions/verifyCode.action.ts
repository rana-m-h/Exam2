"use server";

import { JSON_HEADER } from "../constants/api.constant";

const BASE_URL = process.env.API + "/auth";

export const verifyCodeAction = async (resetCode: string) => {
  const response = await fetch(BASE_URL + "/verifyResetCode", {
    method: "POST",
    body: JSON.stringify({ resetCode }),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload = await response.json();
  return payload;
};



