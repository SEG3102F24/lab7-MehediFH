import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthorsService } from './service/author.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authorId!: number;
  author: any = null;
  errorMessage: string = '';

  constructor(private authorsService: AuthorsService) {}

  getAuthor() {
    this.authorsService.getAuthorById(this.authorId).subscribe({
      next: (data) => {
        this.author = data;
        this.errorMessage = '';
      },
      error: () => {
        this.author = null;
        this.errorMessage = 'Author not found';
      }
    });
  }
}
