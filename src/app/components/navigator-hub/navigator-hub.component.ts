import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
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
  styleUrls: ['./navigator-hub.component.scss']
})
export class NavigatorHubComponent {
  constructor(private router: Router, private messageService: MessageService) {}

  navigate(path: string) {
    this.router.navigate([path]);
    // Exemplo de uso do MessageService
    this.messageService.add({severity:'info', summary:'Navegação', detail:`Navegando para ${path}`});
  }
}
