import Validator from "validatorjs";
import httpError from "http-errors";

type RequestBody = { [key: string]: any };

const validateBody = (
  body: RequestBody,
  validation_schema: Validator.Rules
) => {
  let validator = new Validator(body, {
    validation_schema,
  });

  if (validator.fails()) {
    const errors = validator.errors.all();
    const aggregatedErrors: string[] = [];
    Object.keys(errors).forEach((key) => {
      aggregatedErrors.push(validator.errors.first(key) as string);
    });
    throw new httpError.BadRequest(aggregatedErrors.join(" ,"));
  } else {
    return true;
  }
};

export const validateCreateShortURL = async (body: RequestBody) => {
  validateBody(body, {
    url: "url|required",
    id: "string|min:5|max:10|not_in:urls,visits,auth",
  });
};

export const validateUpdateShortURL = async (body: { [key: string]: any }) => {
  validateBody(body, {
    url: "url|required",
  });
};

export const validateRegister = async (body: { [key: string]: any }) => {
  validateBody(body, {
    username: "string|required|min:4|max:8",
    password: "string|required|min:6"
  });
};

export const validateLogin = async (body: { [key: string]: any }) => {
  validateBody(body, {
    username: 'string|required',
    password: 'string|required',
  });
};