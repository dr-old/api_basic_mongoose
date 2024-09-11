import { Request, Response } from "express";
import { personSchema } from "../utils/validate";
import { personService } from "../services/personService";
import { formatResponse } from "../utils/helpers";
import bcrypt from "bcryptjs";

class PersonController {
  // Add a person
  addPerson = async (req: Request, res: Response) => {
    const { error, value } = personSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    const hashedPassword = await bcrypt.hash(value.password, 10);

    const personData = {
      ...value,
      password: hashedPassword,
    };

    try {
      const { status, message, data } = await personService.createPerson(
        personData
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get all persons
  getPersons = async (req: Request, res: Response) => {
    try {
      const { status, message, data } = await personService.getPersons();
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get a single person
  getPerson = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await personService.getPerson(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Update a person
  updatePerson = async (req: Request, res: Response) => {
    const { error, value } = personSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    const id = req.params.id;

    const hashedPassword = await bcrypt.hash(value.password, 10);
    const personData = {
      ...value,
      password: hashedPassword,
    };

    try {
      const { status, message, data } = await personService.updatePerson(
        id,
        personData
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Delete a person
  deletePerson = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await personService.deletePerson(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };
}

export const personController = new PersonController();
