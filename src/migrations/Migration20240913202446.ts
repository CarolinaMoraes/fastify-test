import { Migration } from '@mikro-orm/migrations';

export class Migration20240913202446 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid null default gen_random_uuid(), "email" varchar(255) not null, "times" text[] not null, "bio" text null, constraint "user_pkey" primary key ("id"));');
  }

}
