import { Request, Response } from "express";
import { ticketServices } from "../services/ticketService";
import { ticketSchema } from "../utils/validate";
import { formatResponse } from "../utils/helpers";

class TicketController {
  // Add a ticket
  addTicket = async (req: Request, res: Response) => {
    const { error, value } = ticketSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    try {
      const { status, message, data } = await ticketServices.createTicket(
        value
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get all tickets
  getTickets = async (req: Request, res: Response) => {
    try {
      const { status, message, data } = await ticketServices.getTickets();
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get a single ticket
  getTicket = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await ticketServices.getTicket(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Update a ticket
  updateTicket = async (req: Request, res: Response) => {
    const { error, value } = ticketSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.message });
    }

    const id = req.params.id;

    try {
      const { status, message, data } = await ticketServices.updateTicket(
        id,
        value
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Delete a ticket
  deleteTicket = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await ticketServices.deleteTicket(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };
}

export const ticketController = new TicketController();
