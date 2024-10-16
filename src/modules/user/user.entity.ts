import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id?: number;

  @Property()
  email!: string;

  @Property({ type: "time[]" })
  times!: string[];

  @Property({ type: "text", nullable: true })
  bio?: string;
}
