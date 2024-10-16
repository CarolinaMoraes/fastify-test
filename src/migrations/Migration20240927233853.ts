import { Migration } from '@mikro-orm/migrations';

export class Migration20240927233853 extends Migration {

  override async up(): Promise<void> {
    this.addSql('alter table "task" add column "end_date" timestamptz null;');

    this.addSql('alter table "task_log" alter column "execution_date" type timestamptz using ("execution_date"::timestamptz);');
    this.addSql('alter table "task_log" alter column "execution_date" drop not null;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "task" drop column "end_date";');

    this.addSql('alter table "task_log" alter column "execution_date" type timestamptz using ("execution_date"::timestamptz);');
    this.addSql('alter table "task_log" alter column "execution_date" set not null;');
  }

}
