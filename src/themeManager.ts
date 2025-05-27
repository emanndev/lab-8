export class ThemeManager {
    private body: HTMLElement = document.body;
    private header: HTMLElement = document.querySelector('header') as HTMLElement;
    private themeToggle: HTMLElement = document.getElementById('themeToggle') as HTMLElement;
    private themeIcon: HTMLImageElement = document.getElementById('themeIcon') as HTMLImageElement;
    private headingText: HTMLElement = document.querySelector('.heading') as HTMLElement;
    private cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card-group');
    private buttons: NodeListOf<HTMLElement> = document.querySelectorAll('.btn');
    constructor() {
       this.initializeTheme
    }

    private initializeTheme(): void {
        const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        currentTheme === 'light' ? this.setLightTheme() : this.setDarkTheme();
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
        this.themeIcon.src = './assets/images/icon-moon.svg';
        this.headingText.style.color = '#091540';

        this.cards.forEach(card => {
            card.style.backgroundColor = '#ffffff';
            card.style.borderColor = '#e1e4e8';
            card.style.color = '#091540';
            
            const removeBtn = card.querySelector('.remove-btn') as HTMLElement;
           if(removeBtn) removeBtn.style.color = '#091540';

           const p = card.querySelector('p') as HTMLElement;
           if(p) p.style.color = '#091540';
        });

    }

    private setDarkTheme(){

    }
}