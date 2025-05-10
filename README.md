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

1. Na raiz do projeto, execute:

    ```bash
    docker-compose up --build -d
    ```

2. Para verificar os logs:

    ```bash
    docker-compose logs -f
    ```

3. Para parar os serviços:

    ```bash
    docker-compose down
    ```

### Acessando os Serviços

- Serviço de Notificações: <http://localhost:3000>
- Serviço de Pagamentos: <http://localhost:3001>

### Monitoramento

Para verificar o status dos containers:

```bash
docker-compose ps
```
