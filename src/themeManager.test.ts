import { ThemeManager } from './themeManager';

describe('ThemeManager', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let themeManager: ThemeManager;
  let body: HTMLElement;
  let header: HTMLElement;
  let themeToggle: HTMLElement;
  let themeIcon: HTMLElement;
  let headingText: HTMLElement;
  let logo: HTMLElement;
  let searchBar: HTMLInputElement;
  let navbuttons: NodeListOf<HTMLButtonElement>;

  beforeEach(() => {
    // Set up the DOM structure
    document.body.innerHTML = `
      <header>
        <div class="header-content">
          <div class="logo">
            <i id="logo" class="fa-solid fa-toolbox"></i>
            <h1 class="heading">Build Tools</h1>
          </div>
          <div class="header-actions">
            <input type="text" id="search-bar" placeholder="Search tools..." class="search-bar">
            <div class="filters">
              <button class="btn" id="filter-all">All</button>
              <button class="btn" id="filter-active">Active</button>
              <button class="btn" id="filter-inactive">Inactive</button>
            </div>
            <button id="themeToggle">
              <i id="themeIcon" class="fas fa-moon"></i>
            </button>
          </div>
        </div>
      </header>
      <main class="wrapper">
        <section class="main-section">
          <div class="cards-container" id="extensions-list">
            <div class="card-group"></div>
          </div>
        </section>
      </main>
    `;

    body = document.body;
    header = document.querySelector('header') as HTMLElement;
    themeToggle = document.getElementById('themeToggle') as HTMLElement;
    themeIcon = document.getElementById('themeIcon') as HTMLElement;
    headingText = document.querySelector('.heading') as HTMLElement;
    logo = document.getElementById('logo') as HTMLElement;
    searchBar = document.getElementById('search-bar') as HTMLInputElement;
    navbuttons = document.querySelectorAll('.btn');

    // Mock localStorage and matchMedia
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)' ? true : false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    themeManager = new ThemeManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeTheme', () => {
    it('sets dark theme by default if no localStorage value and system prefers dark', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
      themeManager = new ThemeManager();

      expect(body.dataset.theme).toBe('dark');
      expect(themeIcon.className).toBe('fas fa-sun');
      expect(headingText.style.color).toBe('rgb(226, 232, 240)');
      expect(logo.className).toBe('fa-solid fa-toolbox');
      expect(logo.style.color).toBe('rgb(226, 232, 240)');
      expect(searchBar.dataset.theme).toBe('dark');
      navbuttons.forEach((button) => {
        expect(button.dataset.theme).toBe('dark');
      });
    });

    it('sets light theme if localStorage has "light"', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValue('light');
      themeManager = new ThemeManager();

      expect(body.dataset.theme).toBe('light');
      expect(themeIcon.className).toBe('fas fa-moon');
      expect(headingText.style.color).toBe('rgb(45, 55, 72)');
      expect(logo.className).toBe('fa-solid fa-toolbox');
      expect(logo.style.color).toBe('rgb(45, 55, 72)');
      expect(searchBar.dataset.theme).toBe('light');
      navbuttons.forEach((button) => {
        expect(button.dataset.theme).toBe('light');
      });
    });
  });

  describe('theme toggling', () => {
    it('toggles from light to dark theme when themeToggle is clicked', () => {
      body.dataset.theme = 'light';
      themeToggle.click();

      expect(body.dataset.theme).toBe('dark');
      expect(themeIcon.className).toBe('fas fa-sun');
      expect(headingText.style.color).toBe('rgb(226, 232, 240)');
      expect(logo.className).toBe('fa-solid fa-toolbox');
      expect(logo.style.color).toBe('rgb(226, 232, 240)');
      expect(searchBar.dataset.theme).toBe('dark');
      navbuttons.forEach((button) => {
        expect(button.dataset.theme).toBe('dark');
      });
    });

    it('toggles from dark to light theme when themeToggle is clicked', () => {
      body.dataset.theme = 'dark';
      themeToggle.click();

      expect(body.dataset.theme).toBe('light');
      expect(themeIcon.className).toBe('fas fa-moon');
      expect(headingText.style.color).toBe('rgb(45, 55, 72)');
      expect(logo.className).toBe('fa-solid fa-toolbox');
      expect(logo.style.color).toBe('rgb(45, 55, 72)');
      expect(searchBar.dataset.theme).toBe('light');
      navbuttons.forEach((button) => {
        expect(button.dataset.theme).toBe('light');
      });
    });
  });

  describe('handleScroll', () => {
    it('adds scrolled class when scrollY > 50', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));

      expect(header.classList.contains('scrolled')).toBe(true);
    });

    it('removes scrolled class when scrollY <= 50', () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
      Object.defineProperty(window, 'scrollY', { value: 40, writable: true });
      window.dispatchEvent(new Event('scroll'));

      expect(header.classList.contains('scrolled')).toBe(false);
    });
  });
});
