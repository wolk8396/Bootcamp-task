import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalCharacterComponent } from "./modal-character/modal-character";

@NgModule({
  declarations : [
    ModalCharacterComponent
  ],
  imports:[
    CommonModule,

  ],
  exports: [
    ModalCharacterComponent
  ],
})
export class SharedModule {}
