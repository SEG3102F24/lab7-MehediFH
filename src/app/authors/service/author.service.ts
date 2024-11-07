import { inject, Injectable } from '@angular/core';
import { Author } from '../model/author';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const Url = 'http://localhost:8080/books-api/';

@Injectable({
    providedIn: 'root'
})
export class AuthorsService {
    private http: HttpClient = inject(HttpClient);

    public getAuthorById(id: number): Observable<Author> {
        return this.http.get<Author>(`${Url}authors/${id}`);
    }

    public getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(`${Url}authors`);
    }

    public addAuthor(author: Author): Observable<Author> {
        return this.http.post<Author>(`${Url}authors`, author);
    }

    public getAuthorsNamed(firstName: string, lastName: string): Observable<Author[]> {
        const options = {
            params: new HttpParams().set('firstName', firstName).set('lastName', lastName)
        };
        return this.http.get<any>(`${Url}authors`, options).pipe(
            map(response => response._embedded ? response._embedded.authors : [])
        );
    }
}
