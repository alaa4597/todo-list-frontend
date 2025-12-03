import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Todo {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
}


interface ApiResponse {
  success: boolean;
  message: string;
  data: Todo[] | Todo; 
}

@Component({
  selector: 'app-todo-list',
  imports:[CommonModule,FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})


 

export class TodoList implements OnInit { 
  todos: Todo[] = [];
  newTodo: string = '';
  loading: boolean = false;
  apiUrl = 'http://localhost:3005/api/task';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.loading = true;
    this.http.get<ApiResponse>(this.apiUrl).subscribe({
      next: (res) => {
        this.todos = res.data as Todo[]; 
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
        this.loading = false;
      }
    });
  }

  addTodo() {
    if (!this.newTodo.trim()) return;

    this.loading = true;
    this.http.post<ApiResponse>(this.apiUrl, { title: this.newTodo }).subscribe({
      next: (res) => {
        const todo = res.data as Todo; 
        this.todos.unshift(todo);
        this.newTodo = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        this.loading = false;
      }
    });
  }
}



