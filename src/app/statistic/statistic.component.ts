import {Component, OnInit} from '@angular/core';
import {Customer} from '../model/customer';
import {StatisticService} from '../service/statistic.service';
import {Cart} from '../model/cart';
import {Chart, registerables} from 'chart.js';
// import * as chartJs from 'chart.js';
Chart.register(...registerables);

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
    chart: any;
    customer: Customer[] = [];
    cart: Cart[] = [];
    customerName: string[] = [];
    quantityBook: string[] = [];

    constructor(private statisticService: StatisticService) {
    }

    ngOnInit(): void {
        this.statisticService.getCustomer().subscribe(value => {
            this.customer = value;
            for (const item of this.customer) {
                this.customerName.push(item.customerName);
            }
            this.statisticService.getQuantityBook().subscribe(data => {
                this.cart = data;
                for (const item of this.cart) {
                    this.quantityBook.push(String(item.quantityBook));
                }
                this.createChart();
            });
        });
    }

    createChart() {
        this.chart = new Chart('MyChart', {
            type: 'bar',

            data: {
                labels: this.customerName,
                datasets: [
                    {
                        label: 'Sách Bán',
                        data: this.quantityBook,
                        backgroundColor: '#44b89d'
                    }
                ]
            },
            options: {
                aspectRatio: 2.5
            }

        });
    }
}
