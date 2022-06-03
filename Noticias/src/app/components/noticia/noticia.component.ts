import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;

  constructor(private iab: InAppBrowser,
              private actionSheetCtrl: ActionSheetController,
              private StorageService: StorageService,
              private social: SocialSharing

              ) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  }
  
  async lanzarMenu(){

const noticiaEnFavorito = this.StorageService.noticiaEnFavorito(this.noticia);

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => { 
          this.social.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url,
          )
        }
      },{
        text: noticiaEnFavorito ? 'Remover de favoritos' : 'Agregar a favoritos',
        icon: noticiaEnFavorito ? 'heart' : 'heart-outline',
        handler: () => { 
          this.StorageService.saveRemoveNoticia(this.noticia)
        }
      },{
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
        handler: () => { 
          console.log('Cancelamos la accion');
        }
      }
    
    ]
    });
    await actionSheet.present();
  }

}
