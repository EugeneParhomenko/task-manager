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

}
