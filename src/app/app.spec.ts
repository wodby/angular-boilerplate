import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

// Renders the application shell with the real routes at the given URL.
async function renderAt(url: string) {
  TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  const fixture = TestBed.createComponent(App);
  await TestBed.inject(Router).navigateByUrl(url);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('App', () => {
  it('renders the home page', async () => {
    const page = await renderAt('/');

    expect(page.querySelector('h1')?.textContent).toBe('Your Angular app is running.');
    expect(page.textContent).toMatch(/Angular \d+\.\d+/);
  });

  it('navigates to the about page without a page load', async () => {
    const page = await renderAt('/');

    page.querySelector<HTMLAnchorElement>('.actions a[href="/about"]')?.click();
    await vi.waitFor(() =>
      expect(page.querySelector('h1')?.textContent).toBe('Routes without a server.'),
    );

    expect(TestBed.inject(Router).url).toBe('/about');
    expect(page.querySelector('nav a.active')?.textContent).toBe('About');
    expect(page.querySelector('dd code')?.textContent).toBe('/about');
  });

  it('renders the not found page for unknown paths', async () => {
    const page = await renderAt('/missing');

    expect(page.querySelector('h1')?.textContent).toBe('Page not found.');
    expect(page.querySelector('.intro code')?.textContent).toBe('/missing');
  });
});
