class Task {
  public id: number;
  public title: string;
  public completed: boolean;

  constructor({
    id,
    title,
    completed,
  }: {
    id?: number;
    title: string;
    completed?: boolean;
  }) {
    const dateStr = String(new Date().getTime());
    this.id = id || Number(dateStr.slice(dateStr.length - 3, dateStr.length));
    this.title = title;
    this.completed = completed ?? false;
  }
}

export default Task;
