import { apiFetch } from "./client";

type CreateAccountPayload = {
    currency: string;
};

export type Account = {
    id: string;
    owner: string;
    balance: number;
    currency: string;
    created_at: string;
};

export async function createAccount(payload: CreateAccountPayload) {
    return apiFetch<{ id: string; balance: number; currency: string; owner_id: string }>("/accounts", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function getAccounts(pageId: number = 1, pageSize: number = 10) {
    const res = await apiFetch<Account[]>(`/accounts?page_id=${pageId}&page_size=${pageSize}`);
    return res;
}

async function getMainAccountId() {
    return await getAccounts().then(res => res[0].id);
}

export async function getAccount(id?: string) {
    if (!id) {
        id = await getMainAccountId();
    }
    return apiFetch<Account>(`/accounts/${id}`);
}