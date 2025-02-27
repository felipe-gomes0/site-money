import { useContext } from "react";
import { SummaryContainer, SummayCard } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFormatter } from "../../utils/formatter";

export function Summary () {
const { transactions } = useContext(TransactionsContext);

const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total +=transaction.price;
    } else {
        acc.outcome += transaction.price;
        acc.total -=transaction.price;
    }

    return acc;
}, { income: 0, outcome: 0, total: 0})


    return (
        <SummaryContainer>
            <SummayCard>
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00B37E"/>
                </header>

                <strong>{priceFormatter.format(summary.income)}</strong>
            </SummayCard>
            <SummayCard>
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68"/>
                </header>

                <strong> {priceFormatter.format(summary.outcome)}</strong>
            </SummayCard>
            <SummayCard variant="blue">
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#00B37E"/>
                </header>

                <strong> {priceFormatter.format(summary.total)}</strong>
            </SummayCard>
        </SummaryContainer>
    )
} 