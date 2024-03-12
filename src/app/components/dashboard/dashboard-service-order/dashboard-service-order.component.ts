import { Component, OnInit } from '@angular/core';
import { ServiceOrderService } from '../../../services/service-order/service-order.service';
import { Chart, ChartType, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ToolbarNavigationComponent } from '../../../shared/toolbar-navigation/toolbar-navigation.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ServiceOrder } from '../../../models/interfaces/service-order/ServiceOrder';

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
        HttpClientModule,
        MenubarModule
    ],
})
export class DashboardServiceOrderComponent implements OnInit {
    items!: MenuItem[];
    chartData: any = { datasets: [] };
    chartOptions: any = {};
    chart: Chart | null = null;

    itemAtual = 'pi pi-chart-bar';
    chartType: ChartType = 'line';

    constructor(private serviceOrderService: ServiceOrderService) {
        Chart.register(...registerables);
    }

    ngOnInit() {
        this.serviceOrderService.getAllServiceOrders().subscribe(
            (data: any) => {
                this.updateChartData(data);
            },
            (error) => {
                console.error('Error fetching service orders:', error);
            }
        );
        

        this.updateItemIconAndChartType(this.itemAtual, this.chartType);
    }

    updateChartData(data: any[]) {
        if (this.chartType === 'line') {
            this.processDataForLineChart(data);
        } else if (this.chartType === 'pie') {
            this.processDataForPieChart(data);
        }
        this.createChart();
    }

    processDataForLineChart(data: any[]) {
        const monthStartCounts = new Array(12).fill(0);
        const monthEndCounts = new Array(12).fill(0);

        data.forEach(order => {
            const date = new Date(order.entryDate);
            const month = date.getMonth();
            const day = date.getDate();

            if (day <= 15) {
                monthStartCounts[month]++;
            } else {
                monthEndCounts[month]++;
            }
        });

        this.configureLineChart(monthStartCounts, monthEndCounts);
    }

    processDataForPieChart(data: any[]) {
        const startOfMonth = 0;
        const endOfMonth = 1;
        const counts = [0, 0];

        data.forEach(order => {
            const day = new Date(order.entryDate).getDate();
            day <= 15 ? counts[startOfMonth]++ : counts[endOfMonth]++;
        });

        this.configurePieChart(counts);
    }

    configureLineChart(monthStartCounts: number[], monthEndCounts: number[]) {
        this.chartData = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [
                {
                    label: 'Ordens no Início do Mês',
                    data: monthStartCounts,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 4,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Ordens no Final do Mês',
                    data: monthEndCounts,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 4,
                    fill: false,
                    tension: 0.4
                }
            ]
        };
        this.chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    }

    configurePieChart(counts: number[]) {
        this.chartData = {
            labels: ['Início do Mês', 'Fim do Mês'],
            datasets: [{
                data: counts,
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }]
        };
        this.chartOptions = {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        };
    }

    createChart() {
        if (this.chart) {
            this.chart.destroy();
        }

        const canvas = document.getElementById('myChart') as HTMLCanvasElement;
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                this.chart = new Chart(ctx, {
                    type: this.chartType,
                    data: this.chartData,
                    options: this.chartOptions
                });
            }
        }
    }

    updateItemIconAndChartType(icon: string, chartType: ChartType) {
        this.itemAtual = icon;
        this.chartType = chartType;

        this.serviceOrderService.getAllServiceOrders().subscribe(
            (data: any[]) => {
                this.updateChartData(data);
            },
            (error) => {
                console.error('Error fetching service orders:', error);
            }
        );
        

        this.items = [
            {
                label: '',
                icon: this.itemAtual,
                items: [
                    {
                        label: '',
                        icon: 'pi pi-chart-line',
                        command: () => this.updateItemIconAndChartType('pi pi-chart-line', 'line')
                    },
                    {
                        label: '',
                        icon: 'pi pi-chart-pie',
                        command: () => this.updateItemIconAndChartType('pi pi-chart-pie', 'pie')
                    },
                ]
            },
        ];
    }
}
