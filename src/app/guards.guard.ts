import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './pages/admin/website/services/auth.service';
import { map, take } from 'rxjs';

export const guardsGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  return auth.currentUserName$.pipe(
    map(user => {
      if (!user) {
        router.navigate(['/signin']);
        return false;
      } else {
        return true;
      }
    })
  );
};
