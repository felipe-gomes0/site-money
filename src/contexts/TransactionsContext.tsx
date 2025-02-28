import {  ReactNode, useEffect, useState } from "react";

import { createContext } from "react";
import { api } from "../lib/axios";


interface CreateTransactionInput {
    description: string;
    price: number;
    category:string;
    type: 'income' | 'outcome';
}

interface Transaction{
    id : number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createAt: string;
}

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise <void>;
}

interface TransactionsContextProps {
    children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider( { children } : TransactionsContextProps) {
   
    async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions', {
            params: {
                type: query,
            },
        });

        console.log(response.config.params);
        setTransactions(response.data);
    }

    const [transactions , setTransactions] = useState <Transaction[]> ([]);

    async function createTransaction(data: CreateTransactionInput) {
        const { description, price, category, type } = data;

        const response = await api.post('transactions', {
            description,
            price,
            category,
            type,
            createAt: new Date(),
        });

        setTransactions(state => [response.data, ...state]);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

