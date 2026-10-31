# AGENTS.md — Guia para agentes de IA e pessoas que vão construir o LedLink

> **Leia este arquivo inteiro antes de qualquer alteração no projeto.**
> Ele explica como trabalhar neste repositório sem quebrar o que já foi combinado.

---

## 1. O que é este projeto

O **LedLink** é uma plataforma que conecta **donos de painéis de LED** a **anunciantes**.
O dono cadastra suas telas e controla agenda e contratos; o anunciante encontra telas,
pede orçamento e fecha o contrato.

- **Produto:** plataforma web (marketplace)
- **Nome:** LedLink
- **Idiomas:** português do Brasil (padrão) e inglês
- **Visual:** modo escuro, tema tecnológico (ciano `#00E5FF` + magenta `#FF2E88`)
- **Publicação:** GitHub Pages (site estático)
- **Conta GitHub autenticada:** `techautoflow-ops`

---

## 2. Estado atual do repositório

**Fase 0 concluída — apenas documentação.** Ainda não existe código, dependências, build ou deploy.

| Item | Situação |
|---|---|
| `SPEC.md` | ✅ v0.3 |
| `AGENTS.md` | ✅ este arquivo |
| Código / site | ✅ Fase 1a publicada (estático, sem backend) |
| Backend | 🟡 estratégia definida (D1): estático primeiro (Fase 1a), backend na 1b |
| Repositório no GitHub | ✅ `techautoflow-ops/ledlink` (público) |

> **Não crie código, scaffolding, `package.json` ou workflows sem que o dono do produto
> peça explicitamente.** A Fase 0 (documentação) está concluída; a **Fase 1a** (vitrine
> estática) está liberada, mas só começa quando o dono pedir.

---

## 3. A fonte da verdade é o `SPEC.md`

Toda decisão de produto está no `SPEC.md`. Se a tarefa pedida não estiver lá:

1. **Pare** e pergunte ao dono do produto.
2. Registre a resposta na seção **"16.2 Decisões abertas"** do `SPEC.md`.
3. Só então implemente.

**Nunca invente requisitos, preços, textos legais ou regras de negócio.**

---

## 4. Fluxo de trabalho (spec-driven development)

```
1. LER      → leia o SPEC.md e identifique o requisito (RF-xxx) envolvido
2. PROPOR   → descreva em 3 linhas o que vai mudar e qual RF/RN é afetado
3. ESPECIFICAR → se houver algo novo, atualize o SPEC.md PRIMEIRO
4. IMPLEMENTAR → escreva o código seguindo os padrões deste arquivo
5. VALIDAR  → rode testes, cheque acessibilidade, PT/EN e responsividade
6. REGISTRAR → atualize o SPEC.md (status da fase) e o changelog do commit
```

Se o pedido do usuário contrariar o `SPEC.md`, **o `SPEC.md` vence até ser atualizado
com aprovação**.

---

## 5. Restrições técnicas obrigatórias

### 5.1 GitHub Pages é estático

O GitHub Pages **não executa código no servidor**. Consequências:

- ❌ Não há API própria, banco de dados, sessão ou processamento de pagamento no repositório.
- ✅ O front-end pode ser publicado direto do repositório.
- ✅ Login, dados, arquivos e pagamentos vêm de um **serviço externo** (backend).

**Regra:** nenhuma funcionalidade pode depender de código de servidor dentro deste
repositório. Se precisar de backend, use um serviço externo e documente aqui.

### 5.2 Backend

A **estratégia** está decidida (D1): a Fase 1a publica o site estático no GitHub Pages e
a Fase 1b pluga o backend. O **provedor definitivo** (D9) ainda está aberto; o candidato
recomendado é **Supabase** (autenticação + banco + armazenamento de arquivos).

Até a Fase 1b:
- Não instale SDK de backend.
- Não escreva código que assuma um provedor específico.
- Isole o acesso a dados em uma camada única (`src/services/`), trocável depois.

### 5.3 Pagamentos

Pix, cartão e boleto exigem um gateway (ex.: Mercado Pago, Stripe, Asaas).
**Nenhuma chave de API pode ir para o front-end.** Toda cobrança passa pelo backend
ou por links de pagamento gerados por ele.

### 5.4 Camada única de dados (regra de migração)

A Fase 1a publica o site **sem backend**, com dados de exemplo. A Fase 1b pluga o
backend. Para que a troca não exija refazer nada:

- ✅ **Todo** acesso a dados passa por `src/services/`. Páginas e componentes **nunca**
  importam JSON, `fetch` ou SDK de banco diretamente.
- ❌ Nenhum dado de tela, contrato ou usuário "chumbado" dentro de página ou componente.
- ✅ Na 1a, `src/services/` lê arquivos em `src/data/*.json`.
- ✅ Na 1b, **apenas** `src/services/` é reescrito para falar com o backend.
- ✅ Os JSONs de exemplo viram a carga inicial (seed) do banco.
- ❌ Não mudar URLs nem a estrutura de páginas entre 1a e 1b.
- ✅ Chave **pública** do backend pode ficar no front (protegida por regras de acesso);
  a **secreta** nunca.

---

## 6. Estrutura de pastas planejada

```
/
├── AGENTS.md              # este guia
├── SPEC.md                # especificação do produto
├── README.md              # como rodar e editar
├── index.html             # página inicial
├── catalogo.html          # catálogo com filtros
├── tela.html              # detalhe da tela (?id=...)
├── 404.html
├── .nojekyll              # impede o Jekyll de processar os arquivos
├── public/                # favicon e imagens estáticas
├── src/
│   ├── config.js          # WhatsApp, e-mail e modo demo
│   ├── data/              # dados de exemplo (screens.json)
│   ├── services/          # ÚNICA camada de acesso a dados
│   ├── i18n/              # pt-BR.json, en.json e o motor de tradução
│   ├── lib/               # utilitários (formatação)
│   ├── app/               # scripts de cada página
│   └── styles/            # tokens.css + main.css
└── docs/                  # decisões técnicas (ADRs)
```

> **Regra:** página nenhuma importa `data/*.json` diretamente. Sempre `services/`.

---

## 7. Convenções

### Código
- **Identificadores em inglês** (`screen`, `contract`, `order`); **textos de interface em
  pt-BR e en** via arquivos de tradução.
- Nada de texto fixo na tela: sempre usar `i18n`.
- Componentes pequenos e com responsabilidade única.
- Nomes de arquivos em `kebab-case`; componentes em `PascalCase`.
- Comentários apenas quando explicam o *porquê*, nunca o *o quê*.

### Git
- Branches: `feat/`, `fix/`, `docs/`, `chore/`.
- Commits no padrão **Conventional Commits**:
  `feat(catalog): adiciona filtro por cidade`
- Um commit = uma mudança coerente.
- **Nunca** faça commit de `.env`, chaves, tokens ou dados pessoais.

### Documentação
- Toda decisão relevante vira uma linha no `SPEC.md` ou um ADR em `docs/`.
- Datas no formato `dd/mm/aaaa`.

---

## 8. Design system (resumo)

| Token | Valor |
|---|---|
| `--bg` | `#0A0E17` |
| `--surface` | `#121826` |
| `--primary` | `#00E5FF` |
| `--secondary` | `#FF2E88` |
| `--success` | `#22C55E` |
| `--warning` | `#F59E0B` |
| `--danger` | `#EF4444` |
| `--text` | `#E6EDF7` |
| `--text-muted` | `#94A3B8` |
| Fonte de títulos | Space Grotesk |
| Fonte de texto | Inter |
| Raio de borda | 12px |
| Espaçamento base | 4px (escala 4/8/12/16/24/32/48) |

Regras:
- Contraste mínimo **4.5:1** para texto.
- Foco visível em todos os elementos interativos.
- Modo escuro é o padrão; modo claro é opcional e futuro.

---

## 9. Acessibilidade e idioma (não negociável)

- HTML semântico, `alt` em imagens, rótulos em formulários.
- Navegação completa por teclado.
- `lang` correto por idioma.
- Toda string nova deve existir em **pt-BR e en**.
- Moeda em BRL, datas em `dd/mm/aaaa`.

---

## 10. Segurança e privacidade (LGPD)

- Nenhum segredo no repositório. Use variáveis de ambiente no serviço de deploy.
- Só coletar dados necessários: nome, e-mail, telefone, empresa, cidade.
- O usuário pode **exportar** e **excluir** a própria conta.
- Política de privacidade e termos de uso são obrigatórios antes do lançamento.
- Não usar rastreadores de terceiros sem aviso e consentimento.

---

## 11. Comandos

Não há build nem dependências. Para rodar localmente:

```bash
# servir a pasta na porta 8000
python3 -m http.server 8000

# checar a sintaxe de um módulo
node --check src/app/home.js

# validar os dados de exemplo
python3 -m json.tool src/data/screens.json
```

> Abrir `index.html` direto no navegador **não funciona**: módulos ES e `fetch`
> precisam de um servidor.

---

## 12. Publicação

- **Agora:** publicado em <https://techautoflow-ops.github.io/ledlink/> — branch `main`,
  pasta raiz, **sem build**.
- **Depois:** domínio próprio, com `CNAME` no repositório e DNS apontado.
- **Nunca** publique, faça push em `main` ou crie repositório sem pedir confirmação.

---

## 13. Checklist antes de concluir qualquer tarefa

- [ ] O requisito existe no `SPEC.md` (RF-xxx / RN-xxx)?
- [ ] Se algo mudou, o `SPEC.md` foi atualizado primeiro?
- [ ] Todo acesso a dados passa por `src/services/`?
- [ ] Funciona no celular e no desktop?
- [ ] Textos em pt-BR e en?
- [ ] Acessível por teclado e leitor de tela?
- [ ] Nenhum segredo ou dado pessoal no código?
- [ ] Nenhuma dependência de servidor dentro do repositório?
- [ ] Testado por alguém além de quem escreveu?

---

## 14. O que NÃO fazer

- ❌ Inventar funcionalidades, preços ou textos legais.
- ❌ Criar código antes da Fase 1 ser aprovada.
- ❌ Colocar chaves de API no front-end.
- ❌ Adicionar backend "escondido" no repositório.
- ❌ Alterar o `SPEC.md` para justificar algo já feito sem avisar o dono.
- ❌ Publicar ou fazer push sem confirmação.
- ❌ Usar bibliotecas pesadas sem necessidade.
- ❌ Escrever texto de interface direto no componente.
- ❌ Importar JSON, `fetch` ou SDK de banco direto de dentro de página/componente.

---

## 15. Como o dono do produto deve pedir mudanças

Não é preciso falar "técnico". Basta dizer o que quer, em linguagem normal:

> "Quero que o dono possa pausar uma tela sem apagar."

O agente deve:
1. Encontrar o requisito no `SPEC.md` (ou criar um novo).
2. Explicar em 2 linhas o que será feito.
3. Pedir confirmação se houver impacto em preço, dados ou prazo.
4. Só então implementar.

---

## 16. Pendências do projeto

| # | Pendência | Bloqueia | Situação |
|---|---|---|---|
| D1 | Estratégia de backend | — | ✅ resolvida: estático (1a) → backend (1b) |
| D2 | Escolher o gateway de pagamento | Fase 2 | aberta |
| D3 | Definir comissão (%) | Fase 2 | aberta |
| D4 | Definir preço do plano pago | Fase 2 | aberta |
| D5 | Definir e-mail e WhatsApp oficiais | Páginas legais e contato | aberta |
| D6 | Definir domínio próprio | Endereço final | aberta |
| D7 | Definir cidade/região de lançamento | Marketing | aberta |
| D9 | Provedor definitivo do backend | Fase 1b | aberta |

**Liberado agora:** a **Fase 1a** (vitrine estática com dados de exemplo) pode começar
sem esperar nenhuma pendência. Só a **Fase 1b** depende de D9, e as páginas legais
dependem de D5.
