import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewComponent } from "./new/new.component";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppointmentComponent } from "./appointment.component";
import { ByDayComponent } from "./byDay/byDay.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
    declarations: [
        NewComponent,
        AppointmentComponent,
        ByDayComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        SharedModule,
        DragDropModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    bootstrap: [NewComponent],
    exports: [NewComponent, AppointmentComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppointmentModule {}
