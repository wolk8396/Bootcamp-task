import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslocoRootModule } from "../transloco-root.module";
import { ModalCharacterComponent } from "./modal-character/modal-character";
import { SpinnerLoadingComponentApp } from "./spinner/spinner-component";

@NgModule({
  declarations : [
    ModalCharacterComponent,
    SpinnerLoadingComponentApp
  ],
  imports:[
    CommonModule,
  ],
  exports: [
    ModalCharacterComponent,
    SpinnerLoadingComponentApp
  ],
})
export class SharedModule {}
