import bcrypt from "bcryptjs";
import Person from "../models/personModel";

export const register = async ({ email, password, ...rest }: any) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Person({
    ...rest,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return newUser;
};

export const login = async ({ email, password }: any) => {
  try {
    const user = await Person.findOne({ email });

    if (!user) {
      console.log(
        "Couldn't find any recipes that contain 'potato' as an ingredient.\n",
        user
      );
    } else {
      console.log(
        `Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(
          user
        )}\n`
      );
    }

    const token = "";

    return { token, user };
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
    return { token: null, user: null };
  }
};
