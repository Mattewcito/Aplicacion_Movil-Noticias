import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { NewTopHeadLines } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadLines(){
    return this.http.get<NewTopHeadLines>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=09779fe640b84cbf9e9b31770e26cc93');
  }

}
