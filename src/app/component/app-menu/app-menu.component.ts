import { Component, DoCheck, effect, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Menu } from '../../models/user.model';
import { MaterialModule } from '../../material.module';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MatExpansionPanel } from '@angular/material/expansion';


@Component({
  selector: 'app-app-menu',
  standalone : true,
  imports: [MaterialModule, RouterOutlet, RouterLink,CommonModule ],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.css'
})
export class AppMenuComponent implements OnInit, DoCheck {
  logout = faRightFromBracket;
  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;
  closeAllPanels(): void {
    this.panels.forEach((panel) => panel.close());
  }
  constructor(private service: UserService, private router: Router) {
    effect(() => {
      this.MenuList = this.service._menulist();
    })
  }

  MenuList!: Menu[]
  LoginUser = ''
  showmenu = false;
  groupedMenuList: any[] = [];

  ngOnInit(): void {

    this.service.LoadMenuByRole().subscribe(item => {
  
      this.MenuList = item;      
      this.groupMenuByType();
      this.orderMenuGroups(); 
    })


  }
  navigateTo(menuCode: string): void {
    this.router.navigate([menuCode]);
    console.log(menuCode);
    
  }
  ngDoCheck(): void {
    this.LoginUser = localStorage.getItem('userName') as string;
    this.SetAccess();
  }
  
  SetAccess() {
    let userRole = localStorage.getItem('userRole');
    let currentUrl = this.router.url;
    if (currentUrl === '/register' || currentUrl === '/login' || currentUrl === '/reset_password' ||
      currentUrl === '/forget_password') {
      this.showmenu = false;
    } else {
      this.showmenu = true;
    }
  }
  groupMenuByType() {
    const groups: any = {};

    this.MenuList.forEach(item => {
      if (!groups[item.type]) {
        groups[item.type] = [];
      }
      groups[item.type].push(item);

    });

    this.groupedMenuList = Object.keys(groups).map(key => ({
      name: key,
      menus: groups[key]
    }));
  }
  orderMenuGroups() {
    const order = ['Products', 'Cards', 'Team', 'Business', 'Access'];
    this.groupedMenuList = order.map(groupName => {
      const group = this.groupedMenuList.find(g => g.name === groupName);
      return group || null;  // Nếu nhóm không có, trả về null.
    }).filter(group => group !== null);  // Loại bỏ những nhóm không tồn tại
    console.log(this.groupedMenuList);
    
  }
  // Optionally define icon mappings based on menu type or menuCode
  getIconForGroup(groupName: string): string {
    switch (groupName) {
      case 'Business': return 'business';
      case 'Access': return 'lock';
      case 'Cards': return 'credit_card';
      case 'Team': return 'group';
      default: return 'category';
    }
  }

  getIconForItem(menuCode: string): string {
    switch (menuCode) {
      case 'Invoice': return 'assignment';
      case 'PurchaseInvoice': return 'shopping_cart';
      case 'ExpenseInvoice': return 'receipt_long';
      case 'Branch':return 'store';
      case 'Supplier':return 'local_shipping';
      case 'User':return 'group';
      case 'UserRole':return 'security';
      case 'Employee':return 'assignment_ind';
      case 'MembershipCard':return 'card_membership';
      case 'CardType':return 'style';
      case 'Product':return 'redeem';
      case 'Image':return 'image';
      default: return 'description';
    }
  }

}