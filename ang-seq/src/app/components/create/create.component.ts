import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder,  Validators} from '@angular/forms';
import {IssueService} from '../../issue.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService : IssueService, private router: Router,
    private fb: FormBuilder) {
      this.createForm = this.fb.group({
        title: ['', Validators.required],
        responsable: '',
        description: '',
        severity: ''
      });
     }

     addIssue(title, responsable, description, severity){
       this.issueService.addIssue(title, responsable, description, severity)
        .subscribe(()=>{
          this.router.navigate(['/list']);
        })
     }

  ngOnInit() {
  }

}
