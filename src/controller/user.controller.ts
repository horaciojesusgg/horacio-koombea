import { Request, Response } from 'express';
import Controller from '../util/decorator/controller.decorator';
import { Post} from '../util/decorator/handlers.decorator';
import { autoInjectable } from 'tsyringe';
import UserRepository from '../repository/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
@Controller('/user')
@autoInjectable()
export default class UserController {

    constructor(private userRepository: UserRepository) {}

    @Post('/register')
    async registerUser(req: Request, res: Response) {
        const { email, password, name } = req.body;
        const existingUser = await this.userRepository.getOneByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({email, password: hashedPassword, name})
        res.status(201).json({ message: 'User created' });
    }

    @Post('/login')
    async login(req: Request, res: Response) {

        const { email, password } = req.body;
        const user = await this.userRepository.getOneByEmail(email);
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ email: user.email, id: user.id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    }
}