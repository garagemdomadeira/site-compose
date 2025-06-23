---
title: "Conhecendo o modo SCS nos Honda."
date: "2021-03-27"
categories:
  - "honda-cr-v"
  - "diagnostico"
  - "procedimentos"
tags:
  - "modo scs"
  - "dtc"
  - "diagnóstico"
  - "códigos de erro"
  - "painel"
  - "porta obd2"
  - "jumper"
  - "abs"
  - "vsa"
  - "tutorial"
---

![](header_scs.jpg)

Nem sempre temos disponível um scanner para conectarmos na porta de diagnóstico quando passamos por problemas em nossos carros. Foi pensando nisso que a Honda elaborou um sistema muito prático que ajuda muito na hora de descobrir os famosos DTC's. Ficou curioso? Então continue na leitura.

<!--more-->

**O SCS (Service Check System) nos permite compreender melhor os DTC's do carro.**  
Um **DTC** (em inglês: **Diagnostic Trouble Code**, algo como Código de Disgnóstico de Problemas) é um código guardado na memória interna da Central Eletrônica dos veículos mais modernos. Através do DTC é possível analisar os casos e chegar em melhores conclusões sobre diversos problemas.

> Caso interesse:
> 
> [Temos uma lista dos códigos de erro para o sistema de ABS e VSA neste post: **Lista de códigos de erro em ABS e VSA para CR-V**](/2021/03/lista-de-codigos-de-erro-em-abs-e-vsa-para-cr-v/)

## Como ativar o modo SCS?

Para ativar o modo SCS você precisa localizar a porta de comunicação do veículo (sim ele possui uma porta como se fosse USB). No caso da CR-V ano 2011 a foto abaixo mostra a localização da porta:

<figure>

![](porta-diagnostico.jpg)

<figcaption>

Localização da porta de diagnóstico da CR-V 2011

</figcaption>

</figure>

Você vai precisar de um jumper que pode ser feito com fio rígido ou até mesmo um clips de papel. Você deverá juntar os pinos 9 e 4 da porta de diagnóstico. Veja na imagem abaixo:

<figure>

![](https://garagemdomadeira.com/wp-content/uploads/2021/03/obd2-com-scs.jpg?w=696)

<figcaption>

Ativando o modo SCS na porta de diagnóstico do Honda CR-V 2011

</figcaption>

</figure>

Feito isso basta girar a chave do carro para a posição **ligado** sem ligar o motor do veículo.

## Como interpretar as mensagens do painel?

Quando o veículo fica no modo SCS você vai notar que as lâmpadas de alerta no painel ficarão piscando. Logo assim que colocamos o contato da chave na posição **ligado** você poderá começar a contar o número de vezes que as luzes irão piscar, vamos tomar como exemplo o sistema de ABS. A luz de ABS irá realizar piscadas longas e curtas, primeiro você deve anotar a quantidade de piscadas longas e depois a quantidade de piscadas curtas.  
  
**Cada piscada longa equivale a 10 valores, cada piscada rápida equivale 1 valor.  
**  
Vamos supor que a luz do ABS pisque longamente por seis vezes e logo após ela pisque rapidamente duas vezes, isto equivale a:

- 6 piscadas longas equivale a 60
- 2 piscadas curtas equivale a 2

Somando tudo temos o número 62. 
  
Após isso basta verificar na tabela do respectivo sistema.

[Temos uma lista dos códigos de erro para o sistema de ABS e VSA neste post: **Lista de códigos de erro em ABS e VSA para CR-V**](/2021/03/lista-de-codigos-de-erro-em-abs-e-vsa-para-cr-v/)


