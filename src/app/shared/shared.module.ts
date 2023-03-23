import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TranslocoRootModule } from "../transloco-root.module";
import { ModalCharacterComponent } from "./modal-character/modal-character";

@NgModule({
  declarations : [
    ModalCharacterComponent
  ],
  imports:[
    CommonModule,
    TranslocoRootModule

  ],
  exports: [
    ModalCharacterComponent
  ],
})
export class SharedModule {}
