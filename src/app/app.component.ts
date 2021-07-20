import { QRCodeResponseModel } from './models/qrcode-response.model';
import { AppService } from './app.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  //#region Propeties

  // Page title
  public title = 'golfzon-qr';

  // Image source
  public imgSrc: string = '';

  // Subscripton for page
  private _subscription: Subscription;

  //#endregion

  //#region Constructor
  public constructor(private _appService: AppService) {
    this._subscription = new Subscription();
  }
  //#endregion

  //#region Methods

  public ngOnInit(): void {
    // Init loading icon
    this.imgSrc = './assets/images/Spinner-1s-200px.svg';

    // Get qr code async
    const getQrCodeSubscription = this._appService
      .getQRCodeAsync()
      .subscribe((qrResponse: QRCodeResponseModel) => {
        if (!qrResponse || !qrResponse.qrCodeUrl) {
          console.error(
            '------------QR Response: Get qr api return error------------'
          );
          return;
        }

        this.imgSrc = qrResponse.qrCodeUrl;
      });

    this._subscription.add(getQrCodeSubscription);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }

    return;
  }
  //#endregion
}
