import _ from 'lodash';
import { Tool } from './types';
import toolsData from './data/data.json';

export class ExtensionsManager {
  private tools: Tool[] = [...toolsData];
  private extensionsList: HTMLElement = document.getElementById(
    'extensions-list'
  ) as HTMLElement;
  private filterAll: HTMLButtonElement = document.getElementById(
    'filter-all'
  ) as HTMLButtonElement;
  private filterActive: HTMLButtonElement = document.getElementById(
    'filter-active'
  ) as HTMLButtonElement;
  private filterInactive: HTMLButtonElement = document.getElementById(
    'filter-inactive'
  ) as HTMLButtonElement;
  private searchBar: HTMLInputElement = document.getElementById(
    'search-bar'
  ) as HTMLInputElement;

  constructor() {
    this.initializeFilters();
    this.initializeSearch();
    this.renderTools('all');
  }

  private initializeFilters(): void {
    this.filterAll.addEventListener('click', () => {
      this.filterAll.classList.add('active');
      this.filterActive.classList.remove('active');
      this.filterInactive.classList.remove('active');
      this.renderTools('all');
    });
    this.filterActive.addEventListener('click', () => {
      this.filterActive.classList.add('active');
      this.filterAll.classList.remove('active');
      this.filterInactive.classList.remove('active');
      this.renderTools('active');
    });
    this.filterInactive.addEventListener('click', () => {
      this.filterInactive.classList.add('active');
      this.filterAll.classList.remove('active');
      this.filterActive.classList.remove('active');
      this.renderTools('inactive');
    });
  }

  private initializeSearch(): void {
    this.searchBar.addEventListener('input', (e: Event) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      this.renderTools(this.getActiveFilter(), query);
    });
  }

  private getActiveFilter(): 'all' | 'active' | 'inactive' {
    if (this.filterActive.classList.contains('active')) return 'active';
    if (this.filterInactive.classList.contains('active')) return 'inactive';
    return 'all';
  }

  private renderTools(
    filter: 'all' | 'active' | 'inactive',
    searchQuery: string = ''
  ): void {
    let filteredTools = this.tools;
    if (filter === 'active') {
      filteredTools = _.filter(this.tools, { active: true });
    } else if (filter === 'inactive') {
      filteredTools = _.filter(this.tools, { active: false });
    }

    if (searchQuery) {
      filteredTools = _.filter(
        filteredTools,
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery) ||
          tool.description.toLowerCase().includes(searchQuery)
      );
    }

    const sortedTools = _.orderBy(filteredTools, ['name'], ['asc']);
    this.extensionsList.innerHTML = sortedTools
      .map(
        (tool) => `
          <div class="card-group cards">
            <div class="icon-container">
              <i class="${tool.icon}" aria-hidden="true"></i>
            </div>
            <div class="icons-info">
              <h1>${tool.name}</h1>
              <p>${tool.description}</p>
              <div class="tool-details">
                <span class="detail-item"><i class="fas fa-tag" aria-hidden="true"></i> Version: ${tool.version}</span>
                <span class="detail-item"><i class="fas fa-download" aria-hidden="true"></i> Downloads: ${tool.numberOfDownloads.toLocaleString()}</span>
                <small><i class="fas fa-calendar-alt" aria-hidden="true"></i> Last Updated: ${tool.lastUpdated}</small>
              </div>
            </div>
            <div class="card-buttons">
              <a href="${tool.homepage}" target="_blank" class="card-btn"><i class="fas fa-external-link-alt" aria-hidden="true"></i> Get More Info</a>
              <label class="toggle-switch">
                <input type="checkbox" ${tool.active ? 'checked' : ''} data-index="${this.tools.indexOf(tool)}">
                <span class="slider"></span>
              </label>
            </div>
          </div>
        `
      )
      .join('');

    this.attachButtonListeners();
    this.attachToggleListeners();
  }

  private attachButtonListeners(): void {
    const homepageButtons = this.extensionsList.querySelectorAll('.card-btn');
    homepageButtons.forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        e.preventDefault();
        window.open((btn as HTMLAnchorElement).href, '_blank');
      });
    });
  }

  private attachToggleListeners(): void {
    const toggleInputs = this.extensionsList.querySelectorAll(
      '.toggle-switch input'
    );
    toggleInputs.forEach((input) => {
      input.addEventListener('change', (e: Event) => {
        const index = parseInt(
          (e.target as HTMLInputElement).dataset.index || '0'
        );
        this.tools[index].active = (e.target as HTMLInputElement).checked;
        this.renderTools(
          this.getActiveFilter(),
          this.searchBar.value.toLowerCase()
        );
      });
    });
  }
}
