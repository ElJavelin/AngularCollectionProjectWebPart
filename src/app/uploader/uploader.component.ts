import {Component, Input, OnInit} from '@angular/core';
import {finalize, tap} from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {AppService} from '../app-service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    /*
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
     */
    this.files.push(files.item(0));
  }
}
