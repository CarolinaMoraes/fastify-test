import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Task } from "./task.entity";
import { TaskTime } from "./taskTime.entity";

@Entity()
export class TaskLog {
  @PrimaryKey({ type: "uuid", defaultRaw: "gen_random_uuid()" })
  id!: string;

  @ManyToOne(() => Task)
  task!: Task;

  @ManyToOne(() => TaskTime)
  taskTime!: TaskTime;

  @Property({ onCreate: () => new Date() })
  executionDate?: Date;
}
