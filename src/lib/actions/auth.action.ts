"use server";

import { JSON_HEADER } from "../constants/api.constant";

const BASE_URL = process.env.API + "/auth";

export const registerAction = async (fields: RegisterFields) => {
  const response = await fetch(BASE_URL + "/signup", {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: APIResponse<LoginResponse> = await response.json();

  return payload;
};
