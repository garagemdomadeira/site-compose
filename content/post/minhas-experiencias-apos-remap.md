---
title: "Minhas experiências após remap"
date: "2022-01-15"
categories:
  - "honda-cr-v"
  - "performance"
  - "procedimentos"
tags:
  - "remap"
  - "reflash"
  - "k-tunner"
  - "hondata"
  - "injecao-eletronica"
  - "performance"
  - "torque"
  - "revit-up"
  - "experiencia"
  - "dicas"
---

![](media/header_remap-1.jpeg?w=1024)

Assunto polêmico em diversos grupos, o remap é uma estratégia que divide opiniões. De um lado há pessoas que querem extrair o melhor dos seus motores e do outro há pessoas mais ligados à originalidade e durabilidade do produto. Antes que você pense, não! Esse não é um post pago e nem endorsado pela Revit-up, apenas retratando a experiência com a empresa de forma justa e transparente.

<!--more-->

## Entendendo o que é REMAP

Uma das maravilhas que a injeção eletrônica nos trouxe foi a capacidade do motor se autorregular no que diz respeito à injeção de combustível, tempo de ignição e outros parâmetros que eram impossíveis de serem automatizados na época do motor à carburador. Para que tal automatização aconteça, a central de injeção conta com diversas tabelas (como se fosse uma planilha do Excel) onde tempos variáveis de entrada e valores de saída (isso falando de maneira bem simples). À essas tabelas nós damos o nome de mapas de injeção.

A palavra REMAP é a diminuição da palavra remapeamento, que significa refazer essas tabelas que estão gravadas da central de injeção. Dentro da central de injeção eletrônica há uma memória em que podemos apagar/escrever coisas novas (semelhante à um pendrive) chamada memória FLASH. Pelo nome da memória ser Flash, você vai encontrar algumas pessoas utilizando o nome REFLASH (Que seria algo como "Reflashear" ou regravar na memória).

Gravando tabelas novas é possível dizer para a central que os componentes da injeção podem ter comportamentos diferentes em condições diferentes, existem várias leituras que são feitas pela central de injeção, alguns exemplos são:

- Leitura dos gases após a queima do combustível

- Posição do virabrequim

- Posição do comando de válvulas

- Leitura do momento da explosão

- Pressão atmosférica no tubo de ar

- Fluxo de ar no tubo de ar

- Posição do pedal do acelerador

- Pedal do freio acionado ou não

- Inclinação do carro

- Força exigida ao motor

Em cada fração de segundo são colhidas as informações acima que passam pelos cálculos das tabelas e geram resultados, esses resultados podem ser por exemplo:

- Abertura do corpo de borboleta

- Frequência e tempo de abertura dos bicos injetores

- Frequência e tempo de centelhamento das velas

- Abertura da válvula I-VTEC

- Abertura da válvula de purga do cânister

- Abertura da válvula EGR

- Comunicação para troca ou redução de marchas

Eu não lembro ao certo se mencionei todos os parâmetrod de entrada e saída, mas claramente meu intuito é apenas ilustrar que se trata de uma equação não muito simples de resolver, e ela é resolvida dezenas de vezes por seguro através do processador contido dentro da central de injeção.

## Entendendo o mapa de injeção padrão

Antes de entender o motivo de fazer um remap é necessário entender o motivo pelo qual o carro vem de fábrica com um mapa de injeção mais conservador. São necessários diversos testes antes de um carro ser aprovado para a venda aqui no Brasil (e muitos outros antes de ser colocado a venda de forma geral). Testes são feitos a todo momento quando o carro está prestes à "ir para as prateleiras".  
Engenheiros avaliam itens como adaptabilidade do motor ao nosso combustível, qualidade da queima, sensação de conforto ao dirigir, emissão de poluentes, nível de ruído interno e externo entre outras baterias de teste. Há uma série de exigências (da própria Honda ou da legislação do país vigente) para cada item dessa enorme lista.  
Por conta disso, o mapa de injeção da Honda vem com um perfil ajustado para agradar aos seus respectivos proprietários (sim eles realizam testes para saber o perfil do consumidor a ser atingido). Coisas que podem agradar à muitos motoristas (como uma subida de RPM mais acentuada) podem não ser agradáveis para o consumidor alvo em questão.

## O que buscamos com remap?

Uma das coisas que é necessário ter em mente ao fazer um remap é saber o que está buscando com isso. Há pessoas que querem transformar seus carros em pequenos carros de corrida, e para isso apenas o remap pode não ser suficiente, principalmente se estivermos falando do motor R20A que é um motor aspirado com injeção eletrônica convencional.

É consenso geral que o motor das CR-Vs ano 2007 até 2011 possui uma certa "preguiça" de se desenvolver na faixa entra 2000 e 3500 rotações (faixa que é amplamente utilizada para se fazer pequenas ultrapassagens) obrigando o motorista a realizar cerca de 5000 rotações por minuto caso queira realizar alguma ultrapassagem.

De fato o motor R20A é muito bem balanceado e atingir 5mil rotações ou mais não é tão incômodo (a não ser pelo barulho alto que minha esposa sempre reclama), mas de fato a impressão que dá é que o motor precisa sempre ser "acordado" para que tal processo funcione, e há pessoas que conseguem viver muito bem com isso sem problema nenhum.

Antes de decidir em fazer um remap, certifique-se que você realmente se sente incomodado com essa situação de lentidão no conjunto motor/câmbio ou se apenas pisando um pouco mais já faria você poupar uma quantidade razoável de dinheiro (um remap não é coisa mais barata do mundo).

## Softwares para remap

Em um mundo tão vasto e grande é comum termos várias pessoas fazendo engenharia reversa para várias coisas, inclusive para decifrar os códigos de escrita em centrais de injeção. Mas como é um trabalho muito técnico e difícil, o melhor é partirmos para casos comprovados e para experiência de sucesso das pessoas.

Existem dois grandes softwares responsáveis por remap de qualidade em carros da Honda:  
O primeiro chama-se Hondata e permite fazer a reescrita da memória flash com alteração de vários parâmetros da central de injeção.  
O segundo chama-se K-Tunner e basicamente é um concorrente do Hondata com a mesma qualidade de escrita e leitura.

Excluindo que você seja um entusiasta em mecânica automotiva, o recomendado é utilizar esses softwares com uma pessoa que entenda ao invés de fazer ao modo "faça você mesmo" que pode trazer grandes problemas quando estamos falando de algo que pode inutilizar o motor.

<figure>

![](media/remap01.jpeg?w=1024)

<figcaption>

Software K-Tunner mostrando uma das tabelas dinâmicas do mapa de injeção

</figcaption>

</figure>

Aqui no Brasil existe um representante exclusivo da K-Tunner chamado Revit-up que já possuem uma vasta experiência na realização de mapas de injeção customizados e foi um desses que contratei em janeiro de 2021.

## Como é o processo?

Após o pagamento a empresa envia pelos correios um dispositivo semelhante aos scanners OBD2 que a gente vê no mercado, porém esse tem um cabo USB que devemos plugar no computador. É necessário que você tenha um notebook com windows e internet (de preferência móvel) para que o processo possa ser feito de modo conveniente.

Uma das coisas que você vai precisar fazer é instalar um software de acesso remoto no seu notebook com windows, a empresa também envia um link com o instalador e sua instalação é bastante simples. Após instalado o software no computador, basta combinar o dia e horário para que o técnico responsável pelo remap consiga realizar a conexão ao seu computador.

Tente encontrar um espaço bom para arrancadas. Como não há aferição com dinamômetro, os testes são feitos utilizando as pistas. Vai ser necessário que você acelere com o carro de zero até o limite de giro.

O técnico responsável pelo remap irá conectar no seu computador, instalar os drivers necessários para o "leitor OBD2" e também instalar o software K-tunner. Nesse ponto, é necessário informar algumas informações sobre o carro, pois o K-tunner precisa de uma licença única para cada carro onde será feito o remap.

O técnico realiza um back-up das tabelas do seu mapa de injeção para o computador, este processo é chamado de download (por motivos óbvios). Após o download você irá realizar a leitura de parâmetros dinâmicos do motor, isso é feito em todas as faixas de rotação do motor e o processo é semelhante à gravar um áudio (você aperta REC e acelera o carro com o pé no final do acelerador até que ele atinja por volta de 7000 RPM em primeira marcha e depois aperte STOP). O técnico responsável vai lhe aconselhar por telefone durante todo o processo (é bem simples, acredite).

Através desta gravação o técnico elabora uma série de equações para fazer ajustes nas tabelas de cálculo da injeção. O processo gera um novo arquivo que é gravado na central de injeção por um processo chamado de Upload. Após o upload é feito um novo teste de gravação de parâmetros até atingir 7000RPM para verificar se tudo está ok. Caso seja necessário, realizar-se-á um novo upload com tabelas novas.

Após terminado o técnico desinstala todo o software e você deverá devolver o scanner através dos correios.

## Tudo muito bonito, mas e na prática?

Até agora mostrei como funciona todo o processo, mas você deve estar se perguntando ainda se vale a pena ou não, o que é algo muito subjetivo. Na minha opinião o ajuste do remap deixou o carro muito mais prazeiroso de dirigir, mas confesso que o preço é salgado (principalmente pelo custo da licença do K-Tunner ser em dólares).

Existem muitas pessoas que vão dizer que se trata apenas de enganação, que o software apenas adianta a sensibilidade do pedal do acelerador e por isso você sente o carro mais ágil, porém de fato isso não é verdade. [No próprio canal da revit-up](https://www.youtube.com/watch?v=JlU5TKPGI-E&t=1285s) você tem um vídeo onde eles mostram os ganhos do remap através do dinamômetro utilizando um Civic geração 8 (que tem um motor muito semelhante ao da CR-V portanto os ganhos seriam semelhantes).

<figure>

![](media/remap02.jpg?w=1024)

<figcaption>

Leitura do dinamômetro mostrando o ganho de torque em faixas de rotação mais baixas.

</figcaption>

</figure>

A imagem acima reflete bem o que acontece após o novo mapa de injeção, na faixa de rotações mais baixa o torque tem um acrescimo considerável (em potência também mas o torque é mais importante) e isso se dá principalmente pelos ajustes dos tempos de injeção/ignição durante as fases de média e alta carga do motor.

## Vantagens

#### Condução do veículo

Não tem como negar que o veículo fica mais leve de dirigir, convido à quem quer que seja que possa fazer o teste em meu carro. O torque do motor em baixas e médias rotações consegue ser sentido e você deixa muitos carros para trás ao sair de um semáforo.

#### Facilidade

Todo o processo é feito online e não precisei levar o carro em nenhuma oficina, não fiquei sem o carro por nenhum momento.

#### Consumo não alterou

Apesar do motor ter ficado mais esperto, isso não se refletiu em um maior consumo de combustível. Por outro lado também não houve economia (mas isso nem era esperado)

#### Não altera a rotina de manutenção

Com a adoção de um remap, podeos dizer que o carro está com Stage 1, o que não implica em uma mudança na rotina de manutenção, bastando utilizar o mesmo óleo que você já utiliza em suas manutenções rotineiras. Aliás, tenho um [post sobre óleo lubrificante aqui.](https://garagemdomadeira.com/2021/03/14/qual-oleo-utilizar-na-cr-v-2007-2011/)

#### Câmbio mais esperto

Por incrível que pareça, o câmbio acabou ficando mais esperto e realizando reduções de marcha de forma melhor do que quando anteriormente. É comum ver o relato de pessoas sem remap reclamando que o câmbio se nega a reduzir para a quarta marcha e, do nada, ele joga uma terceira marcha fazendo a rotação do motor disparar.

#### Não estraga o motor nem o câmbio

Um grande boato quando se fala de remap é achar que o motor vai estragar em pouco tempo ou que o câmbio não vai aguentar ter um motor mais forte. De fato não passam de boatos, fiz meu remap em janeiro de 2021 e até o momento não tenho nada de anormal acontecendo no motor nem no câmbio, além disso há dezenas de pessoas que realizaram o mesmo procedimento há muito mais tempo que eu e estão na mesma situação, portanto esse é um ponto que nem precisa ser discutido.

## Desvantagens

#### Custo elevado

O custo para o remap pode chegar a 4% do valor do carro (dependendo do ano) portanto é algo a se considerar, pricipalmente se você pretende ficar pouco tempo com o carro.

#### Potência final sem diferença significativa

Se você já é acostumado a utilizar o motor nas faixas de rotação acima de 5000 RPM então o remap terá pouco efeito prático para você, dado que quanto mais rotação menor a diferença que o novo mapa de injeção terá no resultado final.

#### Não há portabilidade

Cada remap funciona exatamente para um veículo, não há como transferir um remap para outro, pois se trata de um software que foi gravado especificamente para aquele veículo. Portanto é algo a se pensar caso pense em vender o veículo futuramente.

#### Encarar como acessório

Por se tratar de algo acessório ao carro, todo valor investido não será recebido de volta em caso de perda total do carro através do seguro por exemplo.

## Benefícios adicionais

Uma coisa bem comum para muitos donos de CR-V é queixar-se de vibrações causadas por marcha lenta excessivamente lenta do motor, durante o processo de remap o técnico acaba ajustando esse parâmetro também, deixando o motor um pouco mais acelerado na lenta (isso é opcional e você pode informar que não quer).

## Ainda em dúvida?

Se você ainda é muito cético com respeito ao remap, eu convido à assistir um teste que fiz antes e depois do remap em minha CR-V. O teste foi feito com piloto automático, então já pode descartar o efeito de sensibilidade do pedal do acelerador, pois eu nem estava utilizando ele.  
No vídeo é possível ver claramente que há uma pequena diferença de comportamento do motor durante uma subida e esta é apenas uma entre muitas características benéficas do remap.

https://youtu.be/5Re8z6K2v6s

* * *
