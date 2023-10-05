import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../../Model/item.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  constructor(private http: HttpClient) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  items: any = {}

  fileToUpload: File = new File([], 'dummy');
  apiUrl = environment.apiBaseUrl;

  handleFileInput(files: FileList) {


    this.fileToUpload = files.item(0)!;
    console.log(this.fileToUpload);
    const formData: FormData = new FormData();
    formData.append('Image', this.fileToUpload);
    this.http.post(`${this.apiUrl}/upload`, formData).subscribe((res) => {
      console.log(res);
    });
  }


  ngOnInit(): void {
    //window.scrollTo(0, 0);
    // this.product_id = this.route.snapshot.params['id'];
    // console.log("Product Id", this.product_id);
    this.http.get(`${this.apiUrl}/product/getAll`).subscribe((res) => {
      this.items = res;
      console.log(this.items.data);
    })

  }
}
