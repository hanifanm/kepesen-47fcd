import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import HashMap from 'hashmap';

export interface IBaseService<T> {
    current: T;
    collections: T[];
}

@Injectable()
export class BaseService<T> {
    private apiName: string;
    private lastError: any;
    protected map: any;
    public isLoading: boolean;
    public current: T;
    public collections: T[];

    constructor(
        apiName: string,
        private apiService: ApiService
    ) {
        this.apiName = apiName,
            this.collections = [];
        this.map = new HashMap();
    }

    fetch(params?: HttpParams) {
        this.collections = [];
        this.isLoading = true;
        return new Promise((resolve) => {
            this.apiService.get(this.apiName, params)
                .subscribe(
                    (data: any) => {
                        data.data.forEach(d => {
                            this.collections.push(d);
                            this.map.set(d.id, d);
                        });
                        this.isLoading = false;
                        resolve();
                    },
                    (error: any) => {
                        this.lastError = error;
                        this.isLoading = false;
                        resolve();
                    }
                )
        })
    }

    create(body?: any) {
        return new Promise((resolve) => {
            this.apiService.post(this.apiName, body)
                .subscribe(
                    (data: any) => {
                        resolve();
                    },
                    (error: any) => {
                        this.lastError = error;
                        resolve();
                    }
                )
        })
    }

    update(body?: any) {
        return new Promise((resolve) => {
            this.apiService.put(this.apiName, body)
                .subscribe(
                    (data: any) => {
                        resolve();
                    },
                    (error : any) => {
                        this.lastError = error;
                        resolve();
                    }
                )
        })
    }

}