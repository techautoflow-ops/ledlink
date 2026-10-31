# LedLink

Plataforma que conecta **donos de painéis de LED** a **empresas que querem anunciar**.

- Catálogo de telas com busca e filtros
- Agenda e contratos (fase seguinte)
- Contato direto por WhatsApp

> **Fase 1a — prévia estática.** O site roda com dados de exemplo e **não salva nada**.
> Ainda não há cadastro nem login.

---

## Rodar localmente

O site não tem build nem dependências. Basta servir a pasta:

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000>.

> Abrir o `index.html` direto no navegador **não funciona**: os módulos JS e os JSON
> são bloqueados pelo navegador fora de um servidor.

---

## Estrutura

```
.
├── index.html            # página inicial
├── catalogo.html         # catálogo com filtros
├── tela.html             # detalhe da tela (?id=...)
├── 404.html
├── public/favicon.svg
├── src/
│   ├── config.js         # WhatsApp, e-mail e modo demo
│   ├── data/screens.json # dados de exemplo das telas
│   ├── services/         # ÚNICA camada de acesso a dados
│   ├── i18n/             # traduções pt-BR e en
│   ├── lib/              # utilitários (formatação)
│   ├── app/              # scripts das páginas
│   └── styles/           # tokens + estilos
├── SPEC.md               # especificação do produto
└── AGENTS.md             # regras para IA e pessoas que editam o projeto
```

---

## O que editar

| Quero… | Edite |
|---|---|
| Trocar o número de WhatsApp ou e-mail | `src/config.js` |
| Adicionar ou editar telas | `src/data/screens.json` |
| Mudar textos do site | `src/i18n/pt-BR.json` e `src/i18n/en.json` |
| Mudar cores ou fontes | `src/styles/tokens.css` |
| Mudar uma regra do produto | `SPEC.md` **primeiro** |

---

## Publicação

O site é publicado automaticamente pelo GitHub Pages a partir da branch `main`
(pasta raiz, sem build).

- URL: <https://techautoflow-ops.github.io/ledlink/>

---

## Próximas fases

1. **1b** — contas (Google e e-mail), telas reais, pedidos, contratos e agenda.
2. **2** — pagamento (Pix, cartão, boleto), assinatura e comissão.
3. **3** — chat interno, avaliações e mapa.

Detalhes em [`SPEC.md`](./SPEC.md).
