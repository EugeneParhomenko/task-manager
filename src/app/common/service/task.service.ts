import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Task } from '../model/task.model';

@Injectable()
export class TaskService {

    private serverUrl = 'http://localhost:3200/';

    constructor(public http: HttpClient) {}

    getGroups(): Observable<any> {
        return this.http.get(this.serverUrl + 'groups');
    }

    getGroupList(groupID: number): Observable<any> {
        return this.http.get(this.serverUrl + 'tasks')
        .pipe(
            map((item: Task[]) => item.filter(item => item.parent === groupID)),
            filter((item: Task[]) => item && item.length > 0)
        );
    }

    deleteTask(taskId: number): Observable<any> {
        return this.http.delete(this.serverUrl + `tasks/${taskId}`);
    }

    addTask(task: Task): Observable<any> {
        return this.http.post(this.serverUrl + `tasks`, task)
    }

    getTask(taskId: number): Observable<any> {
        return this.http.get(this.serverUrl + `tasks/${taskId}`);
    }

    updateTask(taskId: number, task: Task): Observable<any> {
        return this.http.put(this.serverUrl + `tasks/${taskId}`, task);
    }

}
