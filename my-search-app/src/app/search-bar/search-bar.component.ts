import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchQuery: string = '';
  totalResults: number =0;
  articles: any[] = [
    {
      title: 'Understanding the difference between grid-template and grid-auto',
      date: 'Oct 09, 2018',
      content:
        'With all the new properties related to CSS Grid Layout, one of the ' +
        'distinctions that always confused me was the difference between the ' +
        'grid-template-* and grid-auto-* properties. Specifically the difference ' +
        'between grid-template-rows/columns and grid-auto-rows/columns. Although I ' +
        'knew they were to d...',
      title2: 'Recreating the GitHub Contribution Graph with CSS Grid',
    },
    // Add more articles as needed
  ];
  filteredArticles: any[] = [];

  constructor() {
    this.filteredArticles = this.articles; // Initialize filteredArticles with all articles
  }

  search(): void {
    this.filteredArticles = this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        article.date.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        article.content
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        article.title2.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  highlight(text: string, query: string): string {
    if (!query) {
      return text;
    }
    return text.replace(
      new RegExp(query, 'gi'),
      (match) => `<mark>${match}</mark>`
    );
  }
  clearSearch(): void {
    this.searchQuery = '';
    this.search(); // Call search to update filteredArticles based on an empty query
  }
  updateTotalResults(): void {
    if (this.searchQuery) {
      this.totalResults = 0; // Reset totalResults to 0
      for (const article of this.filteredArticles) {
        this.totalResults += (article.title.match(new RegExp(this.searchQuery, 'gi')) || []).length;
        this.totalResults += (article.date.match(new RegExp(this.searchQuery, 'gi')) || []).length;
        this.totalResults += (article.content.match(new RegExp(this.searchQuery, 'gi')) || []).length;
        this.totalResults += (article.title2.match(new RegExp(this.searchQuery, 'gi')) || []).length;
      }
    } else {
      this.totalResults = 0; // Reset totalResults to 0 when searchQuery is empty
    }
  }
  
  
}
