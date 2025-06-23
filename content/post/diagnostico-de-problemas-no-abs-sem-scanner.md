---
title: "Diagnóstico de problemas no ABS sem Scanner"
date: "2021-03-28"
categories:
  - "honda-cr-v"
  - "freios"
  - "diagnostico"
tags:
  - "abs"
  - "vsa"
  - "sensor-de-velocidade"
  - "diagnostico"
  - "modo-scs"
  - "dtc"
  - "sistema-de-freios"
  - "controle-de-estabilidade"
  - "troca-de-peca"
  - "tutorial"
---

![](https://garagemdomadeira.com/wp-content/uploads/2021/03/header_abs.jpg?w=1024)

Há um tempo eu passei por problemas na minha CR-V (2007-2011) na área de controle de estabilide e/ou ABS., isto aconteceu após eu ter passado por cima de um pedaço de pneu largado na pista e não consegui desviar. Sendo assim, logo fui atrás de fazer uma inspeção nas rodas do carro e veja no que deu.

<!--more-->

Após observar a roda dianteira esquerda (principal roda com a qual passei por cima do objeto na pista), percebi que o cabo do sensor de velocidade estava desencaixado do seu local original, porém seus conectores estavam em perfeitas condições e havia uma pequena marca de desgaste no cabo, algo como se realmente tivesse se chocado com algum objeto estranho. Daí já me veio a cabeça que este sensor seria o causador da desativação do ABS.

## Como funciona o ABS?

O sistema anti bloqueio das rodas tem sua ação realizando o alívio ou aumento da pressão exercida no fluido de freio separadamente em cada uma das rodas.

Para calcular se uma roda travou durante a sua frenagem ele utiliza os sensores de velocidade que ficam instalados em cada uma das rodas, e quando uma das rodas trava ele realiza o alívio da pressão exclusivamente no freio que travou fazendo com que a roda volte a girar. Cerca de 200ms após liberar a roda o circuito torna a aumentar a pressão sobre aquela roda, fazendo com que ela volte a freiar novamente. Caso a roda trave novamente, ele detecta o travamento e torna a aliviar a pressão nos freios e o ciclo se recomeça. Este ciclo pode se repetir dezenas ou centenas de vezes dependendo da necessidade de frenagem do condutor.

O simples fato de travar uma roda dianteira faz com que tudo o que você fizer com o volante deixe de funcionar, pois não haverá direcionamento do carro para nenhum lado, apenas a inércia levando seu carro . Uma roda traseira travar durante uma frenagem bem exigida pode fazer com que o eixo traseiro queira ultrapassar o eixo dianteiro, fazendo o veículo perder o controle e até capotar em casos extremos.

O sistema ABS não é ativado em cada frenagem que você realiza, apenas quando ele achar necessário por conta de uma frenagem muito agressiva.

## O que acontece quando um sensor deixa de funcionar?

Todo carro com ABS possui em cada uma de suas rodas um sensor que é uma espécie de detector magnético, que é induzido magneticamente através de uma roda dentada acoplada nos cubos de roda. Esse conjunto leva informação de velocidade para uma central eletrônica dedicada que analisa essas informações o tempo todo. Por sua vez, essa central eletrônica executa diversas funções para o carro como:

- Atuar sobre cada um dos freios das rodas, de modo a aumentar ou aliviar a pressão sobre cada freio.
- Informar à central eletrônica principal a velocidade de condução do veículo.
- Informa à central ao painel do veículo quando há algum problema de funcionamento.

Quando um desses sensores falha, a central eletrônica desativa imediatamente o funcionamento do ABS levando o carro a ter um sistema de frenagem convencional (daqueles que funcionaram muito bem durante décadas). Portanto ficar sem o sistema ABS ligado no carro não o impede de dirigir, contúdo é necessário manter uma distância maior dos carros que estão na sua frente, não exagerar na velocidade ou coisas parecidas, pois caso você precise de uma frenagem mais exigente certamente poderá perder o controle por alguns milissegundos.

## A dúvida ainda persistia

Embora eu tivesse a impressão de que um dos sensores de roda estivesse com defeito, o fato é que eu não podia afirmar categoricamente que o sensor estava com problemas. Tudo o que eu tinha era um carro com o sistema ABS desativado e um fio um pouco "mastigado".

Foi necessário utilizar um recurso muito útil que os carros da Honda possuem, e o CR-V não poderia ser diferente. Então fui utilizar o **SCS da Honda**.

[Eu conto mais detalhes sobre o **SCS** e **DTC** em um outro post chamado: **Conhecendo o modo SCS nos Honda.**](https://garagemdomadeira.com/2021/03/28/conhecendo-o-modo-scs-nos-honda/)

Utilizando o SCS descobri que o módulo de freios estava com um **DTC** armazenado com **código 13**. Após isso eu procurei pelo código na tabela de DTC's referente aos freios e controles de estabilidade.

[A tabela você confere na íntegra nesse outro post: **Lista de códigos de erro em ABS e VSA para CR-V**](https://garagemdomadeira.com/2021/03/28/lista-de-codigos-de-erro-em-abs-e-vsa-para-cr-v/)

## O Veredito

Segundo a tabela, o sensor da roda dianteira esquerda (Exatamente o qual desconfiava) está com problemas. Fiz a compra da peça (cerca de R$130,00 na época) e realizei a troca.

<figure>

![](https://garagemdomadeira.com/wp-content/uploads/2021/04/sensor_abs.jpg?w=720)

<figcaption>

Sensor ABS da roda dianteira esquerda

</figcaption>

</figure>

Imediatamente após a troca passaram a ficar apagadas as luzes do VSA, ABS e Alerta do sistema de freios, o procedimento de troca foi bem simples e não demorou nem 10 minutos.

* * *

## Temas Relacionados
