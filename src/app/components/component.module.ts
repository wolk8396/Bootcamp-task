import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AvatarComponent } from "./cart.character.component/cart.character.component";
import { HeaderComponentApp } from "./header.component/header.component";
import { PaginationNavComponent } from "./pagination.nav.component/pagination.nav.component";

@NgModule({
  declarations : [
    AvatarComponent,
    HeaderComponentApp,
    PaginationNavComponent
  ],
  imports:[
    CommonModule
  ],
  exports: [
    AvatarComponent,
    HeaderComponentApp,
    PaginationNavComponent

  ],
})
export class ComponentModule {}
