import { CanActivateFn, Router } from '@angular/router';
import { DataServiceService } from './service/data-service.service';

export const authGuard: CanActivateFn = (route, state) => {
 // var router: Router
 
  const dataService = new DataServiceService(); 
  const userRole = dataService.role;
  // const currentRoute = router.url;

//  if (userRole=="Admin" )
// {
//   return true
// }
// else if (userRole=="Customer") 
// {
//   return true
// }
 
  return true;
};
