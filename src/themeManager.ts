export class ThemeManager {
  private body: HTMLElement = document.body;
  private header: HTMLElement = document.querySelector('header') as HTMLElement;
  private themeToggle: HTMLElement = document.getElementById(
    'themeToggle'
  ) as HTMLElement;
  private themeIcon: HTMLElement = document.getElementById(
    'themeIcon'
  ) as HTMLElement;
  private headingText: HTMLElement = document.querySelector(
    '.heading'
  ) as HTMLElement;
  private logo: HTMLElement = document.getElementById('logo') as HTMLElement;
  private searchBar: HTMLInputElement = document.getElementById(
    'search-bar'
  ) as HTMLInputElement;
  private navbuttons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('.btn');

  constructor() {
    this.initializeTheme();
    this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  private initializeTheme(): void {
    const currentTheme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    if (currentTheme === 'light') {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  private toggleTheme(): void {
    if (this.body.dataset.theme === 'light') {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  private setLightTheme(): void {
    this.body.dataset.theme = 'light';
    this.header.style.background = 'none';
    this.header.style.color = '#2D3748';
    this.themeIcon.className = 'fas fa-moon';
    this.headingText.style.color = '#2D3748';
    this.logo.className = 'fa-solid fa-toolbox';
    this.logo.style.color = '#2D3748';
    this.searchBar.dataset.theme = 'light';
    this.navbuttons.forEach((button) => {
      button.dataset.theme = 'light';
    });
    // this.cards.forEach((card) => {
    //   card.dataset.theme = 'light';
    // });
    localStorage.setItem('theme', 'light');
  }

  private setDarkTheme(): void {
    this.body.dataset.theme = 'dark';
    this.header.style.background = 'none';
    this.header.style.color = '#E2E8F0';
    this.themeIcon.className = 'fas fa-sun';
    this.headingText.style.color = '#E2E8F0';
    this.logo.className = 'fa-solid fa-toolbox';
    this.logo.style.color = '#E2E8F0';
    this.searchBar.dataset.theme = 'dark';
    this.navbuttons.forEach((button) => {
      button.dataset.theme = 'dark';
    });
    localStorage.setItem('theme', 'dark');
  }

  private handleScroll(): void {
    if (window.scrollY > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
}
