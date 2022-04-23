import { HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/modules';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy{
  sort:any; 
  public games: Array<Game> | undefined;
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;
  
  constructor(private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { 

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      if(params['game-search']){
        this.searchGame('metacrit',params['game-search']);
      }
      else{
        this.searchGame('metacrit');
      }
    })

  }
  searchGame(sort:string,search?:string){
    this.gameSub = this.httpService.getGameList(sort,search).subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results;
      console.log(gameList);
    })
  }
  openGameDetails(id:number):void{
      this.router.navigate(['details',id]);
  }
  ngOnDestroy():void{
    if(this.gameSub){
      this.gameSub.unsubscribe();

    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}
