import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMenuComponent } from "./component/app-menu/app-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone : true,
  imports: [RouterModule, AppMenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QLCH_FE';
}
