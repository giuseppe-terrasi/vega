import { ErrorHandler, Inject, NgZone, Injector } from "@angular/core";
import { SnotifyToastConfig, SnotifyPosition, SnotifyService } from "ng-snotify";
import { Router } from "@angular/router";

export class AppErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector,
    private ngZone: NgZone,
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

  get router(): Router {
    return this.injector.get(Router);
  }

  handleError(error: any): void {
    this.ngZone.run(() => {
      if (error.status === 404) {
        this.snotifyService.error("Not found.", "Error", this.getConfig());
        this.router.navigate(['/']);
      }
      else {
        this.snotifyService.error("An unexpected error happened.", "Error", this.getConfig());
      }
    });
    
  }
}
