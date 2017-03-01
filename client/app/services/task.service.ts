import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http:Http)
    {
        console.log('Task Service Initialized...');
    }

    getTasks(){
        return this.http.get('/api/tasks')
        .map(res => res.json());
    }
    /*YOU CAN JUST GET TASKS WITH IS DONE TRUE VALUE*/

    addTask(newTask)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/task', JSON.stringify(newTask), {headers: headers})
        .map(res => res.json());
    }

    deleteTask(id)
    {
        return this.http.delete('/api/task/'+id)
        .map(res => res.json());
    }

    /*YOU CAN DELETE TASKS WITH IS DONE TRUE VALUE IS TRUE*/

    updateStatus(task)
    {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/task/'+task._id, JSON.stringify(task), {headers: headers})
        .map(res => res.json());
    }
}