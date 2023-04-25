import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { ByDayComponent } from "./appointment/byDay/byDay.component";

const routes: Routes = [
    {
        path: "",
        component: CalendarComponent,
    },
    {
        path: "appointment/:date",
        component: ByDayComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
