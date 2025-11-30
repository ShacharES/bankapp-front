import { apiFetch } from "./client";

export type TransferRequest = {
    from_account_id: string;
    to_account_id: string;
    amount: number;
    currency: string;
};

export async function createTransfer(payload: TransferRequest) {
    return apiFetch<{ id: string; status: string }>("/transfers", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}