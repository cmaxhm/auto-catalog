import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from '@angular/core/testing';
import { of } from "rxjs";
import { Auto } from "../interfaces/auto";

import { AutoService } from './auto.service';

describe('AutoService', () => {
  let service: AutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send the request to backend service', () => {
    let responseFromBackend: Auto[] = [];

    service.getAutos().subscribe((response) => {
      responseFromBackend = response;
    });

    expect(responseFromBackend).toBeTruthy();
  });
});
