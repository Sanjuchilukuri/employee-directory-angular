import { Component, OnInit, inject } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading!: boolean;
  constructor(private loaderService: LoaderService) {
    // debugger;
    this.loaderService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    
  }
}
