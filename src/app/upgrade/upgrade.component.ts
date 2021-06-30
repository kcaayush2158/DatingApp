import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor(private router :Router) { }
  
  ngOnInit(): void {
    this.router.navigate(["/upgrade/basic"]);
  }

}
