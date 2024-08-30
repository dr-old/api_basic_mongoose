import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../utils/validate";
import { personService } from "../services/personService";
import Person from "../models/personModel";
import { formatResponse } from "../utils/helpers";

class AuthController {
  // Register a new person
  register = async (req: Request, res: Response) => {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    const { fullname, email, password } = value;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const personData = {
        fullname,
        email,
        password: hashedPassword,
      };

      const person = await personService.createPerson(personData);
      const data = person?.data?._id
        ? {
            _id: person?.data?._id,
            fullname: person?.data?.fullname,
            email: person?.data?.email,
            phone: person?.data?.phone,
            birthday: person?.data?.birthday,
            role: person?.data?.role,
            photo: person?.data?.photo,
            createdAt: person?.data?.createdAt,
            updatedAt: person?.data?.updatedAt,
          }
        : undefined;
      return formatResponse(res, person.status, person.message, data);
    } catch (error: any) {
      return formatResponse(res, 400, error.message);
    }
  };

  // Login a person
  login = async (req: Request, res: Response) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    const { email, password } = value;

    try {
      const person = await Person.findOne({ email });
      if (!person) {
        return formatResponse(res, 404, "User not found");
      }

      const isMatch = await bcrypt.compare(password, person.password);
      if (!isMatch) {
        return formatResponse(res, 400, "Invalid email or password");
      }

      const token = jwt.sign(
        { id: person._id, email: person.email },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      const data = person?._id
        ? {
            _id: person?._id,
            fullname: person?.fullname,
            email: person?.email,
            phone: person?.phone,
            birthday: person?.birthday,
            role: person?.role,
            createdAt: person?.createdAt,
            updatedAt: person?.updatedAt,
          }
        : undefined;

      res.status(200).send({ token, user: data });
      return formatResponse(res, 200, "Login is successfull", {
        token,
        person,
      });
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };
}

export const authController = new AuthController();
