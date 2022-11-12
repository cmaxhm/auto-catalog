import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from "rxjs";
import { AppComponent } from './app.component';
import { Auto } from "./interfaces/auto";
import { AutoService } from "./services/auto.service";

const MockedAutoService: {
  getAutos: () => Observable<Auto[]>
} = {
  getAutos: () => of([])
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AutoService,
          useValue: MockedAutoService
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.ngOnInit();
  });
});
