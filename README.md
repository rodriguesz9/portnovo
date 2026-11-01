# Portfólio — Robert Rodrigues

Portfólio React/Vite com projetos, animações e cena NEXBOT local integrada pelo Hermes Agent.

## Desenvolvimento

Use uma versão Node compatível com Vite7. Execute `npm ci`, `npm run dev`, `npm run lint`, `npx --no-install tsc --noEmit` e `npm run build`. A política local .npmrc preserva a resolução de dependências validada, sem executar scripts de instalação. O build fica em dist.

O lockfile depende dos tarballs Paper em vendor/. Cena e recurso WASM são locais em public/scenes; consulte ORIGEM.json e THIRD_PARTY_NOTICES.md para as atribuições e limitações: a licença MIT do wrapper não cobre automaticamente cena/runtime/WASM. HDRs não usados foram excluídos desta exportação.

Esta cópia não inclui credenciais, histórico Git anterior, infraestrutura da agência ou arquivos internos de QA. vercel.json prepara o build; não configura conta, domínio ou publicação.

O build obtém process.wasm da URL oficial fixada e confere tamanho/SHA-256 do manifesto. Esse binário não é republicado no Git. A primeira compilação exige conexão ao distribuidor oficial; execuções seguintes reutilizam apenas o arquivo com hash aprovado. Não há busca externa no navegador. A revisão/licença do runtime permanece distinta da licença MIT do wrapper; publicação do site continua separada.

## Verificação local

Instalação limpa, TypeScript, lint e build passaram. QA consolidada: 12 grupos aprovados e uma reprovação do critério estrito de zero violações CSP. A ocorrência corresponde ao probe vazio `new Function('')` do runtime, bloqueado pela CSP e tratado com fallback; o robô renderiza. A proteção foi mantida, sem unsafe-eval. Drag não é prometido: a cena oferece exploração pelo ponteiro. Sem medição em celular/GPU físico.

Deploy automático por Git está desativado em vercel.json. Envio de fontes não autoriza publicação do site.
