import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AvatarComponent } from "./cart.character.component/cart.character.component";
import { HeaderComponentApp } from "./header.component/header.component";

@NgModule({
  declarations : [
    AvatarComponent,
    HeaderComponentApp
  ],
  imports:[
    CommonModule,

  ],
  exports: [
    AvatarComponent,
    HeaderComponentApp
  ],
})
export class ComponentModule {}
