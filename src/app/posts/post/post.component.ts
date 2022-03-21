import { Component, OnInit, Input, Output, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Post } from '../post.service';

enum PostStates {
  Display,
  Editing,
  Loading
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
  
  form: FormGroup;
  postState: PostStates;
  

  @Input('post') public post: Post;
  @Input('error') public error: string;
  @Output() onChange: EventEmitter<Post> = new EventEmitter<Post>()

  
  @ViewChild('inputTitle', {static: false}) private _inputTitle :ElementRef
  @ViewChild('inputBody', {static: false}) private _inputBody :ElementRef
  @ViewChild('submitButton', {read: ElementRef, static: false}) private _submitButton :ElementRef

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup ({
      title: new FormControl(this.post.title, [Validators.required]),
      body: new FormControl(this.post.body, [Validators.required])
    });

    this.postState = PostStates.Display;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.postState = PostStates.Display
  }

  public editPost() {

    this.postState = PostStates.Editing;
    
    setTimeout(() => {

      this._inputTitle.nativeElement.focus();
    }, 1);
  }

  public saveChanges() {
    
      this.onChange.emit({title: this.form.value.title, body: this.form.value.body, id: this.post.id});
      this.postState = PostStates.Loading;
  }

  public onBlur(e: FocusEvent): void {
    
    let permittedElements = [this._inputBody.nativeElement, this._inputTitle.nativeElement, this._submitButton.nativeElement];
    let relT = e.relatedTarget;
    
    if (permittedElements.includes(relT)) return;

    this.postState = PostStates.Display;
  }
}