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

  // Get all tickets with pagination, filter and sort
  getTickets = async (data: any) => {
    const {
      page = 1,
      limit = 10,
      sortField = "createdAt",
      sortOrder = "asc",
      filterField,
      filterValue,
    } = data;

    try {
      const query: any = {};
      if (filterField && filterValue) {
        query[filterField] = new RegExp(filterValue, "i"); // Case-insensitive regex match
      }

      const tickets = await Ticket.find(query)
        .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("assignedTo");

      const totalTickets = await Ticket.countDocuments();
      const totalPages = Math.ceil(totalTickets / limit);

      return {
        status: 200,
        message: "Success to get a tickets",
        data: {
          tickets,
          totalPages,
          currentPage: parseInt(page),
          totalTickets,
        },
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching tickets");
    }
  };

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
