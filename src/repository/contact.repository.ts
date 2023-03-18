import { autoInjectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { Contact } from "../entity/Contact";
import ContactDto from "../entity/DTO/contact.dto";
import { User } from "../entity/User";
import { AppDataSource } from "./db";

@autoInjectable()
export default class ContactRepository {
    private repository: Repository<Contact>;

    constructor() {
        this.repository = AppDataSource.getRepository(Contact)
    }

    async getAll(user: User) {
        return await this.repository.findBy({userId: user.id});
    }

    async findByEmail(email: string, user: User) {
        return await this.repository.findBy({email, userId: user.id});
    }

    async create(contact: ContactDto, user: User) {
       await this.repository.save({
            ...contact,
            user
        })
    }


}