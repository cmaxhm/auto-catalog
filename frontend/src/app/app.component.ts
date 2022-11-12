import { Component, OnInit } from '@angular/core';
import { Auto } from "./interfaces/auto";
import { AutoService } from "./services/auto.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * The application title.
   */
  public title = 'Auto Catalog';

  /**
   * The columns to display in the table.
   */
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

  /**
   * The autos list.
   */
  public autosList: Auto[] = [];

  constructor(private autoService: AutoService) {}

  /**
   * The function to execute when component is ready.
   */
  ngOnInit(): void {
    this.autoService.getAutos().subscribe((response: Auto[]) => {
      this.autosList = response;
    });
  }
}
