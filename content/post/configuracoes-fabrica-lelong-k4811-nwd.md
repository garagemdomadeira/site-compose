---
title: "K4811 NWD - Configurações de Fábrica"
date: "2025-10-27"
categories:
    - "multimidia"
tags:
    - "lelong"
    - "multimídia"
    - "documentação"
    - "k4811"
    - "LE-6321"
    - "LE-6320"
    - "LE-6334"
---

Este documento detalha as 18 seções principais da barra lateral do dispositivo multimídia Lelong K4811 NWD, agrupadas por função, com uma breve explicação do que cada seção controla e todas as suas sub-opções.

> **⚠️ Aviso**: As informações contidas neste documento podem ser alteradas a qualquer momento. Conforme vou descobrindo mais detalhes sobre as configurações e suas funcionalidades, este post será atualizado para refletir as informações mais precisas e completas.

## ⚙️ Menus Principais da Barra Lateral

- **Feature Setting** - *Ativação/desativação de módulos de hardware e entradas multimídia.*
    - DVD - *Ative caso a multimídia tenha entrada para DVD*
    - IPOD - *Ative caso a multimídia tenha entrada para ipod*
    - AUX - *Ative caso a multimídia tenha entrada auxiliar*
    - AUX2 - *Ative caso a multimídia tenha uma segunda entrada auxiliar*
    - TV - *Ative caso a multimídia tenha chip de TV Digital integrado*
    - USB-DVR-NL - *Ative gravador USB sem loop de gravação (Caso esteja instalado)*
    - CVBS-DVR - *Ative gravador de câmeras externo caso esteja instalado*
    - USB-DVR-WL - *Ative gravador USB com loop de gravação (Caso esteja instalado)*
    - 360 - *Ative a câmera 360 caso a multimídia tenha suporte*
    - TPMS - *Ative sensor de pressão dos pneus caso esteja instalado*
    - TV2 - *Ativar entrada de TV caso a multimídia possua*
    - ADAS - *Ativa controle ADAS caso esteja instalado*
    - Front View - *Ativa câmera frontal*
    - Double recording - *Ativa o modo gravação de câmera frontal e traseira (apenas modo HD)*
    - BT - *Ativa Bluetooth*
    - Fan - *Ativa controle de ventilador*
- **Display setup**
    - Display setup - *Acesso rápido às configurações de Tela*
- **Touch Study** - *Recalibração e atualização do painel de toque.*
    - Touch Study - *Inicia o estudo/calibração do toque.*
    - Touch Update - *Atualiza a funcionalidade do toque.*
- **Panel Button Setting** - *Configuração dos botões físicos do painel (caso existam)*
    - Panel Button Setting - *Inicia o aprendizado dos botões*
    - Around the turbine swipe switch -  *Possui botão de girar*
    - Turbine is reverse switch - *Inverte o giro do botão de girar*
    - Multi functional knob - *Possui botão multifuncional.*
    - Learning physics panel - *Aprendizado dos botões.*
- **LOGO Setting** - *Configurações do logotipo de inicialização.*
    - Boot Logo - *Define o logotipo que será exibido ao iniciar o dispositivo.*
- **Dynamic LOGO Setting** - *Configurações do logotipo dinâmico.*
    - Dynamic LOGO Setting - *Configurações do logotipo dinâmico*
- **Reset Factory** - *Opções para restaurar as configurações de fábrica.*
    - Reset Factory - *Inicia a restauração total do dispositivo, não recomendado*
- **Backcar Setting** - *Configurações relacionadas à câmera de ré e assistência de estacionamento.*
    - HD reversing system - *Alterna entre sistemas de vídeo de alta definição para câmera de ré comum*
    - Backcar track - *Ativa/desativa as linhas de guia.*
    - Backcar assist line - *Ativa/desativa as linhas de assistência caso haja comunicação CAN e o carro forneça isso.*
    - Reversing assist line adjust - *Ativa o ajuste de posição e ângulo das linhas de assistência.*
    - Reversing block background time(ms) - *Tempo que a tela de ré permanece ativa após desengatar a marcha, em milissegundos.*
- **Radio Setting** - *Configurações específicas para a função de rádio (FM/AM).*
    - Rds switch - *Ativa/desativa o Radio Data System (RDS).*
    - Radio type - *Modelo do chip de rádio utilizado.*
    - FM Sensitivity - *Sensibilidade do rádio FM.*
    - AM Sensitivity - *Sensibilidade do rádio AM.*
    - Light On Sensitivity - *Sensibilidade para acendimento da luz do rádio (caso exista)*
    - Default Radio Area - *Define a região para as frequências e padrões de rádio.*
- **Steerwheel Setting** - *Configurações de controle e tolerância do volante.*
    - Steerwheel type - *Tipo de interface do volante.*
    - Steerwheel voltage tolerance value(mv) - *Tolerância de variação de tensão para os comandos do volante, em milivolts.*
- **Style Setting** - *Opções de aparência e temas da interface do usuário (UI).*
- **Other module Setting** - *Configurações de módulos adicionais (TV, Bluetooth, NFC).*
    - TV - *Configuração da marca do módulo de TV (caso exista integrada)*
    - NFC - *Ativa/desativa NFC (caso hardware suporte)*
    - Bluetooth transmission - *Ativa/desativa a transmissão de dados via Bluetooth (caso hardware suporte)*
- **Customized Setting** - *Configurações avançadas e específicas do hardware/software.*
    - Voice analyze - *Configurações de análise de voz (caso hardware suporte)*
    - Three lamp setting - *Configuração das cores dos botões na tela (Lelong não tem suporte)*
    - DSP(I2S) - *Configuração do Digital Signal Processor (DSP) via protocolo I2S.*
    - Udisk (USB 2.0), Udiskh (USB 2.0), UdiskS (USB 2.0) - *Configurações de diferentes portas ou protocolos USB.*
    - Minimum backlight (80) - *Brilho mínimo da tela.*
    - Maximum backlight (255) - *Brilho máximo da tela.*
    - Original car audio channels - *Definição dos canais de áudio originais do carro*
    - car video channels- *Seleção do canal de vídeo do carro.*
    - uart fun mode - *Configuração do modo de função UART*
    - mic gain (4) - *Ganho do microfone (nível de amplificação).*
    - tp esd - *Configuração de proteção ESD (descarga eletrostática) da tela de toque.*
    - Application installation restrictions - *Restrições para instalação de aplicativos.*
    - Radio antenna powered - *Ativa/desativa a alimentação da antena do rádio.*
    - Vertical screen rotation 180 - *Rotaciona a tela em 180 graus.*
    - The color depth of the screen - *Profundidade de cor da tela (tem a ver com hardware).*
    - Car ASS - *Ativa/desativa o sistema de comando de voz*
    - Video output switch - *Habilita o chaveamento da saída de vídeo.*
    - Video output format - *Padrão de formato da saída de vídeo.*
    - Boot Menu Settings (Boot Logo) - *Configurações do menu de inicialização.*
    - Low pressure filtration(ms) - *Acredito que tenha a ver com sensor de pressão dos pneus.*
    - Phase exchange - *Troca de fase (acho que é áudio).*
    - Ips screen wake-up delay(ms) - *Atraso de inicialização da tela IPS.*
    - Wake-up delay initialization LCD duration(ms)- *Duração do atraso de inicialização do LCD.*
    - TV audio channel - *Canal de áudio da TV (para receptor externo)*
    - TV video channel - *Canal de vídeo da TV (para receptor externo)*
    - Background wake-up protection voltage- *Tensão mínima para proteção de inicialização em segundo plano.*
    - Title block mirror - *Acredito ser uma mensagem durante a câmera de ré*
    - SPDIF - *Ativa/desativa a saída de áudio digital SPDIF.*
    - Disable google update - *Bloqueia as atualizações automáticas do Google.*
    - External Mic - *Ativa/desativa o microfone externo.*
- **CAN Type Set** - *Configuração do protocolo de comunicação CAN Bus do veículo.*
    - CAN Type Set - *Seleção do tipo de CAN Bus.*
    - OTA - *Atualização de software canbus remota.*
- **Gain Setting** - *Configurações de ganho de áudio para diferentes fontes de entrada.*
    - Music Gain (10), Android Gain (10), Radio Gain (10), Aux Gain (10), Aux2 Gain (10), TV Gain (10), Can usb Gain (10), DVD Gain (10), iPod Gain (10) - *Nível de ganho para cada fonte.*
- **Remote control Setting** - *Configuração do controle remoto (caso exista)*
- **Language Setting** - *Configuração de idioma do sistema.*
- **Other app tools** - *Outras ferramentas e recursos de aplicativos.*
    - IMEI Setting - *Provavelmente para mudar o IMEI do aparelho quando houver bloqueio da operadora*
    - Customized Setting - *Configurações personalizadas para o modelo de multimídia*
    - TV OUT - *Exibe uma tela de teste para monitor externo*
    - update.script - *Execução de script de atualização (caso exista)*
    - ID mode setting - *Configuração do modo de identificação*

## ⚠️ Avisos Importantes

- **Cuidado com Reset Factory**: A opção "Reset Factory" restaura todas as configurações para os padrões de fábrica. Use apenas se necessário e tenha certeza do que está fazendo.
- **Backup das Configurações**: Antes de fazer alterações significativas, anote as configurações atuais para poder restaurá-las se necessário.
- **Configurações de Áudio**: As configurações de ganho (Gain Setting) afetam diretamente a qualidade do som. Ajuste com cuidado para evitar distorção.
- **Configurações de Tela**: As configurações de brilho e rotação da tela podem afetar a usabilidade do dispositivo.

## 📝 Notas Técnicas

Este documento foi criado com base na análise das configurações disponíveis no menu de fábrica do dispositivo Lelong K4811 NWD. Algumas opções podem variar dependendo da versão do firmware instalada.
