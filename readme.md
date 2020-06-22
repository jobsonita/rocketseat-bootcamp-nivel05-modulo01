<p align="center"><img alt="Logotipo do Projeto" title="GoBarber" src=".github/logo.svg" width="400px" /></p>

# GoBarber Front-end

<p align="center">Autor: Jobson Gilberto Barros Amorim &lt;jobsonita@gmail.com&gt;</p>

Baseado nas aulas do curso [GoStack](https://rocketseat.com.br/gostack) (turma 11) da Rocketseat.

<p align="center"><img alt="Demonstração do web site" title="Página de Login" src=".github/demo.gif" width="600px" /></p>

## Sobre este projeto

Este projeto é um front-end em ReactJS usando as bibliotecas react, typescript e styled-components.

Para maiores detalhes sobre o passo-a-passo da configuração do projeto, utilize a seção "Comandos utilizados na construção do projeto" deste readme em conjunto com o detalhamento dos [commits](https://github.com/jobsonita/rocketseat-bootcamp-nivel03-modulo02/commits/master) deste repositório.

Este projeto deve ser utilizado em conjunto com o back-end desenvolvido ao longo do GoStack. Atualmente, a versão mais recente compatível com este projeto pode ser encontrada em [jobsonita/rocketseat-bootcamp-nivel02-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02/tree/699df6e5a57c7e9d9013318d06fb108ec91a83d1).

## Dependências Globais

É necessário ter [Node](https://github.com/nvm-sh/nvm) e [Yarn](https://yarnpkg.com) instalados.

## Bibliotecas e ferramentas utilizadas

- react
- typescript
- eslint + prettier (padronização de código)
- styled-components (estilização de componentes)
- polished, react-spring, react-icons (estilizações adicionais)
- unform (controle otimizado de forms)
- yup (validação de dados)
- axios (requisições HTTP REST)
- react-router-dom (roteamento de páginas)
- [VS Code](https://code.visualstudio.com) (editor de código preferido)

## Instalação e execução

Certifique-se de que o back-end da aplicação esteja rodando (siga os passos do [readme do back-end](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02/blob/master/readme.md)).

Com um terminal aberto na raiz do projeto, execute:

```
yarn
```

Após a instalação, execute:

```
yarn start
```

Finalmente, navegue até o endereço http://localhost:3000

## Comandos utilizados na construção do projeto

Caso deseje criar um projeto do zero seguindo os passos dos commits, listo abaixo os comandos executados neste projeto.

### Sessão 01

#### Aula 01

```
yarn create react-app project_name --template=typescript
cd project_name

yarn add eslint -D
yarn eslint --init
```

Configurações do eslint:

```
? How would you like to use ESLint?
> To check syntax, find problems, and enforce code style
? What type of modules does your project use?
> JavaScript modules (import/export)
? Which framework does your project use?
> React
? Does your project use TypeScript?
> y
? Where does your code run?
* Browser
? How would you like to define a style for your project?
> Use a popular style guide
? Which style guide do you want to follow?
> Standard: https://github.com/standard/standard
? What format do you want your config file to be in?
> JSON
? Would you like to install them now with npm?
> n
```

```
yarn add -D eslint-config-standard eslint-config-standard-react @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-node eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-jsx-a11y

yarn add eslint-import-resolver-typescript -D

yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

#### Aula 02

```
yarn add styled-components
yarn add @types/styled-components -D
```

#### Aula 03

```
yarn add react-icons
yarn add polished
```

#### Aula 06

```
yarn add @unform/core @unform/web
```

#### Aula 08

```
yarn add yup
yarn add @types/yup -D
```

### Sessão 02

#### Aula 01

[Alterações no back-end](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02/commit/6b994a49122b925c841dd50652682d9926a71ec5)

#### Aula 03

```
yarn add axios
```

#### Aula 04

Ver sessão04-aula02 mais abaixo.

### Sessão 03

#### Aula 03

```
yarn add uuidv4
```

#### Aula 04

```
yarn add react-spring
```

### Sessão 04

#### Aula 01

```
yarn add react-router-dom
yarn add @types/react-router-dom -D
```

#### Aula 02

Desde a sessão02-aula04, era necessário que o back-end retornasse também os dados do usuário.
Essa alteração está disponível em:
https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02/commit/214ff4ceeb12ec1c5b9c7fd76eb85bf706724a4f

#### Aula 03

Nesta aula foi feita uma correção na funcionalidade de logout do contexto de autenticação.
