import { Component, OnInit } from '@angular/core';
import { Auto } from "./interfaces/auto";
import { AutoService } from "./services/auto.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Auto Catalog';
  public displayedColumns: string[] = [
    'photo',
    'reference',
    'brand',
    'category',
    'materials',
    'dimensions',
    'description',
    'price',
    'quantity'
  ];
  public autosList: Auto[] = [];

  constructor(private autoService: AutoService) {}

  ngOnInit(): void {
    this.autoService.getAutos().subscribe((response: Auto[]) => {
      this.autosList = response;
    });
  }
}
