import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  @ViewChild('f',{static:false}) slForm:NgForm;
  
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index:number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form:NgForm) {
    
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode=false;
    this.slForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.editMode=false;
    this.slForm.reset();
  }
  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
  }
}
