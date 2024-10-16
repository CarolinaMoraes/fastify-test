import {
  Collection,
  Entity,
  Enum,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { TaskTime } from "./taskTime.entity";

@Entity()
export class Task {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @Property()
  name!: string;

  @Enum(() => RecurrencyType)
  recurrencyType!: RecurrencyType;

  @OneToMany(() => TaskTime, (taskTime) => taskTime.task)
  scheduledTimesPerDay = new Collection<TaskTime>(this);

  @Property({ type: "timestamp" })
  startDate!: Date;

  @Property({ type: "timestamp" })
  endDate?: Date;
}

export enum RecurrencyType {
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  noRecurrency = "noRecurrency",
}
