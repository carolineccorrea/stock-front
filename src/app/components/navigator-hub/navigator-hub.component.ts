import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ToolbarNavigationComponent } from '../../shared/toolbar-navigation/toolbar-navigation.component';

@Component({
  selector: 'app-navigator-hub',
  standalone: true,
  imports: [
    ToolbarNavigationComponent,
    CardModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './navigator-hub.component.html',
  styleUrl: './navigator-hub.component.scss'
})
export class NavigatorHubComponent {

}
