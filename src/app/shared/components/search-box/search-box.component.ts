import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject();
  private debounceSuscription?: Subscription;

  @Input()
  public placeHolder: string = "";

  @Input()
  public initialValue: string = "";


  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();


  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debounceSuscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debounceSuscription?.unsubscribe();
  }


  public searchValue(value: string) {
    this.onValue.emit(value)
  }


  public onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

}
