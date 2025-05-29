import { ExtensionsManager } from './extensionsManager';

jest.mock('../data/data.json', () => import('./__mocks__/data.json'), { virtual: true });

describe('ExtensionsManager', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let extensionsManager: ExtensionsManager;
  let extensionsList: HTMLElement;
  let filterAll: HTMLButtonElement;
  let filterActive: HTMLButtonElement;
  let filterInactive: HTMLButtonElement;
  let searchBar: HTMLInputElement;

  beforeEach(() => {
    // Set up DOM structure to match index.html
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
              <button class="btn active" id="filter-all">All</button>
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
          <div class="cards-container" id="extensions-list"></div>
        </section>
      </main>
    `;

    extensionsList = document.getElementById('extensions-list') as HTMLElement;
    filterAll = document.getElementById('filter-all') as HTMLButtonElement;
    filterActive = document.getElementById('filter-active') as HTMLButtonElement;
    filterInactive = document.getElementById('filter-inactive') as HTMLButtonElement;
    searchBar = document.getElementById('search-bar') as HTMLInputElement;

    extensionsManager = new ExtensionsManager();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initial rendering', () => {
    it('renders all tools on initialization with filter "all"', () => {
      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards.length).toBe(8); 
      expect(cards[0].textContent).toMatch(/Babel/i);
      expect(cards[1].textContent).toMatch(/ESLint/i);
      expect(cards[7].textContent).toMatch(/Webpack/i);
    });
  });

  describe('filtering tools', () => {
    it('renders active tools when filter-active is clicked', () => {
      filterActive.click();
      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards.length).toBe(8);
    });

    it('renders no tools when filter-inactive is clicked', () => {
      filterInactive.click();
      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards.length).toBe(0);
    });

    it('renders all tools when filter-all is clicked after another filter', () => {
      filterActive.click(); 
      filterAll.click(); 
      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards.length).toBe(8); 
    });

    it('sets "all" filter when filter-all is clicked', () => {
      filterActive.click(); 
      filterAll.click();
      expect(filterAll.classList.contains('active')).toBe(true);
      expect(filterActive.classList.contains('active')).toBe(false);
      expect(filterInactive.classList.contains('active')).toBe(false);
    });

    it('sets "active" filter when filter-active is clicked', () => {
      filterActive.click();
      expect(filterActive.classList.contains('active')).toBe(true);
      expect(filterAll.classList.contains('active')).toBe(false);
      expect(filterInactive.classList.contains('active')).toBe(false);
    });

    it('sets "inactive" filter when filter-inactive is clicked', () => {
      filterInactive.click();
      expect(filterInactive.classList.contains('active')).toBe(true);
      expect(filterAll.classList.contains('active')).toBe(false);
      expect(filterActive.classList.contains('active')).toBe(false);
    });
  });

  describe('searching tools', () => {
    it('renders tools matching the search query', () => {
      searchBar.value = 'TypeScript';
      searchBar.dispatchEvent(new Event('input'));

      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards.length).toBe(1);
      expect(cards[0].textContent).toMatch(/TypeScript/i);
    });

    it('renders no tools when search query matches nothing', () => {
      searchBar.value = 'NonExistentTool';
      searchBar.dispatchEvent(new Event('input'));

      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards.length).toBe(0);
    });
  });

  describe('attachButtonListeners', () => {
    it('opens homepage links in new tab on click', () => {
      const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

      const homepageBtn = extensionsList.querySelector('.card-btn') as HTMLAnchorElement;
      homepageBtn.click();

      expect(openSpy).toHaveBeenCalledWith('https://babeljs.io/', '_blank');
      openSpy.mockRestore();
    });
  });

  describe('attachToggleListeners', () => {
    it('toggles active state and re-renders on toggle change', () => {
      const toggleInput = extensionsList.querySelector('input[type="checkbox"]') as HTMLInputElement;
      toggleInput.checked = false;
      toggleInput.dispatchEvent(new Event('change'));

      const cards = extensionsList.querySelectorAll('.card-group');
      expect(cards[0].querySelector('input')?.checked).toBe(false);
      filterActive.click();
      expect(extensionsList.querySelectorAll('.card-group').length).toBe(7);
    });
  });
});