import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Task } from '../model/task.model';
import { Group } from '../model/group.model';

@Injectable()
export class TaskService {

    private serverUrl = 'http://localhost:3200/';

    constructor(private http: HttpClient) {}

    public getGroups(): Observable<any> {
        return this.http.get(this.serverUrl + 'groups');
    }

    public getGroup(groupId: number): Observable<any> {
        return this.http.get(this.serverUrl + `groups/${groupId}`);
    }

    public addGroup(group: Group): Observable<any> {
        return this.http.post(this.serverUrl + `groups`, group)
    }

    public updateGroup(groupId: number, group: Group): Observable<any> {
        return this.http.put(this.serverUrl + `groups/${groupId}`, group);
    }

    // public deleteGroup(groupId: number): void {
    //     this.http.get(this.serverUrl + 'tasks')
    //         .pipe(
    //             map((item: Task[]) => item.filter((item: Task) => {
    //                 if (item) {
    //                     if (item.parent === groupId) {
    //                         this.deleteTask(item.id);
    //                     }
    //                 }
    //                 this.http.delete(this.serverUrl + `groups/${groupId}`);
    //             }))
    //         );
    //     // return this.http.delete(this.serverUrl + `groups/${groupId}`);
    // }

    public deleteGroup(groupId: number): Observable<any> {
        return this.http.delete(this.serverUrl + `groups/${groupId}`);
    }

    // public deleteGroupList(groupId: number): Observable<any> {
    //     return this.http.get(this.serverUrl + 'tasks')
    //         .pipe(
    //             map((item: Task[]) => item.filter(item => {
    //                 console.log(item);
    //                 if (item) {
    //                     if (item.parent === groupId) {
    //                         console.log('It most be delete');
    //                         this.deleteTask(item.id).subscribe().unsubscribe();
    //                     }
    //                 }
    //             }))
    //         );
    // }

    public getGroupList(groupId: number): Observable<any> {
        return this.http.get(this.serverUrl + 'tasks')
        .pipe(
            map((item: Task[]) => item.filter(item => item.parent === groupId))
        );
    }

    public deleteTask(taskId: number): Observable<any> {
        return this.http.delete(this.serverUrl + `tasks/${taskId}`);
    }

    public addTask(task: Task): Observable<any> {
        return this.http.post(this.serverUrl + `tasks`, task)
    }

    public getTask(taskId: number): Observable<any> {
        return this.http.get(this.serverUrl + `tasks/${taskId}`);
    }

    public updateTask(taskId: number, task: Task): Observable<any> {
        return this.http.put(this.serverUrl + `tasks/${taskId}`, task);
    }

}
