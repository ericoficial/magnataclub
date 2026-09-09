# Magnata Club — Landing Page

Landing page da inauguração da **Magnata Club**, a nova casa de shows, entretenimento e eventos do Perequê, em Guarujá — SP.

Site estático (HTML/CSS/JS puro, sem build step), pronto para publicar em qualquer host estático (GitHub Pages, Netlify, Vercel, Hostinger, etc.).

## Estrutura

```
index.html          # página única (todas as seções)
css/style.css        # design system (tokens de cor, tipografia, espaçamento) + componentes
js/main.js           # menu mobile, accordion do FAQ, animação de entrada ao rolar a página
assets/img/          # logo (wordmark, lockup, crest) e textura de fundo
```

## Design system

Paleta preto/champanhe, serifada (Cormorant Garamond) + sans (Montserrat), tokens de cor/tipografia/espaçamento/raio/sombra definidos em `:root` no topo de `css/style.css`. Baseado no design system gerado no Claude Design para a marca Magnata Club.

## Conteúdo editável

Os pontos mais prováveis de manutenção recorrente:

- **Número de WhatsApp**: `5513982228885` — aparece nos links `wa.me/...` ao longo do arquivo e no rodapé.
- **Data/hora da inauguração**: "12 de setembro · Sábado · 23h" — aparece no hero, seção de inauguração, CTA final e rodapé.
- **Line-up**: lista em `#inauguracao` (`.lineup-list`) e repetida no CTA final.
- **FAQ**: seção `<section>` com `data-accordion`, perguntas e respostas em `<div class="accordion-item">`.
- **Endereço**: "Av. Rio Amazonas — em frente ao Campo do Perequê, Perequê · Guarujá — SP".

## Rodar localmente

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
npx serve .
```

## Publicar

Qualquer hospedagem de arquivos estáticos serve. Para GitHub Pages: Settings → Pages → Deploy from branch → `main` / `/ (root)`.
