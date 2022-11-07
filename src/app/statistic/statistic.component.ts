import {Component, OnInit} from '@angular/core';
import {Customer} from '../model/customer';
import {StatisticService} from '../service/statistic.service';
import {Cart} from '../model/cart';
import {Chart, registerables} from 'chart.js';
import {FormControl, FormGroup} from '@angular/forms';
import {Book} from '../model/book';
// import * as chartJs from 'chart.js';
Chart.register(...registerables);

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
    chartCustomer: any;
    chartBook: any;
    customer: Customer[] = [];
    cart: Cart[] = [];
    book: Book[] = [];
    cartBook: Cart[] = [];
    customerName: string[] = [];
    quantityBook: string[] = [];
    bookName: string[] = [];
    quantityBooksSold: string[] = [];
    statisticForm: FormGroup = new FormGroup({
        topStatistic: new FormControl('customer'),
        time: new FormControl('month')
    });
    myCharCustomer = false;
    myCharBook = true;

    constructor(private statisticService: StatisticService) {
    }

    ngOnInit(): void {
        this.createChartCustomer();
    }

    createChartCustomer() {
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
                this.chartCustomer = new Chart('MyChart', {
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
            });
        });
    }

    createChartBook() {
        this.statisticService.getBook().subscribe(value => {
            this.book = value;
            for (const item of this.book) {
                this.bookName.push(item.nameBook);
            }
            this.statisticService.getQuantityBooksSold().subscribe(data => {
                this.cartBook = data;
                for (const item of this.cartBook) {
                    this.quantityBooksSold.push(String(item.quantityBook));
                }
                this.chartBook = new Chart('MyChart1', {
                    type: 'bar',
                    data: {
                        labels: this.bookName,
                        datasets: [
                            {
                                label: 'Sách Bán',
                                data: this.quantityBooksSold,
                                backgroundColor: '#44b89d'
                            }
                        ]
                    },
                    options: {
                        aspectRatio: 2.5
                    }
                });
            });
        });
    }

    valueStatistic() {
        if (this.statisticForm.value.topStatistic === 'customer') {
            this.destroyChart();
            this.customerName = [];
            this.quantityBook = [];
            this.myCharCustomer = false;
            this.myCharBook = true;
            this.createChartCustomer();
        } else if (this.statisticForm.value.topStatistic === 'book') {
            this.destroyChart();
            this.bookName = [];
            this.quantityBooksSold = [];
            this.myCharCustomer = true;
            this.myCharBook = false;
            this.destroyChart();
            this.createChartBook();
        }
    }

    destroyChart() {
        if (this.chartCustomer != null) {
            this.chartCustomer.destroy();
        }
        if (this.chartBook != null) {
            this.chartBook.destroy();
        }
    }
}
