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
        const monthlyCounts = new Array(12).fill(0);

        data.forEach(order => {
            const month = new Date(order.entryDate).getMonth();
            monthlyCounts[month]++;
        });

        this.chartData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Ordens de Serviço por Mês',
                data: monthlyCounts,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                fill: false,
                tension: 0.4
            }]
        };

        this.chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false
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
