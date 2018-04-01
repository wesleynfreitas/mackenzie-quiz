import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpClientService {

    constructor(
        private http: Http
    ) { }

    private createBaseHeader(headers: Headers) {
        if (headers == null) {
            headers = new Headers();
        }
        return headers;
    }

    get(url, headers?: Headers) {
        headers = this.createBaseHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url, data, headers?: Headers, options?: RequestOptions) {
        headers = this.createBaseHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    put(url, data, headers?: Headers) {
        headers = this.createBaseHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }

    delete(url, headers?: Headers) {
        headers = this.createBaseHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }

}
