import { Component, OnInit } from '@angular/core';
import { ServiceOrderService } from '../../../services/service-order/service-order.service';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ToolbarNavigationComponent } from '../../../shared/toolbar-navigation/toolbar-navigation.component';

@Component({
    selector: 'app-dashboard-service-order',
    templateUrl: './dashboard-service-order.component.html',
    styleUrls: ['./dashboard-service-order.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ToolbarNavigationComponent,
        CardModule,
        ChartModule,
        HttpClientModule
    ],
})
export class DashboardServiceOrderComponent implements OnInit {
    chartData: any;
    chartOptions: any;
    chart: Chart | null = null;

    constructor(private serviceOrderService: ServiceOrderService) {
        Chart.register(...registerables);
    }

    ngOnInit() {
        this.serviceOrderService.getServiceOrders().then(data => {
            this.processData(data);
        });
    }

    processData(data: any[]) {
        const monthStartCounts = new Array(12).fill(0);
        const monthEndCounts = new Array(12).fill(0);
    
        data.forEach(order => {
            const date = new Date(order.entryDate);
            const month = date.getMonth();
            const day = date.getDate();
    
            if (day <= 15) {
                // Conta para o início do mês
                monthStartCounts[month]++;
            } else {
                // Conta para o final do mês
                monthEndCounts[month]++;
            }
        });
    
        this.chartData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Ordens no Início do Mês',
                    data: monthStartCounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Ordens no Final do Mês',
                    data: monthEndCounts,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    fill: false,
                    tension: 0.4
                }
            ]
        };

        this.createChart();
    }

    createChart() {
        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: this.chartData,
                    options: this.chartOptions
                });
            } else {
                console.error('2D context not available');
            }
        } else {
            console.error('Canvas element not found');
        }
    }
}
