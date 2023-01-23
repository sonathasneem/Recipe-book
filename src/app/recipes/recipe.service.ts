import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    // private recipes:Recipe[]=[
    //     new Recipe('Tasty Schnitzel', 
    //     'Super tasty schnitzel - just awesome!!', 
    //     'https://media-cdn.tripadvisor.com/media/photo-s/07/e0/15/ac/reel-in-fish-and-chips.jpg',
    //     [new Ingredient('Meat',1),
    //      new Ingredient('French Fries',20)]),
    //     new Recipe('Big fat burger', 
    //     'What else you need to say?',
    //     'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/04/26/09/mcdonalds-bigvegants.jpg',
    //     [new Ingredient('Buns',2),
    //      new Ingredient('Meat',1)])
    //   ];
    private recipes: Recipe[] = [];

    constructor(private shoppingService: ShoppingService) {

    }   

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, recipe:Recipe) {
        this.recipes[index]=recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}