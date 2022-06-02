import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import { NewTopHeadLines } from "../interfaces";
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new  HttpHeaders({
  'X-Api-key':apiKey
});
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  categoriaActual = '';
  headLinesPages = 0;
  PagesCategorias = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = apiUrl + query

    return this.http.get<T>(query,{headers})
  }

  getTopHeadLines(){
    this.headLinesPages++;
    return this.ejecutarQuery<NewTopHeadLines>(`/top-headlines?country=co&page=${this.headLinesPages}`);
  }

  getToHeadLinesCategoria(categoria: string){
    if(this.categoriaActual === categoria){
      this.PagesCategorias++;
    }else{
      this.PagesCategorias = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<NewTopHeadLines>(`/top-headlines?country=co&category=${categoria}&page=${this.PagesCategorias}`)
  }

}
