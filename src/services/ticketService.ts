import Ticket from "../models/ticketModel";

class TicketService {
  // Create a ticket
  async createTicket(data: any) {
    try {
      const newTicket = await Ticket.create(data);
      return {
        status: 201,
        message: "Ticket created successfull",
        data: newTicket,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error creating ticket");
    }
  }

  // Get all tickets
  async getTickets() {
    try {
      const tickets = await Ticket.find();
      return {
        status: 200,
        message: "Success to get a tickets",
        data: tickets,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching tickets");
    }
  }

  // Get a single ticket by id
  async getTicket(id: string) {
    try {
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return {
          status: 404,
          message: "Ticket not found",
          data: ticket,
        };
      }
      return {
        status: 200,
        message: "Success to get a ticket",
        data: ticket,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching ticket");
    }
  }

  // Update a ticket by id
  async updateTicket(id: string, data: any) {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedTicket) {
        return {
          status: 404,
          message: "Ticket not found",
          data: updatedTicket,
        };
      }
      return {
        status: 200,
        message: "Ticket updated successfull",
        data: updatedTicket,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error updating ticket");
    }
  }

  // Delete a ticket by id
  async deleteTicket(id: string) {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(id);
      if (!deletedTicket) {
        return {
          status: 404,
          message: "Ticket not found",
          data: deletedTicket,
        };
      }
      return {
        status: 202,
        message: "Ticket deleted successfull",
        data: deletedTicket,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting ticket");
    }
  }
}

export const ticketServices = new TicketService();
