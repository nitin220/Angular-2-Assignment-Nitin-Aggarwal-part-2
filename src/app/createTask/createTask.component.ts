import {Component, OnInit} from "@angular/core";
import {Task} from "../task";
import {AppService} from "../app.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'create',
  templateUrl: './createTask.component.html',
  styleUrls: ['']
})

export class CreateComponent implements OnInit {

  index: number;

  task: Task = new Task('', '', '', '', '');

  constructor(private service: AppService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((data: any) => {
      this.index = +data.indexSent;
      if (this.index || this.index === 0) {
        // this.task = this.service.taskArray[this.index];
        this.service.getData3().subscribe((data: any) => {
            this.task = data[this.index]
            //alert(JSON.stringify(data))
          },
          (err: any) => alert(err), () => {
            alert('Success')
          });
      }
    });
  }

  pushTask() {
    if (this.index || this.index === 0) {
      //this.service.update(this.index, this.task);
      // this.service.remove(this.task._id).subscribe((data: any) => alert(JSON.stringify(data)));
      this.service.updateTask(this.task).subscribe()//(data: any) => alert(JSON.stringify(data)))
    } else {
      //this.service.add(this.task);
      this.service.addTask(this.task).subscribe()//(data: any) => alert(JSON.stringify(data)))
    }

    this.router.navigate(['show']);
  }
}
