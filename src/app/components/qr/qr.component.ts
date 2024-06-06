import { Component, afterNextRender, AfterRenderPhase } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'qr',
  standalone: true,
  imports: [CommonModule, RouterLink,],
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent {
  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('redirectToMobile') redirectToMobileRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(async () => {
      this.renderRedirectToMobile()
    }, { phase: AfterRenderPhase.Write });
  }

  private async renderRedirectToMobile(): Promise<void> {
    console.log(this.session)
    await this.incodeSDK.incode.renderRedirectToMobile(this.redirectToMobileRef?.nativeElement, {
      session: this.session,
      url: window.location.href,
      showSms: false,
      onSuccess: (e: any) => {
        this.nextStepEvent.emit(e);
      } 
    });
  }

  ngOnInit() { }

  ngOnDestroy() { }

}