import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../../core/services/task';

import { UserService } from '../../../core/services/user';

import { AuthService } from '../../../core/services/auth';

import { Task } from '../../../core/models/task';

import { ToastrService } from 'ngx-toastr';

import {
  LucidePlus,
  LucidePencil,
  LucideEdit,
  LucidePlusSquare,
  LucideX,
  LucideHeading,
  LucideFileText,
  LucideClock,
  LucideLoader2,
  LucideCheckCircle,
  LucideListTodo,
  LucideUsers,
  LucideXCircle,
  LucideCheck,
} from '@lucide/angular';

@Component({
  selector: 'app-task-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucidePlus,
    LucidePencil,
    LucideEdit,
    LucidePlusSquare,
    LucideX,
    LucideHeading,
    LucideFileText,
    LucideClock,
    LucideLoader2,
    LucideCheckCircle,
    LucideListTodo,
    LucideUsers,
    LucideXCircle,
    LucideCheck,
  ],

  templateUrl: './task-form.html',

  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  private fb = inject(FormBuilder);

  private taskService = inject(TaskService);

  private userService = inject(UserService);

  private authService = inject(AuthService);

  private toastr = inject(ToastrService);

  private cdr = inject(ChangeDetectorRef);

  @Input()
  task?: Task;

  @Input()
  isModal: boolean = false; // NEW: Flag to indicate modal mode

  @Output()
  taskCreated = new EventEmitter<void>();

  @Output()
  closeModal = new EventEmitter<void>(); // NEW: Emitter for closing modal

  users: any[] = [];

  loading = false;

  showForm = false;

  /** Signals parent layout (task card) to stack actions so the editor is full width */
  @HostBinding('class.task-form--card-open')
  get cardEditorOpen(): boolean {
    return !!this.task && this.showForm;
  }

  /** Stable field id suffix so labels stay unique per card / create form */
  get fieldIdSuffix(): string {
    return this.task?._id ?? 'create';
  }

  currentUser = this.authService.getUser();

  taskForm = this.fb.group({
    title: ['', Validators.required],

    description: ['', Validators.required],

    status: ['PENDING'],

    assignedTo: [''],
  });

  ngOnInit(): void {
    this.loadAssignableUsers();

    // Edit Mode - Auto-show form if in modal mode
    if (this.task) {
      this.showForm = this.isModal ? true : false; // Show modal form immediately if in modal mode

      this.taskForm.patchValue({
        title: this.task.title,

        description: this.task.description,

        status: this.task.status,

        assignedTo: this.task.assignedTo?._id,
      });

      this.cdr.detectChanges();
    }
  }

  loadAssignableUsers(): void {
    if (this.currentUser?.role === 'MANAGER') {
      this.userService.getUsers().subscribe({
        next: (response) => {
          this.users = response.users;

          this.cdr.detectChanges();
        },
      });
    }

    if (this.currentUser?.role === 'TEAM_LEAD') {
      this.userService.getTeamMembers().subscribe({
        next: (response) => {
          this.users = [this.currentUser, ...response.users];

          this.cdr.detectChanges();
        },
      });
    }
  }

  // NEW: Helper method to close form/modal
  closeForm(): void {
    if (this.isModal) {
      this.closeModal.emit();
    } else {
      this.showForm = false;
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.cdr.detectChanges();

    // EDIT MODE
    if (this.task) {
      const taskId = this.task._id;

      this.taskService.updateTask(taskId, this.taskForm.value).subscribe({
        next: () => {
          // Assign separately
          if (this.taskForm.value.assignedTo) {
            this.taskService.assignTask(taskId, this.taskForm.value.assignedTo).subscribe();
          }

          this.loading = false;

          this.showForm = false;

          this.taskCreated.emit();

          this.toastr.success('Task updated successfully');

          // Close modal if in modal mode
          if (this.isModal) {
            this.closeModal.emit();
          }

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);

          this.loading = false;

          this.toastr.error(error.error?.message || 'Something went wrong');

          this.cdr.detectChanges();
        },
      });

      return;
    }

    // CREATE MODE
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset({
          status: 'PENDING',
        });

        this.showForm = false;

        this.loading = false;

        this.taskCreated.emit();

        this.toastr.success('Task created successfully');

        // Close modal if in modal mode (for create modal if implemented)
        if (this.isModal) {
          this.closeModal.emit();
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);

        this.loading = false;

        this.toastr.error(error.error?.message || 'Something went wrong');

        this.cdr.detectChanges();
      },
    });
  }
}
