import { Migration } from '@mikro-orm/migrations';

export class Migration20240927203500 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "task" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, "recurrency_type" text check ("recurrency_type" in (\'daily\', \'weekly\', \'monthly\', \'noRecurrency\')) not null, "last_completed_at" timestamptz null, "start_date" timestamptz not null, constraint "task_pkey" primary key ("id"));');

    this.addSql('create table "task_time" ("id" uuid null default gen_random_uuid(), "time" time(0) not null, "last_completed_at" timestamptz null, "task_id" uuid not null, constraint "task_time_pkey" primary key ("id"));');

    this.addSql('create table "task_log" ("id" uuid not null default gen_random_uuid(), "task_id" uuid not null, "task_time_id" uuid not null, "execution_date" timestamptz not null, constraint "task_log_pkey" primary key ("id"));');

    this.addSql('alter table "task_time" add constraint "task_time_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;');

    this.addSql('alter table "task_log" add constraint "task_log_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade;');
    this.addSql('alter table "task_log" add constraint "task_log_task_time_id_foreign" foreign key ("task_time_id") references "task_time" ("id") on update cascade;');
  }

  override async down(): Promise<void> {
    this.addSql('alter table "task_time" drop constraint "task_time_task_id_foreign";');

    this.addSql('alter table "task_log" drop constraint "task_log_task_id_foreign";');

    this.addSql('alter table "task_log" drop constraint "task_log_task_time_id_foreign";');

    this.addSql('drop table if exists "task" cascade;');

    this.addSql('drop table if exists "task_time" cascade;');

    this.addSql('drop table if exists "task_log" cascade;');
  }

}
