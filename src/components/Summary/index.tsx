import { SummaryContainer, SummayCard } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

export function Summary () {
    const summary = useSummary();

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