import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Results } from 'src/app/models/results.module';
import { ResultService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './cart.character.component.html',
  styleUrls: ['./cart.character.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  isUrl!:string
  characterName!:string;

  @Input() results!: Results;

  constructor(
  private resultService: ResultService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onResultAvatar(this.results);
  }

  ngOnInit(): void {}

  onResultAvatar(res: Results): void {
    const {image, location} = res;
    this.isUrl = image;
    this.characterName = this.results.name;
  }

  onOpenModal(): void {
    this.resultService.onResult(this.results);
  }
}
