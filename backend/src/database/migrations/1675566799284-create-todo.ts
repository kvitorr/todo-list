import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class createTodo1675566799284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "todo",
                columns: [
                    {
                        name: "id_todo",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "600"
                    },
                    {
                        name: "done",
                        type: "boolean"
                    }, 
                    {
                        name: "id_userfk",
                        type: "integer"
                    }
                ],
            })
        );

        await queryRunner.createForeignKey("todo", new TableForeignKey({
                columnNames: ["id_userfk"],
                referencedColumnNames: ["id_user"],
                referencedTableName: "usert",
                onDelete: "CASCADE",
                name: "fk_id_user"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("todo", "fk_id_user");
        await queryRunner.dropTable("todo")
    }

}
