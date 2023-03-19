import { MigrationInterface, QueryRunner } from "typeorm"
import { User } from "../entity/User";
import bcrypt from 'bcrypt';

export class SeedUser1679195532631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(User);
        const hashedPassword = await bcrypt.hash('testPassword', 10);
        // Seed some users
        await userRepository.save([
          { name: 'Test User', email: 'testuser@koombea.com', password: hashedPassword },
        ]);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.connection.getRepository(User);
    
        // Remove the seeded users
        const users = await userRepository.find({
          where: [{ email: 'testuser@koombea.com' }],
        });
        await userRepository.remove(users);
      }

}
