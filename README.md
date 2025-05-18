# Sistema de Pagamento e Notificação

Este é um sistema distribuído que implementa um serviço de pagamento com cartão de crédito e um serviço de notificação por e-mail. O sistema utiliza NestJS para os microserviços e RabbitMQ para comunicação entre eles.

## Arquitetura

O sistema é composto por dois microserviços:

1. **Serviço de Pagamento (ms-payment-service)**
   - Gerencia pagamentos com cartão de crédito
   - Porta: 3000

2. **Serviço de Notificação (ms-notification-service)**
   - Recebe e processa notificações
   - Porta: 3001

## Pré-requisitos

- Docker
- Docker Compose

## Executando o Projeto

1. Clone o repositório:

    ```bash
    git clone git@github.com:bentoluizv/sistemas_distribuidos.git
    cd sistemas_distribuidos
    ```

2. Inicie todos os serviços com Docker Compose:

    ```bash
    docker compose up -d --build
    ```

Este comando irá:

- Criar e iniciar os containers
- Configurar as redes
- Configurar os volumes
- Executar as migrações do banco de dados
- Iniciar os serviços

## Acessando a API

### Serviço de Pagamento

- Swagger UI: <http://localhost:3000/api>
- Endpoints:
  - POST /credit-card: Criar um novo pagamento

### Serviço de Notificação

- Endpoints:
  - GET /mail/get: Consultar notificações por usuário

## Comandos Úteis do Docker Compose

1. Verificar status dos serviços:

    ```bash
    docker compose ps
    ```

2. Visualizar logs dos serviços:

    ```bash
    docker compose logs -f
    ```

3. Parar todos os serviços:

    ```bash
    docker compose down
    ```

4. Reconstruir e reiniciar os serviços:

    ```bash
    docker compose up -d --build
    ```

5. Visualizar logs de um serviço específico:

    ```bash
    docker compose logs -f ms-payment-service
    docker compose logs -f ms-notification-service
    ```

## Fluxo de Funcionamento

1. O cliente faz uma requisição para criar um pagamento
2. O serviço de pagamento processa a transação
3. Uma notificação é enviada para o serviço de notificação via RabbitMQ
4. O serviço de notificação faz um log da notificação recebita na fila.

## Solução de Problemas

Se encontrar algum problema:

1. Verifique se todos os containers estão rodando:

    ```bash
    docker compose ps
    ```

2. Verifique os logs em busca de erros:

    ```bash
    docker compose logs -f
    ```

3. Se necessário, reinicie os serviços:

    ```bash
    docker compose restart
    ```

4. Para uma reinicialização completa:

    ```bash
    docker compose down
    docker compose up -d
    ```
