import { differenceInDays, getDate, isSameDay } from "date-fns";
import { getEntityManager } from "../../utils/entityManager.utils";
import { CreateTask } from "./createTask.schema";
import { MarkTaskTime } from "./markTaskTime.schema";
import { Task } from "./task.entity";
import { TaskLog } from "./taskLog.entity";
import { TaskTime } from "./taskTime.entity";

export class TaskService {
  async createTask(
    createTaskInput: CreateTask,
  ): Promise<Task | undefined> {
    const em = getEntityManager();

    const scheduledTimesPerDayFormat =
      createTaskInput.scheduledTimesPerDay.map(
        (scheduleTime) => new TaskTime(scheduleTime)
      );
    const task = em.create(Task, {
      ...createTaskInput,
      scheduledTimesPerDay: scheduledTimesPerDayFormat,
    });

    await em.persistAndFlush(task);

    return task;
  }

  async markAsCompleted(
    markTaskTimeInput: MarkTaskTime
  ): Promise<void> {
    const em = getEntityManager();

    const task = await em.findOne(Task, { id: markTaskTimeInput.taskId });
    const taskTime = await em.findOne(TaskTime, {
      id: markTaskTimeInput.taskTimeId,
    });

    if (task && taskTime) {
      const taskLog = em.create(TaskLog, {
        task,
        taskTime,
      });

      await em.persistAndFlush(taskLog);
    }
  }

  async getTasksOfDate(
    date: Date,
  ): Promise<Task[]> {
    const em = getEntityManager();

    const tasksThatCouldBeExcutedInPeriod = await em.find(Task, {
      startDate: { $lte: date },
      $or: [
        { endDate: { $gte: date } }, // End date should be greater than or equal to the given date
        { endDate: null }, // OR endDate can be null
      ],
    });

    const tasksOfGivenDate = tasksThatCouldBeExcutedInPeriod.filter((task) => {
      return this.filterTasksByRecurrencyType(task, date);
    });

    return tasksOfGivenDate;
  }

  private filterTasksByRecurrencyType(task: Task, date: Date): boolean {
    switch (task.recurrencyType) {
      case "daily":
        return true;
      case "weekly":
        return differenceInDays(date, task.startDate) % 7 === 0;
      case "monthly":
        return getDate(task.startDate) === getDate(date);
      case "noRecurrency":
        return isSameDay(date, task.startDate);
      default:
        throw new Error("Invalid option");
    }
  }
}
