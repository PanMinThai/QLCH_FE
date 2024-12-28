import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CreateMembershipCard } from '../../models/membershipcard.model';
import { ToastrService } from 'ngx-toastr';
import { MembershipcardService } from '../../services/membershipcard.service';
import { CardType } from '../../models/cardtype.model';
import { CardtypeService } from '../../services/cardtype.service';

@Component({
  selector: 'app-addmembershipcard',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './addmembershipcard.component.html',
  styleUrl: './addmembershipcard.component.css'
})
export class AddmembershipcardComponent implements OnInit {

  _response: any;
  title = 'Add Membership CardCard';
  editId = '';
  isedit = false;
  editdata!: CreateMembershipCard;
  cardtypelist : CardType[];

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: MembershipcardService, private act: ActivatedRoute, private cardTypeService: CardtypeService) {

  }

  ngOnInit(): void {
    this.LoadCardTypes();
    this.editId = this.act.snapshot.paramMap.get('id') as string;
 //   console.log(this.editId);
    
    if (this.editId != '' && this.editId != null) {
      this.isedit = true
      this.title = 'Edit MembershipCard';
      this.mform.controls['id'].disable();
      this.service.GetbyId(this.editId).subscribe(item => {
        this.editdata = item;
        this.mform.setValue({
          id: this.editdata.id, 
          cardTypeId: this.editdata.cardTypeId, 
          customerName: this.editdata.customerName,
          phone: this.editdata.phone
        })
      })
    }

  }
  LoadCardTypes() {
    this.cardTypeService.GetAll().subscribe(item => {
      this.cardtypelist = item;
    })
  }
  mform = this.builder.group({
    id: this.builder.control(''),
    cardTypeId: this.builder.control('',Validators.required),
    customerName: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required)
  })

  SaveMembershipCard() {
    if (this.mform.valid) {

      let _obj: CreateMembershipCard = {
        id: this.mform.value.id as string,
        cardTypeId: this.mform.value.cardTypeId as string,
        customerName: this.mform.value.customerName as string,
        phone: this.mform.value.phone as string,
      }

      if (!this.isedit) {
        this.service.CreateMembershipCard(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/MembershipCard');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editId;
        this.service.UpdateMembershipCard(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/MembershipCard');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}
