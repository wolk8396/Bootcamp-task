import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Information } from 'src/app/models/character.module';
import { Results } from 'src/app/models/results.module';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './cart.character.component.html',
  styleUrls: ['./cart.character.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges, OnDestroy {
  isUrl!:string
  characterName!:string;

  @Input() results!: Results;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onResultAvatar(this.results);
  }

  onResultAvatar(res: Results): void {
    const {image, location} = res;
    this.isUrl = image;
    this.characterName = this.results.name;
    console.log(this.results.name);

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
