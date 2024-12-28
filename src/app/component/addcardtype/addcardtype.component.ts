import { Component, OnInit } from '@angular/core';
import { CardType } from '../../models/cardtype.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardtypeService } from '../../services/cardtype.service';

@Component({
  selector: 'app-addcardtype',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './addcardtype.component.html',
  styleUrl: './addcardtype.component.css'
})

export class AddcardtypeComponent implements OnInit {

  _response: any;
  title = 'Add Card Type';
  editId = '';
  isedit = false;
  editdata!: CardType;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: CardtypeService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editId = this.act.snapshot.paramMap.get('id') as string;
 //   console.log(this.editId);
    
    if (this.editId != '' && this.editId != null) {
      this.isedit = true
      this.title = 'Edit Card Type';
      this.cardtypeform.controls['id'].disable();
      this.service.GetbyId(this.editId).subscribe(item => {
        this.editdata = item;
        this.cardtypeform.setValue({
          id: this.editdata.id, 
          name: this.editdata.name, 
          limit: this.editdata.limit,
          note:this.editdata.note,
        })
      })
    }

  }

  cardtypeform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control('', Validators.required),
    limit: this.builder.control('', Validators.required),
    note: this.builder.control('', Validators.required)
  })

  SaveCardType() {
    if (this.cardtypeform.valid) {

      let _obj: CardType = {
        id: this.cardtypeform.value.id as string,
        name: this.cardtypeform.value.name as string,
        limit: this.cardtypeform.value.limit as string,
        note: this.cardtypeform.value.note as string
      }

      if (!this.isedit) {
        this.service.CreateCardType(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/CardType');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editId;
        this.service.UpdateCardType(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/CardType');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}
