const mountMaintenancePlan = () => {

  const itemsForChange = [
    {
      name: 'Óleo lubrificante do motor',
      description: '4 litros para troca',
      period: 10000,
      purchaseLink: 'https://mercadolivre.com/sec/1DhNavX',
    },
    {
      name: 'Filtro de ar e óleo',
      description: '1 filtro de ar e óleo para troca',
      period: 10000,
      purchaseLink: 'https://mercadolivre.com/sec/1Z5dEnS',
    },
    {
      name: 'Filtro de combustível',
      description: '1 filtro interno para troca',
      period: 80000,
      purchaseLink: 'https://mercadolivre.com/sec/2eFy12D',
    },
    {
      name: 'Fluido de freio',
      description: 'Requer 1 frasco de 500ml',
      period: 40000,
      purchaseLink: 'https://mercadolivre.com/sec/2e2VXh5',
    },
    {
      name: 'Fluido de arrefecimento',
      description: '6 litros para troca com enxague',
      period: 40000,
      purchaseLink: 'https://mercadolivre.com/sec/2o6THsJ',
    },
    {
      name: 'Velas de ignição 1.4 8v',
      description: 'kit de 8 velas para troca',
      period: 40000,
      purchaseLink: 'https://mercadolivre.com/sec/1dT6JKh',
    },
    {
      name: 'Velas de ignição 1.5 16v',
      description: 'kit de 4 velas para troca',
      period: 40000,
      purchaseLink: 'https://mercadolivre.com/sec/2xFF7BB',
    },
    {
      name: 'Fluido de transmissão automática',
      description: 'Troca parcial por volta de 4 litros, utilizo o Gulf CVT no meu carro',
      period: 60000,
      purchaseLink: 'https://mercadolivre.com/sec/2w5zuLf',
    },
    {
      name: 'Correia do alternador',
      description: '1 correia para troca',
      period: 80000,
      purchaseLink: 'https://mercadolivre.com/sec/1KEhr87',
    },
    {
      name: 'Lubrificação canaletas dos vidros',
      description: '1 spray dá conta que sobra',
      pariod: 20000,
      purchaseLink: 'https://mercadolivre.com/sec/1LvLH7a',
    },
    {
      name: 'Lubrificação dobradiças',
      description: '1 spray dá conta que sobra',
      period: 20000,
      purchaseLink: 'https://mercadolivre.com/sec/2Uwmap5',
    },
    {
      name: 'Limpeza e hidratação do couro dos bancos',
      description: '1 kit para limpeza e hidratação',
      period: 10000,
      purchaseLink: 'https://mercadolivre.com/sec/1Jm6n7u',
    }
  ]

  const itemsForCheck = [
    { 
      name: 'Alinhamento e balanceamento de rodas', 
      description: 'Alinhamento simples, não há ajuste de cambagem',
      period: 20000, 
      purchaseLink: ''
    },
    { 
      name: 'Aferir pastilhas de freio', 
      description: 'Para garantir que elas estão com espessura suficiente',
      period: 10000, 
      purchaseLink: 'https://mercadolivre.com/sec/15Ggu8k'
    },
    { 
      name: 'Limpar Corpo de borboleta', 
      period: 10000, 
      description: 'Uso o produto indicado para limpar o corpo de borboleta',
      purchaseLink: 'https://mercadolivre.com/sec/2jQgzST'
    },
    { 
      name: 'Inspecionar bicos injetores', 
      description: 'Limpar os bicos caso haja falha na marcha lenta do carro',
      period: 20000, 
      purchaseLink: ''
    },
    { 
      name: 'Carga da Bateria',
      description: 'Para garantir que a bateria está com carga suficiente',
      period: 20000, 
      purchaseLink: ''
    },
    { 
      name: 'Estado das Mangueiras', 
      description: 'Verificar rachaduras e desgastes',
      period: 10000, 
      purchaseLink: ''
    },
    { 
      name: 'Estado dos componentes de suspensão', 
      period: 20000, 
      description: 'O link vai para o catálogo de peças da suspensão',
      purchaseLink: 'https://garagemdomadeira.com/2024/06/suspensao-honda-fit/'
    },
    { 
      name: 'Terminais de direção', 
      description: 'Verificar folgas e barulhos',
      period: 20000, 
      purchaseLink: 'https://mercadolivre.com/sec/2dzmkca'
    },
    { 
      name: 'Ajuste do freio de estacionamento', 
      description: 'Ajustar o para permitir fixação correta do carro',
      period: 20000, 
      purchaseLink: ''
    },
    { 
      name: 'Rodízio de pneus', 
      description: 'Há quem não faça, mas eu indico que faça',
      period: 10000, 
      purchaseLink: ''
    },
    { 
      name: 'Aferição do torque de parafusos das rodas', 
      description: 'Reapertar os parafusos usando 10kg de torque',
      period: 10000, 
      purchaseLink: ''
    },
  ]

  const maintenancePlanDiv = document.getElementById('honda-fit-maintenance-plan');
  if (maintenancePlanDiv) {
    maintenancePlanDiv.innerHTML = ODOMETER_INPUT_TEMPLATE;

    const odometerForm = document.getElementById('odometerForm');
    const odometerInput = document.getElementById('odometerInput');
    const maintenanceResultsDiv = document.createElement('div');
    maintenanceResultsDiv.id = 'maintenance-results';
    maintenancePlanDiv.appendChild(maintenanceResultsDiv);

    odometerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const currentOdometer = parseInt(odometerInput.value);
      
      if (isNaN(currentOdometer) || currentOdometer < 0) {
        alert('Por favor, digite um odômetro válido.');
        return;
      }
      let nextMaintenanceOdometer;
      if (currentOdometer <= 0) {
        nextMaintenanceOdometer = 10000;
      } else if (currentOdometer % 10000 === 0) {
        nextMaintenanceOdometer = currentOdometer;
      } else {
        nextMaintenanceOdometer = (Math.floor(currentOdometer / 10000) + 1) * 10000;
      }
      
      const requiredMaintenanceItems = itemsForChange.filter(item => {
        return nextMaintenanceOdometer % item.period === 0;
      });

      maintenanceResultsDiv.innerHTML = HEADER_TEMPLATE(`Revisão de ${nextMaintenanceOdometer} km`); // Limpa resultados anteriores

      if (requiredMaintenanceItems.length > 0) {
        const resultList = document.createElement('div');
        resultList.classList.add('list-group', 'mt-3');
        requiredMaintenanceItems.forEach(item => {
          resultList.innerHTML += PRODUCT_ITEM_TEMPLATE(item.name, item.purchaseLink, item.description)
        });
        maintenanceResultsDiv.appendChild(resultList);
        const itemsForCheckDiv = document.createElement('div');
        itemsForCheckDiv.innerHTML = HEADER_TEMPLATE('Items para verificar');
        maintenanceResultsDiv.appendChild(itemsForCheckDiv);

        const checkList = document.createElement('div');
        checkList.classList.add('list-group', 'mt-3');

        const requiredCheckItems = itemsForCheck.filter(item => {
          return nextMaintenanceOdometer % item.period === 0;
        });
        
        requiredCheckItems.forEach(item => {
          checkList.innerHTML += PRODUCT_ITEM_TEMPLATE(item.name, item.purchaseLink, item.description);
        });
        maintenanceResultsDiv.appendChild(checkList);
      } else {
        maintenanceResultsDiv.innerHTML = '<p class="mt-3">Nenhum item de manutenção necessário para o próximo período.</p>';
      }
      odometerForm.reset();
    });
  }
};

const HEADER_TEMPLATE = (title) => `
  <h2 class="mb-3">${title}</h2>
`;

const ODOMETER_INPUT_TEMPLATE = `
  <form class="input-group mb-3" id="odometerForm">
    <input type="number" keyboard="numeric" class="form-control" id="odometerInput" placeholder="Digite o odômetro atual" min="0">
    <button type="submit" class="btn btn-primary">Calcular</button>
  </form>
`;

const PRODUCT_ITEM_TEMPLATE = (itemName, purchaseLink, description) => `
  <div class="list-group-item d-flex justify-content-between align-items-center">
    <div class="d-flex flex-column justify-content-center">
      <p class="product-name">${itemName}</p>
      ${description ? `<p class="product-description">${description}</p>` : ''}
    </div>
    ${purchaseLink ? `<a href="${purchaseLink}" target="_blank" class="btn btn-sm">Link</a>` : ''}
  </div>
`;


document.addEventListener('DOMContentLoaded', () => {
  mountMaintenancePlan();
});


