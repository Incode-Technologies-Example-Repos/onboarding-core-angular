import { ElementRef, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';
import { Subscription } from 'rxjs';
import { FrontIdComponent } from '../front/front.component';
import { BackIdComponent } from '../back/back.component';
import { SelfieComponent } from '../selfie/selfie.component';
import { QrComponent } from '../qr/qr.component';
import { Output } from '@angular/core';


@Component({
  selector: 'app-smile',
  standalone: true,
  imports: [CommonModule, RouterLink, FrontIdComponent, BackIdComponent, SelfieComponent, QrComponent],
  templateUrl: './smile.component.html',
  styleUrls: ['./smile.component.scss']
})

export class SmileComponent implements OnInit, OnDestroy, AfterViewInit {

  step: number = 0;
  @Output() session: any = null;
  done = false;
  isDesktop: boolean;
  subscription!: Subscription;

  constructor(public incodeSDK: IncodeService) {
    this.isDesktop = incodeSDK.incode.isDesktop();
  }

  ngOnInit() {
    if (!this.session) {
      this.subscription = this.incodeSDK.getSession()
        .subscribe((data) => {
          this.session = data
        });
    }
  }

  ngAfterViewInit() {
  }

  onStepEvent(e: any) {
    //Steps align to dom elements in smile.component.html (see that file)
    console.log('Step changed: ' + this.step);

    //If the step count indicates all modules have completed then route back to the home screen by setting session to null
    if (this.step === 2) {
      this.done = true;
      this.session = null;
    }

    //If the document is classified as a Front ID only document (like a passport), then skip the back camera step
    if (e.camera === 'front' && e.skipBackIdCapture) {
      this.step = this.step + 2;
    }

    // Since the there are only 4 steps, Front, Back, Selfie and Finish return wthout incrementing
    if (this.step < 3) {
      this.step++;
      return
    }

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

