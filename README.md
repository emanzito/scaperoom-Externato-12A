# Escape da Escola Misteriosa

Um escape room educativo digital baseado num mapa interativo da escola, com enigmas de diferentes disciplinas.

## Estrutura do Projeto

- `index.html`: Página inicial com o mapa e hotspots
- `html/`: Pasta com páginas das salas
  - `math.html`: Sala de Matemática
  - `portugues.html`: Sala de Português
  - `psicologia.html`: Sala de Psicologia
  - `biologia.html`: Sala de Biologia
  - `moral.html`: Sala de Moral
  - `educacao.html`: Sala de Educação Física
  - `victory.html`: Página de vitória
- `css/`: Pasta com estilos
  - `style.css`: Estilos compartilhados
- `js/`: Pasta com JavaScript
  - `script.js`: JavaScript compartilhado

## Como Jogar

1. Abre `index.html` no teu navegador web.

2. Clica nos hotspots amarelos no mapa para entrar nas salas de cada disciplina.

3. Resolve os enigmas pedagógicos para obter códigos.

4. Quando todos os enigmas estiverem resolvidos, o hotspot da Saída fica verde e podes escapar!

5. Tens 60 minutos para completar o jogo.

## Disciplinas e Enigmas

- **Matemática**: Área de um triângulo
- **Português**: Antónimo de "alegre"
- **Psicologia**: Efeito de conformidade (Asch)
- **Biologia**: Órgão da respiração
- **Moral**: Significado de "empatia"
- **Educação Física**: Jogadores numa equipa de futebol

## Funcionalidades

- Temporizador regressivo
- Feedback imediato nos enigmas
- Mapa interativo com hotspots
- Tela de vitória com tempo restante
- Botão para jogar novamente
- Estado guardado no localStorage (persiste entre páginas)

## Requisitos

- Navegador web moderno
- Imagens na raiz do projeto:
  - `mapa-escola.jpg`: Mapa da escola para o fundo
  - `math-room.jpg`: Fundo para a sala de Matemática
  - `portugues-room.jpg`: Fundo para a sala de Português
  - `psicologia-room.jpg`: Fundo para a sala de Psicologia
  - `biologia-room.jpg`: Fundo para a sala de Biologia
  - `moral-room.jpg`: Fundo para a sala de Moral
  - `educacao-room.jpg`: Fundo para a sala de Educação Física

Substitui estes placeholders por imagens reais da tua escola para uma experiência imersiva.

## Personalização

- Ajusta as posições dos hotspots editando os estilos `left` e `top` em % em `index.html`.
- Modifica os enigmas no objeto `puzzles` em `js/script.js`.
- Edita estilos em `css/style.css`.

Divirta-se aprendendo!