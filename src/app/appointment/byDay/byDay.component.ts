import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
    CdkDropListGroup,
    CdkDragExit,
    CdkDragEnter,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppointmentService } from "src/app/services/appointments.service";

@Component({
    selector: "byDay-all",
    templateUrl: "./byDay.component.html",
    styleUrls: ["./byDay.component.css"],
})
export class ByDayComponent implements OnInit {
    constructor(
    private route: ActivatedRoute,
    private appointments: AppointmentService
    ) {}

    date = "";
    allAppointments: any[] = [];
    groupedByHours: any[] = [];

    // Declare a variável grupoIndex
    grupoIndex = 0;

    ngOnInit(): void {
        this.route.params.subscribe((params) => (this.date = params["date"]));

        this.allAppointments = this.appointments.getArray();

        this.groupedByHours = this.groupAppointmentsByHour(
            this.appointments.getArray()
        );
    }

    groupAppointmentsByHour(arr: any[]) {
        const groups: any = {};

        arr.forEach((obj: { Hour: any }) => {
            const hora = obj.Hour;
            if (groups[hora]) {
                groups[hora].push(obj);
            } else {
                groups[hora] = [obj];
            }
        });

        // Converter o objeto de groups em um array de arrays
        const resultado = Object.values(groups);

        return resultado;
    }

    cdkDropListGroupEntered(event: CdkDragEnter<Event>) {
        this.grupoIndex = event.currentIndex;
    }

    drop(event: CdkDragDrop<any[]>) {
        console.log(event);
        // Verifique se o item foi movido dentro do mesmo grupo
        if (event.previousContainer === event.container) {
            // Se o item foi movido dentro do mesmo grupo, reordene o array
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            // Se o item foi movido para outro grupo, transfira o item para o novo grupo
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            // Atualize os grupos após o drop
            this.groupedByHours[+event.previousContainer.id].splice(
                event.previousIndex,
                1
            );
            this.groupedByHours[+event.container.id].splice(
                event.currentIndex,
                0,
                event.previousContainer.data[event.previousIndex]
            );
            this.appointments.setArray(this.groupedByHours);
        }
    }

    dragExited(event: CdkDragExit) {
    // Acesse o item arrastado e o container de origem do evento
        const draggedItem = event.item.data;
        const sourceContainer = event.container.data;

        // Faça o que for necessário quando o item sair do container, como removê-lo do array de origem
        // ou executar outra lógica de negócio
        console.log(
            "Item arrastado saiu do container",
            draggedItem,
            sourceContainer
        );
    }

    // Método chamado quando um item é removido de um grupo
    removeFromGroup(item: any[], grupoIndex: number, itemIndex: number) {
        this.groupedByHours[grupoIndex].splice(itemIndex, 1);
    }

    // Método chamado quando um item é adicionado a um grupo
    addToGroup(item: any[], grupoIndex: number) {
        this.groupedByHours[grupoIndex].push(item);
    }
}
