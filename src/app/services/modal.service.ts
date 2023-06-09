import { Injectable } from "@angular/core";

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
    providedIn: "root",
})
export class ModalService {
    private modals: IModal[] = [];

    unregister(id: string) {
        this.modals = this.modals.filter((element) => element.id !== id);
    }

    register(id: string) {
        this.modals.push({
            id,
            visible: false,
        });
    }

    isOpen(id: string): boolean {
        return !!this.modals.find((modal) => modal.id === id)?.visible;
    }

    handleToggleModal(id: string) {
        const modal = this.modals.find((modal) => modal.id === id);

        if (modal) {
            modal.visible = !modal.visible;
        }
    }
}
