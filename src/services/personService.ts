import Person from "../models/personModel";

class PersonService {
  // Create a person
  async createPerson(data: any) {
    try {
      const person = await Person.findOne({ email: data.email });
      console.log(person);

      if (person) {
        return { status: 400, message: "Email already exist" };
      } else {
        const newPerson = await Person.create(data);
        return {
          status: 201,
          message: "User created successfull",
          data: newPerson,
        };
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error creating user");
    }
  }

  // Get all persons
  async getPersons() {
    try {
      const persons = await Person.find({});
      return { status: 200, message: "Success to get a users", data: persons };
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error fetching user");
    }
  }

  // Get a single person by id
  async getPerson(id: string) {
    try {
      const person = await Person.findById(id);
      if (!person) {
        return { status: 404, message: "User not found" };
      }
      return { status: 200, message: "Success to get a user", data: person };
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error fetching user");
    }
  }

  // Update a person by id
  async updatePerson(id: string, data: any) {
    try {
      const updatedPerson = await Person.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedPerson) {
        return { status: 404, message: "User not found" };
      }
      return {
        status: 200,
        message: "User updated successfull",
        data: updatedPerson,
      };
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error updating user");
    }
  }

  // Delete a person by id
  async deletePerson(id: string) {
    try {
      const deletedPerson = await Person.findByIdAndDelete(id);
      if (!deletedPerson) {
        return { status: 404, message: "User not found" };
      }
      return {
        status: 202,
        message: "User deleted successfull",
        data: deletedPerson,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error deleting user");
    }
  }
}

export const personService = new PersonService();
