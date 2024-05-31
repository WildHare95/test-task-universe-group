import { Component } from '@angular/core';
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-task-universe-group';

  history = [1,2,3,4,5,6,7,8,9]

  ngOnInit(): void {
    initFlowbite();
  }
}
