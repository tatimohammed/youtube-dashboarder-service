import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YoutubeData } from './dashboarder';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class DashboarderService {

    constructor(private _httpService: HttpClient){}

    getVideoData(url : string): Observable<YoutubeData> {
        return this._httpService.post("http://localhost:8080/dashboardapi/api/data?url="+url, {url: ""})
        .pipe(
            map((response: any) => {
              // Parse the response and return a YoutubeData object
              let data = new YoutubeData();
              data.id = response.id;
              data.videoTitle = response.videoTitle;
              data.publishedAt = response.publishedAt;
              data.viewCount = response.viewCount;
              data.likeCount = response.likeCount;
              data.commentCount = response.commentCount;
              data.engagementRate = response.engagementRate;
              data.channelTitle = response.channelTitle;
              data.videoPopularTitle = response.videoPopularTitle;
              data.videoPopularLink = response.videoPopularLink;
              return data;
            })
          );
    }

}