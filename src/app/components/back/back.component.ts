import { ElementRef, ViewChild, Component, OnInit, OnDestroy, afterNextRender, AfterRenderPhase, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';


@Component({
  selector: 'back-id',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss']
})
export class BackIdComponent {

  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('backcamera') cameraRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService ) {
    afterNextRender(async () => {
      await this.renderCamera();
    }, {phase: AfterRenderPhase.Write});
  }


  private async renderCamera(): Promise<void> {
    console.log('Start camera render');

    await this.incodeSDK.incode.renderCamera('back', this.cameraRef?.nativeElement, {
      token: this.session,
      onError: (e) => { 
        this.nextStepEvent.emit();
      },
      onSuccess: async (e: any) => {
        // Process the ID document
        await this.incodeSDK.incode.processId({ token: this.session.token })
        e.camera = 'back';
        this.nextStepEvent.emit(e);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}
  
}

