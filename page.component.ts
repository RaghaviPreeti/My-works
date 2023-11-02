import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})

export class PageComponent {
  formData: FormGroup;
  formDataArray: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      time: ['', Validators.required]
    });
  //formData = {
    //name: '',
    //email: '',
    //time: ''
  }
    onSubmit() {
      if (this.formData.valid) {
        this.formDataArray.push(this.formData.value);
        this.exportToExcel(this.formDataArray);
        this.formData.reset();
      }
    }
     
      //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([this.formData]);
      //const wb: XLSX.WorkBook = XLSX.utils.book_new();
      //XLSX.utils.book_append_sheet(wb, ws, 'RegistrationData');
      //XLSX.writeFile(wb, 'registration_data.xlsx');
      //console.log(this.formData);
      //console.log('Form submitted successfully!');

      exportToExcel(data: any[]): void {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'RegistrationData');
        const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registration_data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      }

    
}
