import { ICardStrategic } from "../../componets/strategic/card";


export type ICardData = Omit<ICardStrategic, "onClick"> & { href: string, finished: boolean }

export const listCard: Array<ICardData> = [
    {
        text: "Indicadores são métricas usadas para quantificar e avaliar o desempenho de processos, dentro de uma organização.", 
        title: "Indicadores", 
        imgSrc: "/icons/strategic/icon-indicators.svg", 
        href: "/strategic/indicators",
        finished: true
    },
    {
        text: "Utilize o quadro para planejar e organizar as fases de um projeto, dentre outros de forma sequencial e gameficada.", 
        title: "Canvas", 
        imgSrc: "/icons/strategic/icon-canvas.svg", 
        href: "/strategic/canvas",
        finished: true
    },
    {
        text: "Utilize o quadro para planejar e organizar as fases de um projeto, dentre outros de forma sequencial e gameficada.", 
        title: "Código Cultural", 
        imgSrc: "/icons/strategic/icon-canvas.svg", 
        href: "/strategic/culturalCode",
        finished: true
    },
    {
        text: "Ferramenta interativa para você navegar, e criar blocos de informações, de forma livre e organizada.", 
        title: "Organograma", 
        imgSrc: "/icons/strategic/icon-chart.svg", 
        href: "/strategic/chart",
        finished: false
    },
    {
        text: "Crie objetivos, trabalhando ao longo do tempo, destacando prazos e limites de cada etapa.", 
        title: "Cronograma", 
        imgSrc: "/icons/strategic/icon-timeline.svg", 
        href: "/strategic/timeline",
        finished: true
    },
    {
        text: "Ferramenta para listar tópicos, com as ações e tarefas necessárias para atingir um determinado objetivo.", 
        title: "Plano de ação", 
        imgSrc: "/icons/strategic/icon-action-plan.svg", 
        href: "/strategic/action-plan",
        finished: false
    },
    // {
    //     text: "Em breve novas ferramentas!\n Em breve novas ferramentas! Em breve novas ferramentas!", 
    //     title: "Em breve", 
    //     imgSrc: "/icons/strategic/icon-shortly.svg", 
    //     href: "/strategic/shortly",
    //     finished: false
    // },


] 