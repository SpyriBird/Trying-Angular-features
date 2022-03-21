import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post, PostService } from './post.service'
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription, interval, map } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public posts: Post[] = [];
  public visiblePosts: Post[] = [];
  public postsPerPage = 10;

  public error = '';
  public loading = false;
  public currentPosition: number = 0;
  public numberOfPosts: number;

  public pages: number[] = [];
  public visiblePages: number[] = [];

  private _subscribtion: Subscription[] = [];

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router) {}

  ngOnInit(): void {

    this._route.params.subscribe((params: Params) => {

      if (params['pos']){
        
        this.currentPosition = 0 + (params['pos'] - 1) * this.postsPerPage;
        this._update();

      } else {

        this.currentPosition = 0;
      }
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required)
    });
    
    this._getPosts();
    this._subscribtion.push(
      interval(120000).subscribe( () => this._getPosts.bind(this))
    ); 
  }

  ngOnDestroy(): void {
    if (this._subscribtion.length) {
      this._subscribtion.forEach(item => item.unsubscribe());
    }
  }

  private _getPosts() {
    this.loading = true;
    
    this._subscribtion.push(this._postService.getPosts()
      .pipe(
        map( posts => posts.filter( (post) => post?.id % 3))
      )
      .subscribe(response => {
  
        this.posts = response;
  
        for (let p of this.posts) {
          p.title = p.id + p.title;
        }
  
        this.loading = false;
  
        this._update();
  
      })
    );
  }

  private _update() {

    this._updateVisiblePosts();
    this._updatePages();
    this._updateVisiblePages();
  }

  private _updatePages() {

    this.numberOfPosts = this.posts.length;

    let n = Math.ceil(this.numberOfPosts / this.postsPerPage);
    
    if (this.pages.length === n) return;

    this.pages = [];
    
    for (let i = 1; i <= n; i++) {
      this.pages.push(i);
    }
  }

  private _updateVisiblePages() {

    let current = Math.floor(this.currentPosition / this.postsPerPage) + 1;
    let max = this.pages.length;

    this.visiblePages = [];
  
    if (current >= 3 && current <= max - 2) {

      this.visiblePages[0] = this.pages[0];
      this.visiblePages[1] = this.pages[current - 2];
      this.visiblePages[2] = this.pages[current - 1];
      this.visiblePages[3] = this.pages[current];
      this.visiblePages[4] = this.pages[max - 1];

      return;
    }

    if (current === 3 ) {

      this.visiblePages =this.pages;

      return;
    }

    if (current < 3) {

      this.visiblePages = this.pages.slice(0, Math.min(3, max));
      
      if (max > 3) {
        this.visiblePages.push(this.pages[max - 1]);
      }

      return;
    }

    if (current > max - 2) {

      this.visiblePages = this.pages.slice(-3);
      this.visiblePages.unshift(this.pages[0]);

      return;
    }
    
    this.visiblePages = this.pages;
  }

  private _updateVisiblePosts() {
    this.visiblePosts = this.posts.slice(this.currentPosition, this.currentPosition + this.postsPerPage);
  }

  public addPost() {

    let subscr = this._postService.addPost(this.form.value).subscribe( post => {

      this.posts.unshift(post);
      this._update();
      this.form.reset();

      this._router.navigate(['/posts', '1']);
    });

    this._subscribtion.push(subscr);
  }

  public removePost(id: number) {
    
    let subscr = this._postService.deletePost(id)
    .subscribe( () => {

      this.posts = this.posts.filter(p => p.id !== id);
      this._update();
     
    },
    error => {
      console.log(error.message);
 
      this.error = 'Не удалось удалить пост';
      setTimeout(() => this.error = '', 2000)
    }
    );

    this._subscribtion.push(subscr);

  }

  public onChange(p: Post) {

    let subscr = this._postService.changePost(p).subscribe({
      next(response) {

        let editedPost = this.posts.findIndex( p => p.id === response.id);
        this.posts[editedPost] = response;
        this._update();    
      },
      error(error) {
        console.log(error.message);
   
        this.error = 'Не удалось изменить пост';
        setTimeout(() => this.error = '', 2000)
      },
      complete() {console.log('complete')}
    });

    this._subscribtion.push(subscr);
  }


  public onPrevPosts() {
    this._router.navigate(['/posts', `${Math.floor(this.currentPosition / this.postsPerPage)}`]);
  }

  public onNextPosts() {
    this._router.navigate(['/posts', `${Math.floor(this.currentPosition / this.postsPerPage) + 2}`]);
  }
}
