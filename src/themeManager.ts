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
  private cards: NodeListOf<HTMLElement> =
    document.querySelectorAll('.card-group');
  private buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.btn');

  constructor() {
    this.initializeTheme();
    this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
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
    this.body.style.backgroundColor = '#fff';
    this.header.style.backgroundColor = '#f0f2f5';
    this.header.style.color = '#091540';
    this.themeIcon.className = 'fas fa-moon';
    this.headingText.style.color = '#091540';

    this.cards.forEach((card) => {
      card.style.backgroundColor = '#ffffff';
      card.style.borderColor = '#e1e4e8';
      card.style.color = '#091540';
      const btn1 = card.querySelector('.card1-btn1') as HTMLElement;
      if (btn1) btn1.style.color = '#091540';
      const p = card.querySelector('p') as HTMLElement;
      if (p) p.style.color = '#091540';
    });

    this.buttons.forEach((button) => {
      if (button.classList.contains('btn1')) {
        button.style.backgroundColor = '#F25C54';
        button.style.color = '#FBFDFE';
      } else {
        button.style.backgroundColor = '#e1e4e8';
        button.style.color = '#091540';
        button.style.borderColor = '#d1d5da';
      }
    });

    localStorage.setItem('theme', 'light');
  }

  private setDarkTheme(): void {
    this.body.dataset.theme = 'dark';
    this.body.style.backgroundColor = '#091540';
    this.header.style.backgroundColor = '#202535';
    this.header.style.color = '#FBFDFE';
    this.themeIcon.className = 'fas fa-sun';
    this.headingText.style.color = '#FBFDFE';

    this.cards.forEach((card) => {
      card.style.backgroundColor = '#202535';
      card.style.borderColor = '#535868';
      card.style.color = '#FBFDFE';
      const btn1 = card.querySelector('.card1-btn1') as HTMLElement;
      if (btn1) btn1.style.color = '#FBFDFE';
      const p = card.querySelector('p') as HTMLElement;
      if (p) p.style.color = '#FBFDFE';
    });

    this.buttons.forEach((button) => {
      if (button.classList.contains('btn1')) {
        button.style.backgroundColor = '#F25C54';
        button.style.color = '#091540';
      } else {
        button.style.backgroundColor = '#2F364B';
        button.style.color = '#FBFDFE';
        button.style.borderColor = '#535868';
      }
    });

    localStorage.setItem('theme', 'dark');
  }
}
