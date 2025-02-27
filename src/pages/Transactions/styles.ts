import styled from 'styled-components';

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1.5rem;

`

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;
    color: ${props => props.theme['gray-100']};

    td {
        padding: 1.25rem 2rem;
        background: ${props => props.theme['gray-700']};

        &:first-child {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
        &:last-child {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
`

interface PriceHighLightProps {
    variant: 'income' | 'outcome';
}
export const PriceHighLight = styled.span <PriceHighLightProps>`
    color: ${props => props.variant === 'income' ? props.theme['blue-300'] : props.theme['red-500']};
`