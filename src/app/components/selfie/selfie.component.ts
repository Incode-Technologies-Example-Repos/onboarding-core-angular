import { ElementRef, ViewChild, Component, OnInit, OnDestroy, afterNextRender, AfterRenderPhase, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';


@Component({
  selector: 'selfie',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss']
})
export class SelfieComponent {

  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('selfiecamera') cameraRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(async () => {
      await this.renderCamera();
    }, { phase: AfterRenderPhase.Write });
  }

  private async renderCamera(): Promise<void> {
    await this.incodeSDK.incode.renderCamera('selfie', this.cameraRef?.nativeElement, {
      token: this.session,
      onError: () => { this.nextStepEvent.emit() },
      onSuccess: (e: any) => {
        this.incodeSDK.incode.processFace({ token: this.session })
        e.camera = 'selfie';
        this.nextStepEvent.emit(e);
      } 
    });
  }

  ngOnInit() { }

  ngOnDestroy() { }

}