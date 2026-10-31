# SPEC.md — LedLink

> **Versão:** 0.3
> **Última atualização:** 31/10/2026
> **Responsável pelo produto:** Felipe (dono do LedLink)
> **Status:** Fase 1a implementada e publicada (prévia estática)

---

## Como ler este documento

Este é o **documento-mãe** do LedLink. Ele descreve *o que* o produto é, *para quem*,
*quais regras* ele segue e *em que ordem* será construído.

Ele foi escrito para ser entendido por qualquer pessoa — não só por programadores.
Sempre que aparecer um termo técnico, ele estará explicado no **Glossário** (seção 6).

**Regra de ouro do projeto:** nenhuma funcionalidade é construída antes de estar escrita
aqui. Se algo mudar de ideia, muda primeiro neste arquivo, depois no código.

---

## 1. Resumo em uma frase

O **LedLink** é uma plataforma online que ajuda donos de painéis de LED a organizar suas
telas, sua agenda e seus contratos — e conecta essas telas a empresas e pessoas que
querem anunciar.

---

## 2. O problema que estamos resolvendo

**Para o dono do painel de LED:**
- Controla telas, clientes e datas em caderno, planilha e WhatsApp.
- Não sabe com segurança quais telas estão livres em cada período.
- Perde dinheiro com espaço vazio na programação.
- Não tem um lugar único para guardar contratos, valores e histórico.

**Para quem quer anunciar:**
- Não sabe onde existem telas disponíveis, de que tamanho e em que região.
- Precisa ligar para vários donos diferentes para comparar.
- Não tem clareza de preço, prazo nem de como enviar a arte do anúncio.

**O que o LedLink faz:**
- Dá ao dono um painel para cadastrar telas, controlar a agenda e registrar contratos.
- Dá ao anunciante um catálogo pesquisável de telas.
- Permite que os dois se encontrem, negociem e fechem o contrato em um só lugar.

---

## 3. Objetivos

| # | Objetivo | Como saberemos que deu certo |
|---|---|---|
| O1 | Donos conseguem cadastrar e manter suas telas atualizadas | 80% das telas cadastradas ficam ativas e com dados completos |
| O2 | Anunciantes encontram telas adequadas sem precisar ligar para ninguém | Busca com filtros usada em mais de 50% das sessões de anunciante |
| O3 | Negócios começam no site e terminam em contrato registrado | Pelo menos 1 contrato registrado por dono ativo nos primeiros 90 dias |
| O4 | A plataforma se paga | Receita de assinaturas + comissão cobre os custos operacionais |

### Não-objetivos (o que o LedLink NÃO é)

- Não é uma rede social.
- Não é uma agência de publicidade (não cria a arte do anúncio).
- Não é um sistema de gestão financeira completo (não substitui contabilidade).
- Não terá aplicativo para celular nesta fase (o site funciona bem no celular).

---

## 4. Público e perfis

### 4.1 Personas

**— Seu Antônio, dono de telas (oferta)**
Tem 3 a 15 painéis em pontos comerciais da cidade. Vende espaço por semana ou por mês.
Usa WhatsApp o dia inteiro. Quer parar de perder pedido por não saber o que está livre.

**— Marina, anunciante (demanda)**
Dona de uma loja, clínica ou restaurante. Quer divulgar em telas perto do negócio dela.
Não entende de LED, mas entende de resultado: quer saber onde, quanto e por quanto tempo.

**— Equipe LedLink (administração)**
Aprova telas, acompanha assinaturas e comissões, resolve conflitos e dá suporte.

### 4.2 Perfis de acesso

| Perfil | O que pode fazer |
|---|---|
| **Visitante** (sem conta) | Ver a página inicial, o catálogo público de telas e a página de cada tela |
| **Anunciante** | Tudo do visitante + criar pedido de interesse, enviar arte, acompanhar contratos e pagamentos |
| **Dono de tela** | Cadastrar e editar telas, ver pedidos recebidos, montar contratos, gerenciar agenda, ver assinatura e comissões |
| **Administrador** | Aprovar/recusar telas, ver todos os usuários, acompanhar assinaturas e comissões, moderar conteúdo |

> Uma mesma pessoa pode ser dono **e** anunciante. O perfil é escolhido no cadastro e
> pode ser complementado depois.

---

## 5. Jornadas principais

### 5.1 Dono cadastra a conta e a tela
1. Entra no site e clica em **"Quero anunciar minhas telas"**.
2. Cria conta com Google (1 clique) ou e-mail e senha.
3. Preenche o perfil: nome, empresa, cidade, WhatsApp de contato.
4. Cadastra a primeira tela: tipo (indoor/outdoor), endereço, tamanho, resolução,
   público estimado por dia e uma foto opcional.
5. A tela entra com status **"Em análise"**.
6. O administrador aprova. A tela fica **"Ativa"** e aparece no catálogo.

### 5.2 Anunciante encontra uma tela
1. Entra no catálogo sem precisar de conta.
2. Filtra por cidade, tipo (indoor/outdoor), tamanho e público estimado.
3. Abre a página da tela e vê fotos, localização aproximada e informações técnicas.
4. Clica em **"Tenho interesse"**.

### 5.3 Pedido de interesse
1. Se ainda não tiver conta, o sistema pede o cadastro (rápido, com Google ou e-mail).
2. O anunciante informa: período desejado, mensagem e (opcional) a arte do anúncio.
3. O pedido é registrado com status **"Aguardando resposta do dono"**.
4. O dono recebe uma notificação e vê o pedido no painel.
5. O dono pode: **aceitar**, **recusar** ou **conversar no WhatsApp**.

### 5.4 Negociação e contrato
1. Aceito o pedido, o dono monta o **contrato**: tela, período, valor, condições.
2. O anunciante revisa e confirma.
3. A negociação pode acontecer no WhatsApp; **a formalização e o pagamento acontecem
   na plataforma**.
4. Contrato confirmado e pago → o período fica **reservado** na agenda da tela.

### 5.5 Pagamento
1. O anunciante paga por **Pix, cartão de crédito ou boleto**.
2. O sistema confirma o pagamento.
3. A plataforma retém a **comissão** e repassa o restante ao dono.
4. O contrato passa para **"Ativo"** e entra na agenda.

### 5.6 Assinatura do dono
1. Todo dono tem um plano. O plano gratuito permite até **3 telas**.
2. Para cadastrar mais telas, assina o plano pago (mensal).
3. Sem assinatura ativa, as telas excedentes ficam pausadas (não são apagadas).

### 5.7 Agenda e exibição
1. Cada tela tem um calendário.
2. Um contrato ocupa um intervalo de datas.
3. O sistema **impede sobreposição** de contratos na mesma tela e período.
4. O dono vê, em uma tela só, o que está rodando, o que começa e o que termina.

---

## 6. Glossário

| Termo | O que significa aqui |
|---|---|
| **Tela / painel** | Um painel de LED físico cadastrado por um dono |
| **Dono** | Quem possui e opera a tela |
| **Anunciante** | Quem paga para exibir uma campanha |
| **Pedido de interesse** | Manifestação inicial do anunciante por uma tela |
| **Contrato** | Acordo com tela, período, valor e condições |
| **Comissão** | Percentual que a plataforma retém em cada contrato |
| **Assinatura** | Mensalidade do dono para usar a plataforma |
| **Arte** | Imagem ou vídeo que será exibido na tela |
| **Backend** | Serviço fora do site que guarda dados e faz o login (o GitHub Pages não faz isso) |
| **GitHub Pages** | Serviço gratuito que publica sites estáticos direto de um repositório |
| **Site estático** | Site só com páginas prontas: não guarda dados nem processa pagamento sozinho |

---

## 7. Requisitos funcionais

Legenda de prioridade: **F1** = primeira versão · **F2** = segunda fase · **F3** = terceira fase

### 7.1 Contas e acesso

| ID | Requisito | Prioridade |
|---|---|---|
| RF-001 | Cadastro e login com **Google** (um clique) | F1 |
| RF-002 | Cadastro e login com **e-mail e senha**, com recuperação de senha | F1 |
| RF-003 | Escolha do perfil no cadastro: dono de tela ou anunciante | F1 |
| RF-004 | Edição de perfil: nome, empresa, cidade, WhatsApp, foto | F1 |
| RF-005 | Um usuário pode acumular os perfis de dono e anunciante | F1 |
| RF-006 | Verificação de e-mail antes de publicar tela | F1 |

### 7.2 Catálogo de telas

| ID | Requisito | Prioridade |
|---|---|---|
| RF-010 | Dono cadastra tela com: nome, tipo (indoor/outdoor), cidade, UF, bairro, ponto de referência, largura e altura (m), resolução (px), público estimado/dia | F1 |
| RF-011 | Foto do local é **opcional** no cadastro | F1 |
| RF-012 | Tela nova entra como **"Em análise"** e só aparece no catálogo após aprovação do admin | F1 |
| RF-013 | Dono pode pausar, reativar, editar e arquivar a própria tela | F1 |
| RF-014 | Catálogo público com busca por texto e filtros: cidade, tipo, faixa de tamanho, público estimado | F1 |
| RF-015 | Página individual da tela com fotos, mapa estático, informações técnicas e disponibilidade resumida | F1 |
| RF-016 | Selo "Disponível agora" / "Ocupada até \<data\>" na tela | F1 |
| RF-017 | Preço de referência por período é **opcional** e só aparece se o dono preencher | F1 |
| RF-018 | Mapa interativo com todas as telas | F3 |

### 7.3 Pedidos de interesse

| ID | Requisito | Prioridade |
|---|---|---|
| RF-020 | Anunciante envia pedido informando período desejado e mensagem | F1 |
| RF-021 | Botão **"Falar no WhatsApp"** na tela e no pedido, abrindo conversa com mensagem pronta | F1 |
| RF-022 | Dono vê a lista de pedidos com status: aguardando, aceito, recusado, expirado | F1 |
| RF-023 | Dono aceita ou recusa o pedido com um clique | F1 |
| RF-024 | Pedido sem resposta por 7 dias expira automaticamente | F1 |
| RF-025 | Notificação por e-mail a cada mudança de status | F2 |
| RF-026 | Chat interno entre dono e anunciante | F3 |

### 7.4 Contratos

| ID | Requisito | Prioridade |
|---|---|---|
| RF-030 | Dono cria contrato a partir de um pedido aceito: tela, período, valor, condições | F1 |
| RF-031 | Anunciante confirma ou solicita ajuste no contrato | F1 |
| RF-032 | Contrato tem status: rascunho, aguardando confirmação, aguardando pagamento, ativo, encerrado, cancelado | F1 |
| RF-033 | Sistema bloqueia contrato com período sobreposto na mesma tela | F1 |
| RF-034 | Contrato gera um resumo em PDF para download | F2 |
| RF-035 | Histórico de contratos por tela, dono e anunciante | F1 |

### 7.5 Pagamentos, assinatura e comissão

| ID | Requisito | Prioridade |
|---|---|---|
| RF-040 | Pagamento por **Pix** | F2 |
| RF-041 | Pagamento por **cartão de crédito** (com parcelamento) | F2 |
| RF-042 | Pagamento por **boleto** | F2 |
| RF-043 | Repasse automático ao dono, descontada a comissão | F2 |
| RF-044 | Plano gratuito: até 3 telas ativas | F2 |
| RF-045 | Plano pago mensal: telas ilimitadas | F2 |
| RF-046 | Assinatura recorrente com cancelamento a qualquer momento | F2 |
| RF-047 | Painel financeiro do dono: recebido, a receber, comissões | F2 |
| RF-048 | Emissão de nota fiscal | F3 |

### 7.6 Arte do anúncio

| ID | Requisito | Prioridade |
|---|---|---|
| RF-050 | Upload de imagem (JPG/PNG) ou vídeo (MP4) pelo site | F2 |
| RF-051 | Validação de formato, tamanho e proporção da arte | F2 |
| RF-052 | Dono aprova ou recusa a arte enviada | F2 |
| RF-053 | Biblioteca de artes por anunciante | F3 |

### 7.7 Agenda

| ID | Requisito | Prioridade |
|---|---|---|
| RF-060 | Calendário por tela mostrando contratos ativos e futuros | F1 |
| RF-061 | Visão "minhas telas" com status de ocupação do mês | F1 |
| RF-062 | Alerta de espaço vazio nos próximos 30 dias | F2 |
| RF-063 | Exportação da agenda em CSV | F3 |

### 7.8 Administração

| ID | Requisito | Prioridade |
|---|---|---|
| RF-070 | Painel admin com fila de telas em análise | F1 |
| RF-071 | Aprovar, recusar (com motivo) e editar telas | F1 |
| RF-072 | Lista de usuários com filtro por perfil e status | F1 |
| RF-073 | Visão de assinaturas e comissões | F2 |
| RF-074 | Registro de ações administrativas (auditoria) | F2 |
| RF-075 | Envio de avisos em massa | F3 |

### 7.9 Experiência e idioma

| ID | Requisito | Prioridade |
|---|---|---|
| RF-080 | Site responsivo (celular, tablet, desktop) | F1 |
| RF-081 | Interface em **português (padrão)** e **inglês** | F1 |
| RF-082 | Modo escuro como padrão visual do produto | F1 |
| RF-083 | Acessibilidade nível AA (contraste, teclado, leitores de tela) | F1 |
| RF-084 | Página inicial com explicação do serviço e chamada para cadastro | F1 |
| RF-085 | Páginas legais: termos de uso e política de privacidade | F1 |

---

## 8. Regras de negócio

| ID | Regra |
|---|---|
| RN-001 | Toda tela precisa de aprovação do administrador antes de aparecer no catálogo |
| RN-002 | A comissão da plataforma é um percentual do valor do contrato (padrão proposto: **10%**, a validar) |
| RN-003 | O contrato só fica **Ativo** após o pagamento confirmado |
| RN-004 | Dois contratos não podem ocupar o mesmo período na mesma tela |
| RN-005 | Plano gratuito: até **3 telas ativas** por dono |
| RN-006 | Telas acima do limite ficam **pausadas**, nunca apagadas |
| RN-007 | Pedido sem resposta em 7 dias expira |
| RN-008 | A negociação pode ocorrer no WhatsApp, mas o contrato e o pagamento são registrados na plataforma |
| RN-009 | O anunciante só pode avaliar depois de um contrato concluído (F3) |
| RN-010 | Dados pessoais seguem a LGPD: o usuário pode exportar e excluir sua conta |

> **Atenção:** RN-002 e RN-005 usam valores provisórios. Precisam ser confirmados
> antes da Fase 2.

---

## 9. Modelo de dados (visão conceitual)

```
usuario ──< tela ──< contrato >── usuario (anunciante)
   │                    │
   │                    ├──< pagamento
   │                    └──< arte
   ├──< pedido ──> tela
   ├──< assinatura
   └──< avaliacao (F3)
```

| Entidade | Campos principais |
|---|---|
| **usuario** | id, nome, email, telefone, empresa, cidade, uf, perfis[], criado_em |
| **tela** | id, dono_id, nome, tipo, endereco{cidade, uf, bairro, referencia}, dimensoes{largura_m, altura_m}, resolucao{largura_px, altura_px}, publico_estimado_dia, preco_referencia (opcional), status, fotos[], criado_em |
| **pedido** | id, tela_id, anunciante_id, periodo_desejado, mensagem, status, criado_em, expira_em |
| **contrato** | id, tela_id, dono_id, anunciante_id, periodo{inicio, fim}, valor, comissao, status, criado_em |
| **pagamento** | id, contrato_id, metodo (pix/cartao/boleto), valor, status, pago_em |
| **assinatura** | id, dono_id, plano, status, inicio, fim, valor |
| **arte** | id, anunciante_id, contrato_id, arquivo, formato, dimensoes, status |
| **avaliacao** | id, contrato_id, nota, comentario, criado_em |
| **mensagem** | id, pedido_id, remetente_id, texto, criado_em |

---

## 10. Requisitos não funcionais

| ID | Requisito |
|---|---|
| RNF-001 | Página inicial carrega em menos de 3 segundos em 4G |
| RNF-002 | Funciona nos navegadores atuais (Chrome, Safari, Firefox, Edge) |
| RNF-003 | 100% responsivo, com prioridade para o celular |
| RNF-004 | Acessibilidade WCAG 2.1 nível AA |
| RNF-005 | Nenhum dado sensível exposto no navegador; segredos só no backend |
| RNF-006 | Conformidade com a LGPD e com os termos de uso do GitHub Pages |
| RNF-007 | Conteúdo traduzível sem duplicar páginas (PT/EN) |
| RNF-008 | Código aberto e organizado para outra pessoa (ou IA) continuar |
| RNF-009 | Custo mensal próximo de zero na fase inicial |

---

## 11. Identidade visual (proposta inicial)

**Nome:** LedLink
**Tagline (PT):** *Sua tela no radar. Sua marca na rua.*
**Tagline (EN):** *Your screen on the map. Your brand on the street.*

**Conceito do logo:** a palavra "LedLink" em tipografia geométrica, com o ponto do "i"
substituído por um pixel de LED aceso e uma pequena corrente/elo ligando as duas
palavras — a ideia de "conectar telas a marcas".

**Paleta (modo escuro):**

| Uso | Cor |
|---|---|
| Fundo principal | `#0A0E17` |
| Superfície / cartões | `#121826` |
| Primária (LED ciano) | `#00E5FF` |
| Secundária (magenta) | `#FF2E88` |
| Sucesso | `#22C55E` |
| Alerta | `#F59E0B` |
| Erro | `#EF4444` |
| Texto principal | `#E6EDF7` |
| Texto secundário | `#94A3B8` |

**Tipografia:** títulos em **Space Grotesk**, texto em **Inter**.

**Tom de voz:** direto, próximo e sem jargão. Falar de resultado ("sua marca vista por
2 mil pessoas por dia"), não de tecnologia.

> Tudo nesta seção é **proposta** e pode ser ajustado sem impacto técnico.

---

## 12. Conteúdo e idiomas

- **Idiomas:** português do Brasil (padrão) e inglês.
- Todo texto visível ao usuário deve estar em um arquivo de tradução — nada de texto
  "solto" dentro do código.
- A moeda é o real (BRL) e o formato de data é `dd/mm/aaaa`.
- Telefones no formato brasileiro, com WhatsApp.

---

## 13. Fases de construção

### Fase 0 — Fundação (concluída em 31/10/2026)
- `SPEC.md` e `AGENTS.md` escritos e validados.
- Estratégia de backend definida (D1): **estático primeiro, backend depois**.
- Repositório criado e publicado no GitHub Pages.

### Fase 1a — Vitrine estática (primeira versão no ar, sem backend) — **implementada**
Página inicial, catálogo de telas com **dados de exemplo**, página da tela, botão de
WhatsApp, PT/EN, modo escuro.
**Nenhum dado é salvo.** Serve para validar a proposta, medir interesse e gerar os
primeiros contatos — sem custo e sem risco de perder informação de usuário.

> ⚠️ **Regra:** nesta fase não se convida usuários reais para "criar conta". O site é
> uma vitrine que converte no WhatsApp.

### Fase 1b — Produto com backend
Contas (Google + e-mail), telas reais, pedidos, contratos, agenda, painel do dono,
painel admin. **A vitrine da Fase 1a continua exatamente igual** — muda apenas a
camada de dados por baixo.

### Fase 2 — Monetização
Pagamento (Pix, cartão, boleto), assinatura dos donos, comissão, repasse,
upload de arte, notificações por e-mail, painel financeiro.

### Fase 3 — Comunidade
Chat interno, avaliações e reputação, mapa interativo, relatórios de exibição,
biblioteca de artes, exportações.

### Fora do escopo (todas as fases)
- Aplicativo nativo para Android/iOS (o site responsivo cobre o celular).

### 13.1 Estratégia de migração (Fase 1a → Fase 1b)

O site publicado na Fase 1a é o **mesmo** site da Fase 1b. A troca de estático para
backend acontece por baixo, sem refazer páginas, sem mudar URLs e sem perder o que já
foi divulgado.

| Regra | Por quê |
|---|---|
| Todos os dados passam por **uma única camada** (`src/services/`) | Hoje ela lê `telas.json`; amanhã lê o banco. As páginas não percebem a diferença |
| Nenhum dado "chumbado" dentro de página ou componente | Evita ter que caçar informação espalhada na hora da migração |
| Os dados de exemplo viram **carga inicial (seed)** do banco | Nada é digitado duas vezes |
| **URLs e estrutura de páginas não mudam** | Preserva links compartilhados, SEO e material de divulgação |
| Formulários da 1a enviam para WhatsApp/e-mail, **não gravam nada** | Não há dado de usuário para migrar nem para perder |
| A chave **pública** do backend pode ficar no front; a **secreta**, nunca | Segurança desde o primeiro dia |

**O que muda na 1b:** login, persistência, pedidos, contratos, agenda, painéis.
**O que não muda:** visual, textos, rotas, SEO, botão de WhatsApp.

**Pré-requisito para ligar a 1b:** decisão do provedor (D9) e dos contatos oficiais (D5).

---

## 14. Critérios de aceite (exemplos)

**CA-01 — Cadastro do dono**
Dado que estou na página de cadastro,
quando escolho "sou dono de tela" e entro com o Google,
então minha conta é criada com o perfil de dono e sou levado ao painel.

**CA-02 — Tela em análise**
Dado que cadastrei uma tela completa,
quando salvo,
então ela aparece no meu painel como "Em análise" e **não** aparece no catálogo público.

**CA-03 — Busca**
Dado que estou no catálogo,
quando filtro por cidade "Campinas" e tipo "outdoor",
então vejo apenas telas ativas que atendem aos dois filtros.

**CA-04 — Pedido de interesse**
Dado que estou logado como anunciante na página de uma tela,
quando envio um pedido com período e mensagem,
então o dono vê o pedido como "Aguardando" e eu vejo a confirmação.

**CA-05 — Conflito de agenda**
Dado que uma tela já tem contrato ativo de 01/11 a 30/11,
quando tento criar outro contrato para 15/11 a 20/11,
então o sistema bloqueia e explica o conflito.

**CA-06 — Idioma**
Dado que estou no site em português,
quando troco para inglês,
então todos os textos da interface mudam, sem recarregar a página.

---

## 15. Métricas de sucesso

| Métrica | Meta inicial |
|---|---|
| Donos cadastrados | 10 em 90 dias |
| Telas ativas | 30 em 90 dias |
| Pedidos de interesse por mês | 20 |
| Contratos fechados | 5 no primeiro trimestre |
| Tempo até o primeiro pedido após cadastro | menos de 7 dias |

---

## 16. Decisões

### 16.1 Fechadas

| # | Decisão | Data |
|---|---|---|
| D1 | **Backend:** publicar a vitrine estática primeiro (Fase 1a) no GitHub Pages e plugar o backend na Fase 1b. Candidato recomendado: **Supabase**. A decisão final do provedor fica para o início da 1b, sem bloquear a publicação. | 31/10/2026 |
| D10 | **Stack da Fase 1a:** HTML, CSS e JavaScript puros (ES modules), **sem build e sem dependências**. O GitHub Pages serve os arquivos direto da branch `main`. Motivo: zero manutenção, zero custo, e a migração para backend continua isolada em `src/services/`. | 31/10/2026 |

> Consequência prática: a Fase 1a **não depende** de nenhuma escolha de backend.
> O que ela não pode fazer é prometer cadastro/login a usuários reais.

### 16.2 Abertas

| # | Pendência | Impacto | Prazo |
|---|---|---|---|
| D2 | Qual meio de pagamento/gateway (Pix, cartão, boleto) | Bloqueia Fase 2 | Antes da Fase 2 |
| D3 | Percentual exato da comissão | Define receita | Antes da Fase 2 |
| D4 | Preço do plano pago e limite do gratuito | Define receita | Antes da Fase 2 |
| D5 | E-mail e WhatsApp oficiais da plataforma | Necessário para contato e páginas legais | Antes da Fase 1a |
| D6 | Domínio próprio | Endereço final do site | Pode ficar para depois |
| D7 | Cidade/região de lançamento | Foco de marketing | Antes do lançamento |
| D8 | Contrato social / CNPJ para emissão de nota | Fase 3 | Fase 3 |
| D9 | Provedor definitivo do backend (Supabase ou equivalente) | Bloqueia login e dados | Antes da Fase 1b |

---

## 17. Riscos

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Backend gratuito estourar o limite de uso | Média | Monitorar e ter plano de upgrade |
| Donos não atualizarem as telas | Alta | Lembretes por e-mail e selo "atualizado há X dias" |
| Negociação migrar toda para o WhatsApp | Alta | Facilitar o contrato no site e destacar a garantia de pagamento |
| Complexidade do pagamento online | Alta | Deixar para a Fase 2 e validar o fluxo antes |
| Concorrência de grupos de WhatsApp e marketplaces locais | Média | Foco em nicho e em relacionamento |

---

## 18. Definição de pronto (para qualquer entrega)

Uma entrega só é considerada pronta quando:
- [ ] Está descrita neste documento.
- [ ] Funciona no celular e no desktop.
- [ ] Está em português e inglês.
- [ ] Passa nos critérios de acessibilidade.
- [ ] Foi testada por alguém que não escreveu o código.
- [ ] Está publicada no GitHub Pages (ou no ambiente combinado).
