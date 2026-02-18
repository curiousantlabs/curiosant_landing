import {
    type InsertContactRequest,
    type ContactRequest
} from "./shared/schema";

export interface IStorage {
    createContactRequest(request: InsertContactRequest): Promise<ContactRequest>;
}

export class MemStorage implements IStorage {
    private requests: Map<number, ContactRequest>;
    private currentId: number;

    constructor() {
        this.requests = new Map();
        this.currentId = 1;
    }

    async createContactRequest(request: InsertContactRequest): Promise<ContactRequest> {
        const id = this.currentId++;
        const newItem: ContactRequest = {
            ...request,
            id,
            createdAt: new Date(),
        };
        this.requests.set(id, newItem);
        return newItem;
    }
}

export const storage = new MemStorage();
