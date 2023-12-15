import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { NgForm, ReactiveFormsModule } from '@angular/forms';

interface todo
{
  title: string;
  difficulty: number;
  complete: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'my-app';
  searchedValue: string = "";
  searchText: string = '';
  addingNew = false;
  todos: Array<todo> = [];
  item1: todo = {title: "Clean Room", difficulty: 3, complete: false};
  applyForm: FormGroup;


  constructor()
  {
    this.todos.push(this.item1);

    this.applyForm = new FormGroup({
      title: new FormControl(''),
      difficulty: new FormControl('')
    })
  }

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchChange()
  {
    this.searchTextChanged.emit(this.searchedValue);
  }

  onSearchEntered(searchVal:string)
  {
    this.searchText = searchVal;
    console.log(this.searchText)
  }

  addNew()
  {
    this.addingNew = !this.addingNew;
  }

  onSubmit()
  {
    let item:todo = {title: this.applyForm.value.title, difficulty: this.applyForm.value.difficulty, complete: false}
    this.todos.push(item);
    this.addingNew = false;
  }

  delete(i: number)
  {
    this.todos.splice(i,i+1)
  }
}
