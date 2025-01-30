/*
https://ajv.js.org/
https://ajv.js.org/json-schema.html#maxlength-minlength
*/


export const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string"}
  },
  required: ["email", "password"],
  additionalProperties: false
};

export const registerSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 }
  },
  required: ["firstName", "lastName", "email", "password"],
  additionalProperties: false
};
