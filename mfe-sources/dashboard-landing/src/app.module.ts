import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { createBaseHrefProvider } from '@mfe/angular-shared';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ClaimsComponent } from './components/claims.component';
import { PoliciesComponent } from './components/policies.component';
import { CustomersComponent } from './components/customers.component';
import { ReportsComponent } from './components/reports.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'claims', component: ClaimsComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes, { useHash: false }),
    HomeComponent,
    ClaimsComponent,
    PoliciesComponent,
    CustomersComponent,
    ReportsComponent
  ],
  providers: [
    createBaseHrefProvider('/dashboard')
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
