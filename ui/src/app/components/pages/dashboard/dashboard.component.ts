import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../services/tasks/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports:[CommonModule],
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  errorMessage: string = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.fetchTasks().subscribe(
      (response) => {
        this.tasks = response.data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage = 'Failed to fetch tasks. Please try again.';
      }
    );
  }
}
