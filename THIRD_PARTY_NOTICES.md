# Avisos de terceiros

## Threads — React Bits, fonte fornecida pelo usuário

David Haz / React Bits. Origem, hashes e blob oficial em public/licenses/threads/PROVENANCE.json. Código GLSL WebGL2 nativo fornecido localmente; shaders preservados. Adaptação em src/components/ui/Threads.jsx: seção Contato, elegibilidade compartilhada, inicialização lazy, DPR 1.25, limite 1.2 milhão de pixels/1920px, 30fps, eventos só da seção, descarte ao pausar/sair/hidden/reduced/saveData e fallback CSS. Não é MIT puro. Texto integral fornecido:

MIT + Commons Clause License Condition v1.0

Copyright (c) 2026 David Haz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, and distribute the Software **as part of an application, website, or product**, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

## Commons Clause Restriction

You may use this Software, including for any commercial purpose, **so long as you do not sell, sublicense, or redistribute the components themselves-whether alone, in a bundle, or as a ported version.**

The same restriction covers the React Bits tools (Background Studio, Texture Lab, Shape Magic, Center Stage, Sound Lab and any tools added later) and the sounds in the sound library. **You may not sell, sublicense, or redistribute the tools or the sounds themselves, or offer the tools or a substantially similar copy of them as a hosted service-whether alone, in a bundle, or as a ported version.**

What you make with the tools is yours to use. You can use exported code, images, videos, and audio files in any personal or commercial application, website, or product, including paid ones. **You may not sell or redistribute the exports on their own, either individually or as the product itself, such as a sound, texture, background, or template pack.**

## No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Introdução e scroll autorais autorizados

SessionIntro, ScrollWords, Perspective e a nova máscara MessageReveal são implementações próprias autorizadas, com React/framer-motion já existentes. Skiper8 é Pro: nenhum código pago obtido, instalado ou declarado original. Apenas ideia de palavras sequenciais e saída curva. Referências Instagram DbrE_blM7XZ e Db6gJljsXaQ ficam para etapa posterior; vídeos não incorporados nem analisados integralmente nesta entrega. Sem trackers, Search Console, APIs de contato ou publicação.

## Sobre — três originais adaptados de fontes locais autorizadas

EncryptedText: Manu Arora / Aceternity, fonte pública do painel Manual em https://ui.aceternity.com/components/encrypted-text; MIT declarada pelo autor no catálogo 21st. O registry retornou 403 ao controlador; não houve recuperação adicional, login ou contorno de acesso. Adaptação em src/components/ui/encrypted-text.tsx preserva geração aleatória com espaços, revelação progressiva por tempo e requestAnimationFrame; usa framer-motion existente no lugar de motion/react, texto assistivo estável, reserva de layout e final legível nos estados inativos.

WavyBlock / WavyBlockItem: Youcef Benmessabih (YoucefBnm), Systaliko-UI, MIT, commit ed82dae1ed03605ceea1415f92a45399eb76b111; publicado no 21st como wavy-text-block. Origem exata consta de public/licenses/about/wavy-block/PROVENANCE.json. src/components/ui/wavy-block.tsx mantém contexto, progresso de scroll, offsets senoidais/cossenoidais e springs; leitura DOM movida para layout effect, API on('change'), amplitude local discreta e estado estático acessível. Licença integral original incluída, sem alterar a referência.

LiveOrb: radiumcoders, registro público https://23rd.dev/r/live-orb.json ligado pelo autor no 21st; MIT declarada na página do autor. Adaptação em src/components/ui/live-orb.tsx preserva o shader GLSL original, materiais, olhos, blink, autogaze, restauração de contexto e engine WebGL. Acrescenta elegibilidade real/paused com cancelamento de RAF, saveData, coarse/mobile estático, DPR máximo 1.5, fallback CSS e limpeza inclusive em falha de inicialização. Os três orbs são decorativos; tema explicitamente escuro. Nenhuma dependência nova.

Proveniências originais e licença fornecida: public/licenses/about. Não foram fornecidos cabeçalhos de copyright ou arquivos LICENSE integrais para EncryptedText/LiveOrb; a declaração MIT vem da proveniência e não foi apresentada como validação jurídica independente. O texto padrão MIT acompanha a declaração com autoria atribuída sem inventar ano. Revisão humana dos direitos antes de publicação permanece necessária.

Histórico: gughigug/liquid-glass-navbar e anark17r/data-rain não foram obtidos nem integrados. Estado atual: RESOLVIDO POR ALTERNATIVA AUTORIZADA explicitamente em /workspace/referencias/portfolio-about/profile/USER-UPDATE.md. SectionNavigation e DataRain são duas implementações PRÓPRIAS inspiradas nas referências visuais autorizadas, não Nimbus, gughigug ou código anark17r. Navbar usa CSS glass e medição de links reais; Data Rain usa Canvas2D local com 64 partículas e influência do ponteiro. Não se transfere a licença dos originais ausentes a essas versões próprias. Nenhuma chamada 21st, instalação, alteração de CSP, consulta externa ou produção nesta etapa. Relatório: docs/RELATORIO-SOBRE-ORBS.md.

## Revisão escura — JolyUI, 8bitcn e efeitos próprios

Liquid Metal Button: Johuniq / JolyUI, MIT, commit a889dac1d8b18bc70eac69c0245ca65579381293. Fonte pública oficial provisionada localmente pelo controlador, ligada pelo catálogo 21st. Adaptação real em src/components/ui/liquid-metal-button.tsx preserva camadas cromo/preto e liquidMetalFragmentShader via Paper ShaderMount 0.0.81 (Apache-2.0, avisos abaixo). A adaptação usa dispose(), não destroy(), setSpeed(), foco visível, rótulos em português, largura de conteúdo, fallback CSS e duas instâncias no máximo. Licença e proveniência integrais em public/licenses/jolyui.

Timeline2: TheOrcDev / 8bitcn-ui, MIT, commit 56066c038165223b8505a344309279ae27757a81. Adaptação em src/components/ui/timeline2.tsx mantém checkpoints, títulos, descrições e linha horizontal; progressão cumulativa e reversível por scroll, sem captura de wheel, são implementação local. Licença e proveniência em public/licenses/8bitcn. Press Start 2P foi fornecida localmente sob SIL OFL; fonte e OFL.txt em public/fonts/local, carregada apenas na timeline. Nenhum @import de Google Fonts.

Dither Trail e MessageReveal: implementações próprias locais inspiradas na screenshot autorizada. Não são código heyquincy nem integração original 21st. Um único canvas global decorativo, cursor nativo preservado. A galeria de capturas e o controle de diálogos também são adaptações locais.

Galeria atual: public/imgs/projects/manifest.json registra origens, legendas e limitações por arquivo. MyDay agora usa capturas reais de execução local com dados demo, não a ilustração histórica. Bootstrap de captura recompilado em .qa com JSX automático; componentes originais intactos. Trimm foi capturado sem recursos externos bloqueados; alegações das páginas de demonstração não foram validadas como funcionalidades em produção. Finanças Já: imagens públicas fornecidas pelo controlador, repositório continua privado. Seninha: snapshot local, proposta em revisão. As menções a MyDay ilustrativo abaixo são históricas, não descrevem a galeria atual.

O registro histórico de fontes originais ausentes foi preservado acima; as alternativas autorais autorizadas já estão implementadas. Nenhuma cota 21st foi usada nesta revisão; não houve instalação, atualização de stack ou publicação.

## Glass Folder Cards e Wild Hunt Footer — fontes originais 21st

Kedhareswer Naidu (@kedhareswer), MIT declarada nas páginas oficiais. Fontes integrais fornecidas pelo controlador via MCP oficial autenticado, preservadas em /workspace/referencias/21st/portfolio-quatro-componentes. Adaptações em src/components/ui/glass-folder-cards.tsx e wild-hunt-footer.tsx. Licença integral e proveniências distribuídas em public/licenses/quatro. React é a única dependência dos originais; nenhum instalador executado. Pastas usam capturas locais e ações reais dos quatro projetos, sem adicionar arquivos fictícios. Footer preserva Bayer ordered-dither, camadas, rasterização da fonte system, retículo e click-scan; identidade e paleta foram adaptadas.

Pintura: Peter Nicolai Arbo, Åsgårdsreien (1872), Nasjonalmuseet, Oslo, domínio público via Wikimedia Commons conforme declaração da fonte original. Pintura e cutout locais extraídos da demo oficial pelo controlador; recorte fornecido com a demo, não se presume licença individual distinta. Hashes e origem em REVIEW.json na referência. Arquivos em public/21st/wild-hunt. A revisão humana dos direitos antes de publicar continua necessária. A capa MyDay é SVG local ilustrativo, não screenshot.

## Revisão atual — Spline Scene e shader de abertura

Referência: https://21st.dev/@serafimcloud/components/splite , Spline Scene, autor serafimcloud. MIT é a licença declarada do snippet 21st, conforme proveniência fornecida pelo controlador; NÃO se estende à cena, ao runtime nem ao WASM. Card (padrão shadcn), Spotlight (atribuído pelo usuário a ibelick) e wrapper foram fornecidos pelo usuário. Adaptações locais em src/components/ui incluem listeners estáveis, MotionValue, pausa/reduced-motion, ref de h3, português e allowlist local. A proveniência é public/scenes/ORIGEM.json; não houve consulta remota pelo worker nesta rodada. Não se inventa texto de copyright ausente para o snippet.

O robô Spline está integrado e foi renderizado localmente. Cena exata: https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode , copiada pelo controlador para public/scenes/scene.splinecode. Origem: Comunidade Spline, NEXBOT — robot character concept, arquivo 615b9422-9985-43f6-8593-d7d7bc3b0be1, https://app.spline.design/community/file/615b9422-9985-43f6-8593-d7d7bc3b0be1 . Standard Commercial License conforme ORIGEM.json e referência https://spline.design/terms fornecidos; não é MIT nem Whobee. SHA-256 4e31d7ef0b54fd02e2dd373f18f89c32003ce6d9220a996e09c94efa4c7c31f9. A licença e redistribuição da cena e ativos internos exigem revisão humana antes de publicar.

@splinetool/runtime 1.12.98, @splinetool/react-spline 4.1.0 e process.wasm local acompanham a instalação preparada. O app usa Application do runtime via adaptador local, não o wrapper React. Segundo proveniência local, runtime não declara campo license nem arquivo LICENSE; isso NÃO implica MIT, domínio público ou autorização irrestrita. Não se atribui licença presumida ao wrapper React, WASM ou dependências. Termos oficiais e direitos de redistribuição devem ser revisados pelo controlador. Nenhuma conexão de conta, upload, gasto ou autorização de produção foi realizada.

O elo deixou de ser montado; fontes e avisos históricos preservados. A abertura usa a cena nativa NEXBOT, Card e Spotlight. MyDay mantém Perlin Noise oficial; ShaderGradient/preset preservado. Tailwind theme/utilities sem Preflight; sem instalação shadcn. Menções abaixo ao elo preservado registram a integração histórica, não a montagem atual.

## Paper Shaders — Perlin Noise, referência do catálogo 21st.dev

Autoria: Paper. Catálogo exato: https://21st.dev/@paper-design/components/perlin-noise . Fonte indicada: https://shaders.paper.design/perlin-noise . Upstream: https://github.com/paper-design/shaders . Versão provisionada: @paper-design/shaders e @paper-design/shaders-react 0.0.81, Apache-2.0 (não a versão 0.0.76). Arquivos LICENSE/NOTICE integrais de ambos acompanham public/licenses/paper-shaders e public/licenses/paper-shaders-react e a saída local de build, distribuídos como LICENSE.txt/NOTICE.txt sem alteração de bytes; originais upstream preservados.

Integração em src/ProjectNoise.jsx: fragment shader PerlinNoise oficial, sem alteração do GLSL, montado pela API oficial ShaderMount do core. A API React PerlinNoise e seu wrapper foram consultados; utiliza-se o core para capturar falhas síncronas de construção, pois o wrapper React inicializa assincronamente e não oferece onError. A adaptação local define paleta azul/neutra, dois octaves, velocidade baixa, orçamento por área com DPR efetivo limitado a aproximadamente 1,25 e gestão de import sob demanda, visibilidade, pausa, descarte e fallback. Sem textura ou request externo. Fundo apenas da ilustração MyDay; não é o aplicativo em execução. ShaderGradient e elo existentes não foram alterados.

Isto integra o upstream público listado pelo 21st; não é código do ShaderBuilder, recuperação via MCP ou conexão de conta 21st. Whobee não foi integrado; a cena atual NEXBOT está descrita separadamente acima. Nenhum crédito promocional foi inserido na UI.

NOTICE original: Paper Shaders; Copyright 2026 Paper; Powered by Paper Shaders: https://shaders.paper.design . Os arquivos integrais preservam a redação original.

## Cult UI — adaptação local do Minimal Card

Origem: nolly-studio/cult-ui, commit d71b1428b811c2779d46ea41b7ef8c9f9c9991c2.
Código consultado: https://raw.githubusercontent.com/nolly-studio/cult-ui/d71b1428b811c2779d46ea41b7ef8c9f9c9991c2/apps/www/registry/default/ui/minimal-card.tsx
Licença consultada: https://raw.githubusercontent.com/nolly-studio/cult-ui/d71b1428b811c2779d46ea41b7ef8c9f9c9991c2/LICENSE.md

Adaptação em src/Effects.jsx (MinimalCard) e src/Effects.css: shell composável com HTML article e imagens nativas no lugar de div/Next; CSS próprio em lugar de Tailwind. O redesign atual usa superfícies de galeria, moldura fina, conteúdo agrupado e profundidade transitória nas telas reais, sem sombra genérica em todos os cards. O princípio de composição deriva da consulta MIT anterior, cuja atribuição é preservada. Não foi instalado registry, Next ou Tailwind. Expansão usa dialog nativo original; não se copiou outro componente online nesta revisão.

MIT License

Copyright (c) 2023 Jordan-Gilliam

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## ShaderGradient

@shadergradient/react 2.4.20, renderer oficial de ruucm/shadergradient.
Referência revisada: commit 68bdd740037a11c639f8b91fd775949c71d718d0.
README: https://raw.githubusercontent.com/ruucm/shadergradient/68bdd740037a11c639f8b91fd775949c71d718d0/README.md
Manifesto: https://raw.githubusercontent.com/ruucm/shadergradient/68bdd740037a11c639f8b91fd775949c71d718d0/packages/shadergradient/package.json

O README atribui: MIT © ruucm, stone-skipper. O manifesto distribuído declara MIT. Tentativas de leitura dos arquivos de licença root LICENSE, LICENSE.md e LICENSE.txt retornaram 404; não se inventou ano de copyright. Abaixo, texto padrão MIT com a atribuição explícita do README:

MIT License

Copyright (c) ruucm, stone-skipper

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### HDR locais

public/environments/city.hdr, dawn.hdr e lobby.hdr foram provisionados pelo controlador a partir do repositório oficial ruucm/shadergradient no commit 68bdd740037a11c639f8b91fd775949c71d718d0, conforme material autorizado do usuário. Permanecem como recursos disponíveis para futuros presets env, NÃO carregados pelo preset atual lightType=3d. A decodificação artificial anterior por RGBELoader foi removida pelo Hermes após a revisão da expectativa de teste; não é necessária à iluminação atual. Os arquivos locais foram inventariados, sem baixar nem comparar binários remotos. A atribuição MIT do projeto acompanha os arquivos; não foi encontrada nesta consulta uma declaração individual por HDR. Uma eventual publicação requer revisão humana da cadeia de licenças dos ativos. Hashes locais estão em docs/resultado-efeitos-final.json.

## Refero

https://styles.refero.design/ e o sistema Brex b58d92f6-68a8-4358-8fc9-6ea58e6d483b foram consultados como referência textual de hierarquia, espaço e superfícies. Não foram copiadas marca, fonte proprietária, imagens ou identidade Brex. Não se atribui uma licença de código a essa inspiração.

## Mídia do portfólio

A gravação antiga portfolio.webm e poster.jpg foram retirados de public e arquivados apenas em docs/historico-pre-integracao/media; não acompanham dist e não são carregados pela página. Eram gravação/captura local do próprio portfólio, não de aplicativos em execução. A técnica foi substituída por captura expansiva de projeto real, sem alegar manutenção literal do vídeo.

public/imgs/seninha-landing.png: screenshot produzido pelo Hermes com Playwright do snapshot público fornecido em /workspace/referencias/portfolio-integrado/salao-seninha-site, servido exclusivamente em localhost com rede externa bloqueada. URL original e hashes de origem constam do ORIGEM.json fornecido; método, hash da captura e evidências estão em docs/seninha-capture.json. Não é mockup nem imagem remota baixada nesta sessão. Marcas e imagens continuam pertencendo aos respectivos titulares e são usadas somente no contexto do projeto autorizado em revisão; não ampliam direitos de uso nem significam contratação/entrega. Os demais screenshots fornecidos mantêm sua proveniência original. MyDay continua explicitamente ilustrativo.

## Escultura e referências desta revisão

src/sculptedLoop.js e src/Sculpture.jsx: elo fechado com seção elíptica torcida, malha paramétrica e iluminação/sombra locais originais, criados pelo Hermes com Three/R3F já provisionados. Substitui o tubo aberto/calotas das versões anteriores, sem primitivas de torus ou modelo baixado. public/imgs/sculpted-loop.svg: interpretação vetorial original do elo como alternativa estática, não render oficial Three nem cópia de ativo Slush. Nenhum modelo, HDR ou textura externa utilizado na escultura. A peça ocupa área independente do texto; a sobreposição de letras foi rejeitada pelo usuário.

Acabamento interativo: RoomEnvironment de three/examples/jsm/environments/RoomEnvironment.js, já presente no Three 0.169.0 provisionado, gera um ambiente de estúdio local com PMREM. A origem do arquivo remete à EnvironmentScene do projeto google/model-viewer; os avisos/licença distribuídos com Three permanecem aplicáveis. Não foi baixado ambiente, HDR, imagem ou textura externa. O mapa é gerado na GPU a partir de geometria/luzes locais e descartado na desmontagem. A malha e o azul aprovados foram preservados, com tesselação maior, DPR limitado, shadow map PCFSoft real e controles locais próprios.

As três referências textuais apple-galeria-clara.md, apple-galeria-escura.md e slush-3d.md foram fornecidas pelo usuário. Inspiram hierarquia de galeria, ritmo de superfícies e volume azul. Não foram copiados logotipos, hardware, ativos Apple/Slush, textos de produtos ou fontes SF Pro/Lateral/Aeonik. Fontes do portfólio são Arial/Helvetica locais. Não se atribui licença de código às referências descritivas. Vídeos originais não foram assistidos nesta sessão e a imagem do problema não foi vista em pixels.

## Outras dependências

React, React DOM, Vite, lucide-react, @react-three/fiber 9.8.2, three 0.169.0, three-stdlib 2.30.1 e camera-controls 2.9.0 são dependências provisionadas localmente. Seus avisos e licenças distribuídos nos pacotes permanecem aplicáveis. Este arquivo não substitui as licenças das dependências transitivas. Nenhuma licença concede autorização para publicar este portfólio automaticamente.
