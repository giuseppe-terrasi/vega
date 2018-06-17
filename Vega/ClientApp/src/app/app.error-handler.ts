import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { SnotifyToastConfig, SnotifyPosition, SnotifyService } from "ng-snotify";

export class AppErrorHandler implements ErrorHandler {

  constructor(private ngZone: NgZone,
    @Inject(SnotifyService) private snotifyService: SnotifyService) { }

  style = 'material';
  timeout = 5000;
  position: SnotifyPosition = SnotifyPosition.rightTop;
  progressBar = false;
  closeClick = true;
  newTop = true;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = true;
  titleMaxLength = 50;
  bodyMaxLength = 100;

  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
      }
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover
    };
  }

  handleError(error: any): void {
    this.ngZone.run(() => {
      this.snotifyService.error("An unexpected error happened.", "Error", this.getConfig());
    });
    
  }
}
