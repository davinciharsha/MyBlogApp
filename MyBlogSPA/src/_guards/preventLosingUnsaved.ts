import { Injectable } from '@angular/core';
import { MemberEditComponent } from '../app/mem/member-edit/member-edit.component';
import { CanDeactivate } from '@angular/router';

@Injectable()

export class PreventLosingUnsaved implements CanDeactivate<MemberEditComponent>{
    // tslint:disable-next-line: typedef
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('unsaved changes will be lost. Are you sure you want to leave?');
        }
        return true;
    }
}
