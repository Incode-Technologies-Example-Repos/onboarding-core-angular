# Angular Web SDK Sample

This is an example showing how to run Incode's Web SDK inside the Angular JS framework. 


## Context

There are numerous ways to integrate JS / TS libraries in the Angular Framework.  This samples shows how to integrate Incode's Web SDK with Angular JS to do Identity Verification.  This sample is optimized for Mobile Web Onboarding.

The sample illustrates the following techniques. 

* Redirection to mobile with a QR code
* Starting a session
* Capturing device fingerprint
* Scanning Front ID
* Scanning Back ID
* Processing the ID
* Taking a Selfie
* Processing a Selfie


## Prerequisites

* Use Node.JS v20.11.1 (or risk it)

* This sample uses the popular [Angular JS Framework] (https://angularjs.org/)  with Incode 

* You should have a tool like [NGROK](https://ngrok.com/) to support development

## Setup and Run

Use yarn or npm. 

__Yarn__

```
yarn

yarn run start

```

__NPM__

```
npm install
npm run start
```

After running the above commands, the app will launch inside a web browser.  After it has launched, run the below NGROK command to create a publically accessible HTTPS URL to use for testing.

``` ngrok http 4200 ```


## Usage

Once the app loads on your laptop a QR screen will appear.  Scan the QR and use a drivers license, passport or identifcation card to complete onboarding.


## Example Angular Component to Render the Incode Camera 
```js

import { ElementRef, ViewChild, Component, afterNextRender, AfterRenderPhase, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { IncodeService } from '../../incode.service';

@Component({
  selector: 'front-id',
  standalone: true,
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss']
})
export class FrontIdComponent {

  @Input() session: any;
  @Output() nextStepEvent = new EventEmitter();
  @ViewChild('frontcamera') cameraRef: ElementRef | undefined;

  constructor(public incodeSDK: IncodeService) {
    afterNextRender(async () => {
      await this.renderCamera();
    }, { phase: AfterRenderPhase.Write });
  }

  private async renderCamera(): Promise<void> {

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
}

```

# Author

© Incode Technologies Inc. All rights reserved.
