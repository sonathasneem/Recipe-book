import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  })
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients=ingredients;
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index:number) {
    this.shoppingService.startedEditing.next(index);
  }
  
}
