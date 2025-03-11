# API de cotação de preços usando Chainlink Price Feeds

Esta API permite obter a cotação de preços de diferentes tokens utilizando os feeds de preços da Chainlink. É uma ferramenta útil para desenvolvedores que precisam integrar dados de preços em tempo real em suas aplicações.

## Endpoint

### `GET /api/token-price`

Este endpoint retorna o preço de um token específico.

#### Parâmetros de Consulta

- `ticker` (obrigatório): O símbolo do token para o qual você deseja obter o preço. Exemplo: `brl`.

#### Exemplo de Requisição

```
http://localhost:3000/api/token-price?ticker=brl
```

#### Exemplo de Retorno

```json
{
    "ticker": "BRL",
    "name": "BRL Token Test",
    "decimals": 6,
    "usdPrice": "0.170858970"
}
```

## Descrição dos Campos do Retorno

- `ticker`: O símbolo do token.
- `name`: O nome do token.
- `decimals`: O número de casas decimais usadas pelo token.
- `usdPrice`: O preço do token em dólares americanos.

## Como Usar

1. Faça uma requisição GET para o endpoint `/api/token-price` com o parâmetro `ticker` especificando o token desejado.
2. O retorno será um objeto JSON contendo o preço atual do token em dólares americanos, além de outras informações relevantes.

## Exemplo de Uso em Código

Aqui está um exemplo de como você pode usar a API em um script JavaScript:

```javascript
fetch('http://localhost:3000/api/token-price?ticker=brl')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));
```

## Considerações Finais

Esta API é baseada nos feeds de preços da Chainlink, garantindo dados precisos e confiáveis. Certifique-se de tratar os dados retornados de forma adequada em sua aplicação para evitar erros e inconsistências.
