import { autoInjectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Contact } from "../entity/Contact";
import ContactDto from "../entity/DTO/contact.dto";
import { RegisterUserDto } from "../entity/DTO/user.dto";
import { User } from "../entity/User";
import { AppDataSource } from "./db";

@autoInjectable()
export default class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async getOneByEmail(email: string) {
      return await this.repository.findOneBy({email});
    }

    async create(user: RegisterUserDto) {
       return await this.repository.save({
             ...user
         })
    }


}