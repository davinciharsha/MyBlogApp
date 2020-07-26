import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { MembersComponent } from '../app/members/members.component';
import { MessagesComponent } from '../app/messages/messages.component';
import { ListComponent } from '../app/list/list.component';
import { AuthGuard } from '../_guards/auth.guard';

export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MembersComponent, canActivate: [AuthGuard]},
            {path: 'messages', component: MessagesComponent},
            {path: 'list', component: ListComponent}
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
