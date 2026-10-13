# TechFlow Dashboard

Projeto do Checkpoint 5 de FRONTEND. Dashboard responsivo da empresa fictícia TechFlow para acompanhar projetos, equipes e indicadores.

## Integrantes

- Mateus Tavares RM 571189

## Link do github 
https://github.com/mateustavaresw/techflow-dashboard.git

## Tecnologias utilizadas

- HTML5
- Tailwind CSS 
- JavaScript 

## Principais recursos implementados

- Dashboard com navbar, sidebar, campo de pesquisa, dados do usuário, 4 cards de indicadores e 6 cards de projetos.
- CSS Grid nos projetos, com cards de tamanhos diferentes (`grid-cols-*`, `col-span-*` e `row-span-*`).
- Layout Mobile-First, usando os breakpoints `sm:`, `md:`, `lg:`, `xl:` e `2xl:`.
- Sidebar fixa no desktop e menu que abre e fecha no celular e no tablet.
- Dropdown do usuário.
- Modal de novo projeto com validação visual (borda vermelha e mensagem no erro, borda verde quando o campo está certo). O novo projeto aparece como card na lista, sem banco de dados.
- Seletor de tema Light | Dark | System com a variante `dark:`, respeitando a preferência do sistema e salvando a escolha no `localStorage`.
- Pesquisa que filtra os projetos enquanto digita.
- Estados e transições: `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:`, `peer-checked:`, `transition`, `duration-*` e `ease-*`.

## Como executar

Abra o `index.html` no navegador. O CSS já está compilado em `css/styles.css`.

Para alterar o estilo e compilar de novo:

```bash
npm install
npm run dev
```

Para gerar a versão final do CSS: `npm run build`.

## Estrutura

```
techflow-dashboard/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── src/
│   └── input.css
├── package.json
└── README.md
```

## Dificuldades encontradas

- Fazer o `dark:` funcionar com o botão Light/Dark/System. No Tailwind v4 foi preciso declarar `@custom-variant dark` no `src/input.css` para ele seguir a classe `dark` no `<html>`.
- Evitar que a página piscasse branca ao recarregar no tema escuro, aplicando o tema salvo antes da página carregar.
- Montar o grid com cards de tamanhos diferentes sem deixar buracos, usando `grid-flow-dense`.
- Fazer o modal e o dropdown aparecerem com transição, já que `display: none` não anima. A solução foi usar `invisible` e `opacity-0`.
