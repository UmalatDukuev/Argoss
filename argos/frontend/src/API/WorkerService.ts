import {urlPath} from "./urlPath";
import {IWorker, IWorkerWithoutId} from "../types/IWorker";

export default class WorkerService {
    static async getWorker(
        paramPage: number = 0,
        paramLimit: number = 0,
        paramSearchName: string = '',
        paramSearchOccupation: string = '',
        paramSearchDepartment: string = '',
    ) {

        /*const url = new URL(urlPath + '/worker');
        paramPage && url.searchParams.append('page', String(paramPage)); */

        const page = paramPage ? `page=${paramPage}` : '';
        const limit = paramLimit ? `&page_limit=${paramLimit}` : '';
        const searchName = paramSearchName ? `&searchName=${paramSearchName}` : '';
        const searchOccupation = paramSearchOccupation ? `&searchOccupation=${paramSearchOccupation}` : '';
        const searchDepartment = paramSearchDepartment ? `&searchDepartment=${paramSearchDepartment}` : '';

        const url = urlPath + '/worker?' + page + limit + searchName + searchOccupation + searchDepartment;

        return await fetch(url);
    }

    static async getWorkerById( paramId: number ) {
        const id = `/${paramId}`;
        const url = urlPath + '/worker' + id;

        return await fetch(url);
    }

    static async setWorker(worker: IWorkerWithoutId) {
        const url = urlPath + '/worker';

        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...worker,
            }),
        });
    }

    static async updateWorker(worker: IWorker) {
        const id = `/${worker.id}`;
        const url = urlPath + '/worker' + id;

        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...worker,
            }),
        });
    }

    static async deleteWorker(worker: IWorker) {
        const id = `/${worker.id}`;
        const url = urlPath + '/worker' + id;

        return await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}