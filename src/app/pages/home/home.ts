import { Component, isDevMode, VERSION } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly version = VERSION.full;
  protected readonly mode = isDevMode() ? 'development' : 'production';
}
