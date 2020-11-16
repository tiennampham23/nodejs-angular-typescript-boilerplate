import { Injectable } from '@angular/core';
import {GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {SpinnerLoaderComponent} from '../components/spinner-loader/spinner-loader.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {}

  open(): OverlayRef {
    if (this.overlayRef) {
      return this.overlayRef;
    }
    const positionStrategy: GlobalPositionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
    });
    const overlayRef = this.overlay.create(overlayConfig);
    const portal = new ComponentPortal(SpinnerLoaderComponent);
    overlayRef.attach(portal);
    this.overlayRef = overlayRef;
    return this.overlayRef;
  }

  close() {
    setTimeout(() => {
      if (this.overlayRef !== null) {
        this.overlayRef.dispose();
      }
      this.overlayRef = null;
    }, 1000);
  }
}
