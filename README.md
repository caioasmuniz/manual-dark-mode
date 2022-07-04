# manual-dark-mode

## Acesse a página em https://manualdarkmode.web.app/

## Instruções para Setup do ambiente de desenvolvimento
0. Baixar o Node.js e o npm: https://nodejs.org/en/
1. Baixe a CLI do Firebase: `npm i -g firebase-tools`
2. Logue na sua conta: `firebase login`
3. Inicie o projeto com `firebase init` e então selecione (usando setas e barra de espaço) as opções **Hosting** e **emulators**

## Instruções para iniciar o projeto localmente
1. Depois de ter setado o ambiente, execute `firebase emulators:start`
2. Acesse o site pelo emulador do projeto em http://localhost:4000; ou diretamente em http://localhost:5000

## Instruções para deploy no firebase
1. Crie um diretorio `config` na raiz do projeto 
2. Crie um arquivo `firebase-config.json` dentro do diretório `config`
3. Cole a configuração do seu projeto no firebase nesse arquivo **(apenas a parte entre chaves)** 
