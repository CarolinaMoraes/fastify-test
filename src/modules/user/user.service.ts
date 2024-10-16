import { getEntityManager } from "../../utils/entityManager.utils";
import { CreateUser } from "./createUser.schema";
import { User } from "./user.entity";

export class UserService {
  async createUser(userCreateInput: CreateUser) {
    try {
      const em = getEntityManager();

      const existentUser = await em.findOne(User, {
        email: userCreateInput.email,
      });
      if (existentUser) {
        throw new Error("User already exists in the database");
      }

      const user = em.create(User, {
        email: userCreateInput.email,
        times: userCreateInput.times,
      });

      await em.persistAndFlush(user);
      return user;
    } catch (error) {
      console.log(error);
      return "not so cool";
    }
  }
}
