import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { MembersComponent } from '../app/mem/members/members.component';
import { MessagesComponent } from '../app/messages/messages.component';
import { ListComponent } from '../app/list/list.component';
import { AuthGuard } from '../_guards/auth.guard';
import { MemberDetailComponent } from '../app/mem/member-detail/member-detail.component';
import { MemberDetailResolver } from 'src/_resolvers/member-detail.resolver';
import { MemberListResolver } from 'src/_resolvers/member-list.resolver';
import { MemberEditComponent } from './mem/member-edit/member-edit.component';
import { MemberEditResolver } from 'src/_resolvers/member-edit.resolver';
import { PreventLosingUnsaved } from 'src/_guards/preventLosingUnsaved';
import { ListResolver } from 'src/_resolvers/list.resolver';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members', component: MembersComponent,
                resolve: { users: MemberListResolver }
            },
            {
                path: 'members/:id', component: MemberDetailComponent,
                resolve: { user: MemberDetailResolver }
            },
            {
                path: 'member-edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver }, canDeactivate: [PreventLosingUnsaved]
            },
            { path: 'messages', component: MessagesComponent },
            { path: 'list', component: ListComponent, resolve: { users: ListResolver } },
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
