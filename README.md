# Sistema de Microserviços

## Descrição

Este é um sistema distribuído composto por dois microserviços:

1. **Serviço de Notificações**
   - Responsável pelo gerenciamento e envio de notificações
   - Implementado em NestJS
   - Porta: 3000

2. **Serviço de Pagamentos**
   - Gerencia o processamento de pagamentos
   - Implementado em NestJS
   - Porta: 3001

## Infraestrutura

O sistema utiliza uma arquitetura de microserviços com as seguintes características:

- **Comunicação**: Comunicação assíncrona entre serviços
- **Containerização**: Cada serviço é containerizado usando Docker
- **Orquestração**: Docker Compose para gerenciamento dos containers
- **Escalabilidade**: Serviços independentes permitem escalar individualmente
- **Resiliência**: Falhas em um serviço não afetam o outro

## Executando o Projeto

### Pré-requisitos

- Docker
- Docker Compose

### Iniciando os Serviços

1. Na raiz do projeto, execute para rodar os dois micro serviços ao mesmo tempo:

    ```bash
    docker compose -f notification-service/docker-compose.yaml -f payment-service/docker-compose.yaml up --build -d
    ```

2. Para parar um ou mais serviços referencie com o -f qual o docker-compose que está interagindo:

    ```bash
    docker compose -f notification-service/docker-compose.yaml -f payment-service/docker-compose.yaml down

    ```

### Acessando os Serviços

- Serviço de Notificações: <http://localhost:3000>
- Serviço de Pagamentos: <http://localhost:3001>

### Monitoramento

Para verificar o status dos containers:

```bash
docker-compose ps
```
