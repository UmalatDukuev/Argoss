export interface IWorker {
    id: number
    name: string,
    occupation: string,
    dateOccupation?: Date,
    department: string,
    other_info: object;
}

export interface IWorkerWithoutId extends Omit<IWorker, 'id'> {}