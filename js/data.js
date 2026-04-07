// База данных товаров
const products = [
    // Ковен Калленов (coven)
    {
        id: 1,
        name: 'Худи "Лев и ягнёнок"',
        description: 'Тёплое худи с вышивкой. Эдвард одобряет.',
        fullDescription: 'Мягкое худи из премиального хлопка с вышивкой знаменитой фразы. Идеально подходит для прогулок по дождливому Форксу. Размеры: XS-XXL.',
        price: 3490,
        category: 'coven',
        categoryName: 'Команда Эдварда',
        image: '🧛',
        imageUrl: 'img/levyagnenok.jpg',
        badge: 'Хит',
        team: 'cullen'
    },
    {
        id: 2,
        name: 'Браслет с кристаллом',
        description: 'Блестит как кожа вампира на солнце',
        fullDescription: 'Серебряный браслет с кристаллом Swarovski. При дневном свете переливается всеми цветами радуги, напоминая о том, как выглядят вампиры на солнце.',
        price: 1290,
        category: 'coven',
        categoryName: 'Команда Эдварда',
        image: '💎',
        imageUrl: 'img/braslet.jpg',
        team: 'cullen'
    },
    {
        id: 3,
        name: 'Бейсболка "Twilight"',
        description: 'Как у Эдварда в первой части',
        fullDescription: 'Классическая бейсболка с логотипом саги. 100% хлопок, регулируемый размер.',
        price: 1890,
        category: 'coven',
        categoryName: 'Команда Эдварда',
        image: '🧢',
        imageUrl: 'img/kepka.jpg',
        team: 'cullen'
    },
    {
        id: 4,
        name: 'Футболка "Мечта Беллы"',
        description: 'Та самая футболка',
        fullDescription: 'Футболка для самых фанатов саги и Эдварда. Состав: 70% хлопок, 30% акрил. Украсит даже  в самый хмурый день в Форксе.',
        price: 2990,
        category: 'coven',
        categoryName: 'Команда Эдварда',
        image: '👕',
        imageUrl: 'img/фtshirt.jpeg',
        badge: 'Новинка',
        team: 'cullen'
    },

    // Стая Квилетов (pack)
    {
        id: 5,
        name: 'Футболка "Волчий патруль"',
        description: 'Официальный мерч стаи',
        fullDescription: 'Футболка с принтом волчьего патруля. Покажи, на чьей ты стороне! Качественный хлопок, принт не выцветает. Размеры: XS-XXL.',
        price: 1990,
        category: 'pack',
        categoryName: 'Команда Джейкоба',
        image: '🐺',
        imageUrl: 'img/футболка.jpg',
        badge: 'Хит',
        team: 'wolf'
    },
    {
        id: 6,
        name: 'Джинсовка "Ла-Пуш"',
        description: 'Тёплая и стильная, как Джейкоб',
        fullDescription: 'Джинсовая куртка с меховой подкладкой. Такая же тёплая, как объятия Джейкоба. Идеально для прохладных вечеров на пляже Ла-Пуш.',
        price: 4490,
        category: 'pack',
        categoryName: 'Команда Джейкоба',
        image: '🧥',
        imageUrl: 'img/jinsovka.jpg',
        team: 'wolf'
    },
    {
        id: 7,
        name: 'Шорты для бега',
        description: 'Для тех, кому всегда жарко',
        fullDescription: 'Лёгкие спортивные шорты. Идеальны для бега по лесу с оборотнями. Быстросохнущая ткань, удобный крой.',
        price: 1490,
        category: 'pack',
        categoryName: 'Команда Джейкоба',
        image: '🩳',
        imageUrl: 'img/shorty.jpeg',
        team: 'wolf'
    },
    {
        id: 8,
        name: 'Кружка "Отпечаток лапы"',
        description: 'Горячий шоколад вкуснее из неё',
        fullDescription: 'Керамическая кружка с отпечатком волчьей лапы. Объём 350 мл. Можно мыть в посудомоечной машине. Идеальна для горячего шоколада, как у Беллы.',
        price: 890,
        category: 'pack',
        categoryName: 'Команда Джейкоба',
        image: '☕',
        imageUrl: 'img/krusgka.jpg',
        team: 'wolf'
    },

    // Отцы Форкса (fathers)
    {
        id: 9,
        name: 'Кружка "World\'s Best Sheriff"',
        description: 'Для Чарли Свона в каждом из нас',
        fullDescription: 'Кружка с надписью "Лучший шериф мира". Идеальный подарок для всех, кто ценит спокойствие и порядок в Форксе. Объём 400 мл.',
        price: 990,
        category: 'fathers',
        categoryName: 'Нестареющая классика',
        image: '👮',
        imageUrl: 'img/charly.jpg',
        team: 'fathers'
    },
    {
        id: 10,
        name: 'Плащ "Доктор Каллен"',
        description: 'Элегантный плащ как у Карлайла',
        fullDescription: 'Стильный плащ из высококачественной шерсти. Такой же элегантный, как сам Карлайл Каллен. Подкладка из вискозы. Доступен в тёмно-синем и сером цветах.',
        price: 7990,
        category: 'fathers',
        categoryName: 'Нестареющая классика',
        image: '🧥',
        imageUrl: '',
        badge: 'Премиум',
        team: 'fathers'
    },
    {
        id: 11,
        name: 'Значок полиции Форкса',
        description: 'Коллекционный значок',
        fullDescription: 'Точная копия значка полиции Форкса. Металл, эмаль. Отличный аксессуар для фанатов и косплея.',
        price: 490,
        category: 'fathers',
        categoryName: 'Нестареющая классика',
        image: '🛡️',
        imageUrl: '',
        team: 'fathers'
    },
    {
        id: 12,
        name: 'Рубашка "Доктор"',
        description: 'Белая рубашка как у Карлайла',
        fullDescription: 'Классическая белая рубашка из египетского хлопка. Идеально сидит и выглядит безупречно. Как доктор Каллен на работе.',
        price: 3490,
        category: 'fathers',
        categoryName: 'Нестареющая классика',
        image: '👔',
        imageUrl: '',
        team: 'fathers'
    },

    // Остальные (others)
    {
        id: 13,
        name: 'Розовая кофта Элис',
        description: 'Предвидит, что ты её купишь',
        fullDescription: 'Уютная кофта нежно-розового цвета. Элис уже видела, как ты в ней выглядишь, и ей нравится! Мягкий трикотаж, свободный крой.',
        price: 2790,
        category: 'others',
        categoryName: 'Остальные',
        image: '🌸',
        imageUrl: '',
        team: 'others'
    },
    {
        id: 14,
        name: 'Плакат с Джаспером',
        description: 'Размер A2, глянцевая бумага',
        fullDescription: 'Постер с изображением Джаспера Хейла. Размер A2 (42×59 см). Глянцевая бумага высокого качества. Отличное украшение для комнаты.',
        price: 890,
        category: 'others',
        categoryName: 'Остальные',
        image: '🖼️',
        imageUrl: 'img/plakat.jpg',
        badge: 'Хит',
        team: 'others'
    },
    {
        id: 15,
        name: 'Набор выживания Беллы',
        description: 'Компас + книга + фонарик',
        fullDescription: 'В набор входит: компас, мини-книга "Как выжить в Форксе" и налобный фонарик. Всё, что нужно для приключений в лесу!',
        price: 1990,
        category: 'others',
        categoryName: 'Остальные',
        image: '🎒',
        imageUrl: '',
        team: 'others'
    },
    {
        id: 16,
        name: 'Футболка Розали "I don\'t do dishes"',
        description: 'Стильная и дерзкая',
        fullDescription: 'Футболка с культовой фразой Розали. Мягкий хлопок, прямой крой. Покажи всем, что ты не для того создана, чтобы мыть посуду!',
        price: 1890,
        category: 'others',
        categoryName: 'Остальные',
        image: '👚',
        imageUrl: '',
        team: 'others'
    }
];

// Категории для отображения
const categories = [
    { id: 'all', name: 'Все товары', icon: '🛍️' },
    { id: 'coven', name: 'Команда Эдварда', icon: '🧛' },
    { id: 'pack', name: 'Команда Джейкоба', icon: '🐺' },
    { id: 'fathers', name: 'Нестареющая классика', icon: '👔' },
    { id: 'others', name: 'Остальные', icon: '🍎' }
];