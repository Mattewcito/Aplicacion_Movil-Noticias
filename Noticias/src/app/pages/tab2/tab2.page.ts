import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  @ViewChild(IonSegment, {static: true}) segmento: IonSegment;
  noticias: Article[] = [];

  categorias: string[] = ['business','entertainment','general','health','science','sports','technology'];
  
  constructor(private NoticiasServ: NoticiasService) {}
  
  ngOnInit() {
    this.segmento.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
    } 

    cambioCategoria(event){
      this.noticias = [];
      this.cargarNoticias(event.detail.value);
    }
    cargarNoticias(categoria: string, event?){
      this.NoticiasServ.getToHeadLinesCategoria(categoria)
      .subscribe(response =>{
        if(response.articles.length === 0){
          event.target.disabled = true;
          return;
        }
        this.noticias.push(...response.articles);
        
        if(event){
          event.target.complete();
        }
      });
    }

    loadData(event){
      this.cargarNoticias(this.segmento.value, event)
    }
}
