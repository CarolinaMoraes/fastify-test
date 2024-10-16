import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Task } from "./task.entity";
@Entity()
export class TaskTime {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id?: string;

  @Property({ type: "time" })
  time!: string;

  @ManyToOne(() => Task)
  task!: Task;

  constructor(taskTime: string) {
    this.time = taskTime;
  }
}
