export default {
  state: {
    items: [{
      id: '1',
      title: 'Клубника Кружево Вкуса быстрозамороженная 300г',
      description: '',
      imageSrc: 'https://www.perekrestok.ru/src/product.file/list/image/53/83/48353.jpeg',
      images: ['https://www.perekrestok.ru//src/product.file/full/image/53/83/48353.jpeg',
        'https://www.perekrestok.ru//src/product.file/full/image/52/83/48352.jpeg'],
      price: '125.55',
      discount: '20',
      partnumber: '309478',
      weight: '0.3',
      mesure: 'шт'

    },
    {
      id: '2',
      title: 'Черника Кружево вкуса быстрозамороженная 300г',
      description: '',
      imageSrc: 'https://www.perekrestok.ru/src/product.file/list/image/52/89/38952.jpeg',
      images: ['https://www.perekrestok.ru/src/product.file/full/image/52/89/38952.jpeg',
        'https://www.perekrestok.ru/src/product.file/full/image/51/89/38951.jpeg'],
      price: '176.90',
      discount: '',
      partnumber: '450473',
      weight: '0.4',
      mesure: 'кг'

    },
    {
      id: '3',
      title: 'Слива Маркет  без косточки резаная быстрозамороженная 400г',
      description: 'Слива Маркет Перекресток без косточки резаная быстрозамороженная 400г - это отборные ягоды, ' +
        'собранные на пике спелости и обработанные в кратчайшие сроки. Ягоды моют, вынимают косточку и тут же ' +
        'отправляют в камеры шоковой заморозки, чтобы сохранить их форму, цвет, вкус и полезные свойства. ' +
        'Из замороженной сливы можно приготовить компот, варенье и повидло, начинки для пирогов и соусы, пряные ' +
        'наливки и ароматные настойки. Если вы планируете сделать сливовую начинку, обязательно сначала разморозьте ' +
        'ягоды, слейте лишнюю жидкость и перед приготовлением присыпьте кукурузным крахмалом (он свяжет начинку и не ' +
        'позволит ей вытечь).',
      imageSrc: 'https://www.perekrestok.ru/src/product.file/list/image/90/83/58390.jpeg',
      images: ['https://www.perekrestok.ru/src/product.file/full/image/90/83/58390.jpeg',
        'https://www.perekrestok.ru/src/product.file/full/image/89/83/58389.jpeg'],
      price: '560.00',
      discount: '10',
      partnumber: '215438',
      weight: '0.4',
      mesure: 'кг'
    },
    {
      id: '4',
      title: 'Вишня Маркет Перекресток без косточки быстрозамороженная 400г',
      description: '',
      imageSrc: 'https://www.perekrestok.ru/src/product.file/list/image/88/27/62788.jpeg',
      images: ['https://www.perekrestok.ru/src/product.file/full/image/67/83/58367.jpeg',
        'https://www.perekrestok.ru/src/product.file/full/image/66/83/58366.jpeg'],
      price: '',
      discount: '',
      partnumber: '309558',
      weight: '',
      mesure: 'шт'
    },
    {
      id: '5',
      title: '',
      description: '',
      imageSrc: '',
      price: '300',
      discount: '',
      partnumber: '119223',
      weight: '0.3',
      mesure: 'шт'
    },
    {
      id: '6',
      title: 'Масло сладко-сливочное Экомилк Крестьянское 72.5% 180г',
      description: 'Масло сладко-сливочное Экомилк Крестьянское 72.5% 180г приготовлено из высокожирных пастеризованных' +
        'сливок без использования растительных жиров, искусственных добавок и красителей. Экологически чистое сырье, ' +
        'проверенная временем рецептура и строгий контроль качества на каждом этапе производства позволяют создавать ' +
        'высококачественный продукт пониженной жирности с приятным сливочным вкусом и нежным ароматом. ' +
        'Такое масло можно использовать для приготовления бутербродов, добавлять в каши и гарниры, однако для выпечки, ' +
        'соусов и крема лучше выбирать более жирный продукт.',
      imageSrc: 'https://www.perekrestok.ru/src/product.file/list/image/06/94/39406.jpeg',
      images: ['https://www.perekrestok.ru/src/product.file/full/image/06/94/39406.jpeg',
        'https://www.perekrestok.ru/src/product.file/full/image/05/94/39405.jpeg',
        'https://www.perekrestok.ru/src/product.file/full/image/04/94/39404.jpeg'],
      price: '135',
      partnumber: '306832',
      weight: '1.2',
      mesure: 'шт'
    },
    {
      id: '7',
      title: '',
      description: '',
      imageSrc: '',
      price: '100',
      partnumber: '309478',
      weight: '0.5',
      mesure: 'шт'
    }]
  },
  mutations: {
    setItems (state, payload) {
      state.items = payload
    },
    setItem (state, payload) {
      state.items.push(payload)
    }
  },
  actions: {},
  getters: {
    getItemById (state) {
      return id => {
        return state.items.find(item => item.id === id)
      }
    },
    getItems (state) {
      return state.items
    }
  }
}
