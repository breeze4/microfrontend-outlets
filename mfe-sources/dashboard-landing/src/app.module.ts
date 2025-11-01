import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, UrlHandlingStrategy, Router } from '@angular/router';
import { createBaseHrefProvider } from '@mfe/angular-shared';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ClaimsComponent } from './components/claims.component';
import { PoliciesComponent } from './components/policies.component';
import { CustomersComponent } from './components/customers.component';
import { ReportsComponent } from './components/reports.component';
import { DashboardUrlHandlingStrategy } from './dashboard-url-strategy';

function initializeRouterDebugger(router: Router) {
  return () => {
    router.events.subscribe(event => {
      console.log(`[DEBUG:NAVIGATE] [Angular Router Event] ${event.constructor.name}`, event);
    });
  };
}

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
    createBaseHrefProvider('/dashboard'),
    { provide: UrlHandlingStrategy, useClass: DashboardUrlHandlingStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeRouterDebugger,
      deps: [Router],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
