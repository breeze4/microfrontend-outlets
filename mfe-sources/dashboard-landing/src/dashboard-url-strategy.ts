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
    console.log(`[DEBUG:NAVIGATE] [Angular] shouldProcessUrl called with: ${path}`);
    const result = path.startsWith('/dashboard') || path === '/';
    console.log(`[DEBUG:NAVIGATE] [Angular] shouldProcessUrl returning: ${result}`);
    return result;
  }

  extract(url: UrlTree): UrlTree {
    console.log(`[DEBUG:NAVIGATE] [Angular] extract called with: ${url.toString()}`);
    const result = url;
    console.log(`[DEBUG:NAVIGATE] [Angular] extract returning: ${result.toString()}`);
    return result;
  }

  merge(newUrlPart: UrlTree, rawUrl: UrlTree): UrlTree {
    console.log('[DEBUG:NAVIGATE] [Angular] merge called');
    console.log(`[DEBUG:NAVIGATE] [Angular] merge newUrlPart: ${newUrlPart.toString()}`);
    console.log(`[DEBUG:NAVIGATE] [Angular] merge rawUrl: ${rawUrl.toString()}`);
    const result = newUrlPart;
    console.log(`[DEBUG:NAVIGATE] [Angular] merge returning: ${result.toString()}`);
    return result;
  }
}
