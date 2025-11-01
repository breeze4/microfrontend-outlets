# Task List: Client-Side Routing Implementation

## Phase 1: App Shell Client-Side Routing Infrastructure

- [ ] Create global navigation helper function in app-shell.js
- [ ] Add state tracking to app-shell.js
- [ ] Add popstate event listener to app-shell.js
- [ ] Implement handleRouteChange() function in app-shell.js
- [ ] Implement selective fragment unmounting in app-shell.js
- [ ] Update composeApplication() to support re-composition
- [ ] Wire up custom navigation event listener
- [ ] Rebuild app-shell

## Phase 2: Update Common Header

- [ ] Update Header.jsx to use onClick handlers
- [ ] Rebuild common-header

## Phase 3: Update Dashboard Sidebar

- [ ] Update dashboard Sidebar.jsx to use onClick handlers
- [ ] Rebuild dashboard-sidebar

## Phase 4: Update Hotlists Sidebar

- [ ] Update hotlists Sidebar.jsx to use onClick handlers
- [ ] Rebuild hotlists-sidebar

## Phase 5: Update Common Footer

- [ ] Update Footer.jsx to use onClick handlers
- [ ] Rebuild common-footer

## Phase 6: Angular Router for Dashboard Landing Page

- [ ] Add @angular/router dependency to dashboard-landing
- [ ] Create route component files for dashboard sub-paths
- [ ] Create src/components/claims.component.ts (placeholder)
- [ ] Create src/components/policies.component.ts (placeholder)
- [ ] Create src/components/analytics.component.ts (placeholder)
- [ ] Create src/components/home.component.ts (placeholder)
- [ ] Configure routes in app.module.ts
- [ ] Update app.component.ts template to include router-outlet
- [ ] Configure base path for Angular router
- [ ] Update mount function in main.ts to handle routing
- [ ] Rebuild dashboard-landing

## Phase 7: React Router for Hotlists Dashboard

- [ ] Add react-router-dom dependency to hotlists-dashboard
- [ ] Create route component files for hotlists sub-paths
- [ ] Create src/components/DefectsView.jsx (placeholder)
- [ ] Create src/components/TestsView.jsx (placeholder)
- [ ] Create src/components/PrioritiesView.jsx (placeholder)
- [ ] Create src/components/HomeView.jsx (placeholder)
- [ ] Update Dashboard.jsx to include React Router
- [ ] Update main.jsx mount function to handle routing
- [ ] Rebuild hotlists-dashboard

## Phase 8: Integration Testing

- [ ] Test header cross-mode navigation
- [ ] Test sidebar within-mode navigation (dashboard)
- [ ] Test sidebar within-mode navigation (hotlists)
- [ ] Test browser back button
- [ ] Test browser forward button
- [ ] Test deep linking to dashboard sub-route
- [ ] Test deep linking to hotlists sub-route
- [ ] Test right-click "Open in new tab"
- [ ] Test middle-click to open in new tab

## Phase 9: Documentation Updates

- [ ] Update docs/SPEC.md with client-side routing architecture
- [ ] Update CLAUDE.md with routing implementation details
