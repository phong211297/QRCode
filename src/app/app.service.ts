import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  //#region Properties
  //#endregion

  //#region Constructor
  public constructor(private _http: HttpClient) {}
  //#endregion

  //#region Methods

  // Get QR code image
  public getQRCodeAsync(): Observable<any> {
    return this._http.get(`http://golfzoncn.ntq.solutions/api/weChat/qrCode`);
  }
  //#endregion
}
