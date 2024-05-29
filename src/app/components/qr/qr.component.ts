import { Component, afterNextRender, AfterRenderPhase } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'qr',
  standalone: true,
  imports: [CommonModule, RouterLink, QRCodeModule],
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent {

  qrUrl: string = '';

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(async () => {
      this.qrUrl = window.location.href
    }, { phase: AfterRenderPhase.Write });
  }

  ngOnInit() { }

  ngOnDestroy() { }

}