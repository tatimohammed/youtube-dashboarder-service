import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { YoutubeData } from './dashboarder';
import { DashboarderService } from './dashboarder.service';
import { Chart } from 'chart.js';

@Component({
    selector: 'dashboarder',
    templateUrl: './dashboarder.component.html',
    styleUrls: ['./dashboarder.component.css']
})
export class DashboarderComponent implements OnInit {

    @ViewChild('radarChart', { static: true })
    canvas!: ElementRef;

    public data: YoutubeData = new YoutubeData();

    public radarChart!: Chart;

    videoUrl: string = '';


    onSubmit() {
        console.log('Video URL:', this.videoUrl);
        this.getVideoData();

    }

    ngOnInit(): void {
        const ctx = this.canvas.nativeElement.getContext('2d');

        // Define the data for the chart
        const data = {
            labels: ['Views', 'Likes', 'Comments', 'Rate'],
            datasets: [{
                label: 'Video Performance',
                data: [parseInt(this.data.viewCount), parseInt(this.data.likeCount), parseInt(this.data.commentCount), parseFloat(this.data.engagementRate) * 1000],
                backgroundColor: 'rgba(255, 1, 1, 0.4)',
                borderColor: 'rgba(13, 12, 31)',
                borderWidth: 1
            }]
        };


        // Define the chart options
        const options = {


        };

        // Create the radar chart
        this.radarChart = new Chart(ctx, {
            type: 'radar',
            data: data,
            options: options
        });

    }

    constructor(private _dashboarder: DashboarderService) { }

    getVideoData() {
        this._dashboarder.getVideoData(this.videoUrl).subscribe((response: YoutubeData) => {
            this.data = response;
            console.log(this.data);
            this.radarChart.data.datasets[0].data = [parseInt(this.data.viewCount), parseInt(this.data.likeCount), parseInt(this.data.commentCount)];
            this.radarChart.update();
        });
    }

    public truncateString(str: string, maxLength: number): string {
        if (str.length <= maxLength) {
            return str;
        } else {
            return str.substr(0, maxLength - 3) + '...';
        }
    }

    public formatNumber(num: number): string {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(1) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K';
        } else {
            return num.toFixed(0);
        }
    }

    public parseInt(value: string, radix?: number): number {
        return parseInt(value, radix);
    }


}








