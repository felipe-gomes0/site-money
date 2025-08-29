import { ReactNode, useEffect, useState, useCallback } from "react";
import { createContext } from "use-context-selector";
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

export function TransactionsProvider({ children }: TransactionsContextProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

	const fetchTransactions = useCallback(
		async (query?: string) => {

			if (query) {
				const filteredTransactions = allTransactions.filter(
					(transaction) =>
						transaction.description
							.toLowerCase()
							.includes(query.toLowerCase()) 
				);
                

				setTransactions(filteredTransactions);
			} else {

				setTransactions(allTransactions);
			}
            
		},
		[allTransactions]
	);

	
	const loadAllTransactions = useCallback(async () => {
		const response = await api.get("/transactions");
		setAllTransactions(response.data);
		setTransactions(response.data);
	}, []);

	const createTransaction = useCallback(
		async (data: CreateTransactionInput) => {
			const { description, price, category, type } = data;

			const response = await api.post("/transactions", {
				description,
				price,
				category,
				type,
				createAt: new Date(),
			});

			setAllTransactions((state) => [response.data, ...state]);
			setTransactions((state) => [response.data, ...state]);
		},
		[]
	);

	useEffect(() => {
		loadAllTransactions();
	}, [loadAllTransactions]);

	return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
    )
}

