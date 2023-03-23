import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AvatarComponent } from "./cart.character.component/cart.character.component";

@NgModule({
  declarations : [
    AvatarComponent
  ],
  imports:[
    CommonModule,

  ],
  exports: [
    AvatarComponent
  ],
})
export class ComponentModule {}
