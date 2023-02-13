import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createUser1675566744460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "usert",
                columns: [
                    {
                        name: "id_user",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "200"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "200"
                    }
    
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("usert")
    }

}
