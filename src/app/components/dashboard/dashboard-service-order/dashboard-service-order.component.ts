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
    chart: any;

    constructor(private serviceOrderService: ServiceOrderService) {
        // Registrando todos os controladores necessários para o Chart.js
        Chart.register(...registerables);
    }

    ngOnInit() {
        this.serviceOrderService.getServiceOrders().then(data => {
            this.processData(data);
        });
    }

    processData(data: any[]) {
        const statusCounts = data.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});

        this.chartData = {
            labels: Object.keys(statusCounts),
            datasets: [{
                label: 'Número de Ordens de Serviço',
                data: Object.values(statusCounts),
                backgroundColor: 'rgba(54, 162, 235, 0.5)', // Cor mais suave
                borderColor: 'rgba(54, 162, 235, 1)', // Cor da borda
                fill: false, // Não preencher a área sob a linha
                tension: 0.1 // Suavização da linha
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
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                this.chart = new Chart(ctx, {
                    type: 'line', // Alterado para gráfico de linhas
                    data: this.chartData,
                    options: this.chartOptions
                });
            } else {
                // Tratar caso em que o contexto 2D não está disponível
                console.error('2D context not available');
            }
        } else {
            // Tratar caso em que o elemento canvas não foi encontrado
            console.error('Canvas element not found');
        }
    }
}
