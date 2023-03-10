import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeSelectComponent } from "./recipe-select/recipe-select.component";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

const routes: Routes =[
    {path:'', redirectTo: '/recipes', pathMatch: 'full'},
    {path:'recipes', component: RecipesComponent, children: [
        {path:'', component: RecipeSelectComponent},
        {path:'new', component: RecipeEditComponent},
        {path:':id', component: RecipeDetailComponent, resolve:[RecipesResolverService]}, 
        {path:':id/edit', component: RecipeEditComponent, resolve:[RecipesResolverService]}
    ]},
    {path:'shopping-list', component: ShoppingListComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

};