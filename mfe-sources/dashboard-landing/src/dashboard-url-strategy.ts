import { UrlHandlingStrategy, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * Custom URL handling strategy that only processes URLs under /dashboard
 * This prevents Angular router from throwing errors when the shell navigates
 * to other modes (e.g., /hotlists)
 */
@Injectable()
export class DashboardUrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url: UrlTree): boolean {
    // Only process URLs that start with /dashboard
    const path = url.toString();
    return path.startsWith('/dashboard') || path === '/';
  }

  extract(url: UrlTree): UrlTree {
    return url;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    return newUrlPart;
  }
}
