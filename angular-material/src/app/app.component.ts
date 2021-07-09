import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phone','email','actions'];
  public showAdd = true;
  public showUpdate = false;
  public users: any[];
  public userAdd: any;
  public userEdit: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userAdd = {};
    this.loadData();

  }

  loadData() {
    this.userService.getList().subscribe(
      (response: any) => {
        this.users = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteUser(id: number) {
    let confirmDelete = confirm('Are you sure to delete this user ?');
    if (confirmDelete) {
      this.userService.deleteUserById(id).subscribe((response: any) => {
        if (response) {
          alert('Deleted');
          this.loadData();
          this.showAdd = true;
          this.showUpdate = false;
        }
      });
    }
  }

  addForm() {
    this.userService.addUser(this.userAdd).subscribe((data: any) => {
      if (data) {
        alert('User was successfully added');
        this.loadData();
        this.userAdd = {};
      }
    });
  }

  editUser(id: number) {
    this.userService.getUserById(id).subscribe((data: any) => {
      this.userEdit = data;
      this.showAdd = false;
      this.showUpdate = true;
    });
  }

  updateForm() {
    this.userService.updateUser(this.userEdit).subscribe((response: any) => {
      if (response) {
        alert('Saved');
        this.userEdit = {};

        this.loadData();
        this.showAdd = true;
        this.showUpdate = false;
      }
    });
  }
}
