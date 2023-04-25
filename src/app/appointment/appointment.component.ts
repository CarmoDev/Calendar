import { Component } from "@angular/core";
import { ModalService } from "../services/modal.service";

@Component({
    selector: "app-appointment",
    templateUrl: "./appointment.component.html",
    styleUrls: ["./appointment.component.css"],
})
export class AppointmentComponent {
    constructor(public modal: ModalService) {}

    openModal($event: Event) {
        $event.preventDefault();

        this.modal.handleToggleModal("appointment");
    }
}
