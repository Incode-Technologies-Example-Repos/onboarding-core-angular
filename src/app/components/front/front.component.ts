import { ElementRef, ViewChild, Component, OnInit, OnDestroy, afterNextRender, AfterRenderPhase, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';

@Component({
  selector: 'front-id',
  standalone: true,
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontIdComponent implements OnInit, OnDestroy {

  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('frontcamera') cameraRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(async () => {
      await this.renderCamera();
    }, { phase: AfterRenderPhase.Write });
  }

  private async renderCamera(): Promise<void> {
    console.log('Start camera render');

    await this.incodeSDK.incode.renderCamera('front', this.cameraRef?.nativeElement, {
      token: this.session,
      onError: () => { this.nextStepEvent.emit() },
      onSuccess: async (e: any) => {
        // If document has no back side start processing the document
        if (e?.skipBackIdCapture) {
          await this.incodeSDK.incode.processId({ token: this.session.token })
        }
        e.camera = 'front';
        this.nextStepEvent.emit(e);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

}