export interface IIndicadores {
    invoicing: number; // Faturamento
    customersServed: number; // Clientes atendidos
    averageTicket: number; // Ticket médio
    averageCost: number; // Custo Médio
    budgetedVsRealized: number; // Orçado vs Realizado
    actionPlan: number; // Plano de ação
    productivity: number; // Produtividade
    customerSatisfaction: number; // Satisfação do cliente
    timeline: number; // Cronograma
    nps: number; // NPS
    customerEngagement: number; // Engajamento do cliente
    employeeSatisfaction: number; // Satisfação do colaborador
    employeeEngagement: number; // Engajamento do Colaborador
    date?: string;
    id?: number;
}