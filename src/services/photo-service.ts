import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PhotoService{
    headers: any;
    options: any;
    url: string = 'https://jsonplaceholder.typicode.com/photos';

    constructor(private http: Http){
        this.headers = new Headers({'Content-Type': 'application/json','Cache-Control': 'no-cache'})
        this.options = new RequestOptions({headers: this.headers});
    }

    findAllPhoto(){
        return this.http.get(this.url, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    handleError(error){
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}