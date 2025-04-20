// Инициализация карты
function initMap() {
    if (!document.getElementById('chartdiv')) return;

    am5.ready(function() {
        // Создаем root элемент
        var root = am5.Root.new("chartdiv");
        
        // Устанавливаем темную тему
        root.setThemes([am5themes_Dark.new(root)]);
        
        // Создаем карту
        var chart = root.container.children.push(
            am5map.MapChart.new(root, {
                panX: "none",
                panY: "none",
                wheelX: "none",
                wheelY: "none",
                projection: am5map.geoMercator(),
                maxZoomLevel: 1,
                minZoomLevel: 1,
                homeZoomLevel: 2.5,
                homeGeoPoint: { latitude: 55, longitude: 25 },
                maxPanOut: 0
            })
        );
        
        // Создаем полигоны стран
        var polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_worldLow,
                exclude: ["AQ"],
                fill: am5.color(0x000000),
                fillOpacity: 0.15,
                stroke: am5.color(0x666666),
                strokeWidth: 0.5,
                strokeOpacity: 0.3
            })
        );

        // Создаем серию точек
        var pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {})
        );

        // Создаем шаблон для точек
        var circleTemplate = am5.Template.new({});

        // Функция для получения текущего языка
        function getCurrentLang() {
            return localStorage.getItem('lang') || 'ru';
        }

        // Функция для форматирования текста тултипа в зависимости от языка
        function getTooltipText(dataItem) {
            const lang = getCurrentLang();
            const title = dataItem.dataContext[`title_${lang}`] || dataItem.dataContext.title;
            const value = dataItem.dataContext.value;
            
            const translations = {
                ru: `${title}\nКонверсия: ${value}%`,
                en: `${title}\nConversion: ${value}%`,
                es: `${title}\nConversión: ${value}%`,
                pt: `${title}\nConversão: ${value}%`
            };
            
            return `[bold]${translations[lang] || translations.en}[/]`;
        }

        // Настраиваем внешний вид точек
        pointSeries.bullets.push(function() {
            var circle = am5.Circle.new(root, {
                radius: 9,
                fill: am5.color(0xFFD700),
                fillOpacity: 1,
                stroke: am5.color(0x121212),
                strokeWidth: 2,
                strokeOpacity: 1,
                tooltipY: 0
            }, circleTemplate);

            // Создаем пульсирующую анимацию
            var pulseAnimation = circle.animate({
                key: "scale",
                from: 1,
                to: 1.08392,
                duration: 2000,
                loops: Infinity,
                easing: am5.ease.inOut(am5.ease.cubic)
            });

            // Анимация тени
            circle.animate({
                key: "shadowBlur",
                from: 0,
                to: 8.3916,
                duration: 2000,
                loops: Infinity,
                easing: am5.ease.inOut(am5.ease.cubic)
            });

            // Анимация прозрачности тени
            circle.animate({
                key: "shadowOpacity",
                from: 0.7,
                to: 0,
                duration: 2000,
                loops: Infinity,
                easing: am5.ease.inOut(am5.ease.cubic)
            });

            // Добавляем состояния для интерактивности
            circle.states.create("hover", {
                scale: 1.2,
                fillOpacity: 1,
                stroke: am5.color(0xFFD700),
                strokeWidth: 2,
                strokeOpacity: 1,
                dx: 0,
                dy: -3
            });

            // Настраиваем тултип
            circle.set("tooltipText", "{tooltipContent}");
            circle.setAll({
                tooltip: am5.Tooltip.new(root, {
                    getFillFromSprite: false,
                    autoTextColor: false,
                    fill: am5.color(0x121212),
                    fillOpacity: 1,
                    stroke: am5.color(0xFFD700),
                    strokeOpacity: 0.5,
                    strokeWidth: 1,
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 14,
                    paddingRight: 14,
                    fontSize: "0.9rem",
                    fontFamily: "Montserrat",
                    background: am5.RoundedRectangle.new(root, {
                        fill: am5.color(0x121212),
                        fillOpacity: 1,
                        stroke: am5.color(0xFFD700),
                        strokeOpacity: 0.5,
                        strokeWidth: 1,
                        cornerRadius: 5
                    })
                })
            });

            return am5.Bullet.new(root, {
                sprite: circle,
                dynamic: true
            });
        });

        // Данные точек с переводами
        var pointData = [
            {
                geometry: { type: "Point", coordinates: [37.6173, 55.7558] },
                title: "Россия",
                title_en: "Russia",
                title_es: "Rusia",
                title_pt: "Rússia",
                value: 65
            },
            {
                geometry: { type: "Point", coordinates: [30.5234, 50.4501] },
                title: "Украина",
                title_en: "Ukraine",
                title_es: "Ucrania",
                title_pt: "Ucrânia",
                value: 90
            },
            {
                geometry: { type: "Point", coordinates: [71.4704, 51.1605] },
                title: "Казахстан",
                title_en: "Kazakhstan",
                title_es: "Kazajistán",
                title_pt: "Cazaquistão",
                value: 90
            },
            {
                geometry: { type: "Point", coordinates: [69.2401, 41.2995] },
                title: "Узбекистан",
                title_en: "Uzbekistan",
                title_es: "Uzbekistán",
                title_pt: "Uzbequistão",
                value: 92
            },
            {
                geometry: { type: "Point", coordinates: [16.3738, 48.2082] },
                title: "Австрия",
                title_en: "Austria",
                title_es: "Austria",
                title_pt: "Áustria",
                value: 84
            },
            {
                geometry: { type: "Point", coordinates: [4.3517, 50.8503] },
                title: "Бельгия",
                title_en: "Belgium",
                title_es: "Bélgica",
                title_pt: "Bélgica",
                value: 87
            },
            {
                geometry: { type: "Point", coordinates: [13.4050, 52.5200] },
                title: "Германия",
                title_en: "Germany",
                title_es: "Alemania",
                title_pt: "Alemanha",
                value: 85
            },
            {
                geometry: { type: "Point", coordinates: [12.5683, 55.6761] },
                title: "Дания",
                title_en: "Denmark",
                title_es: "Dinamarca",
                title_pt: "Dinamarca",
                value: 83
            },
            {
                geometry: { type: "Point", coordinates: [24.7536, 59.4369] },
                title: "Эстония",
                title_en: "Estonia",
                title_es: "Estonia",
                title_pt: "Estónia",
                value: 89
            },
            {
                geometry: { type: "Point", coordinates: [-3.7038, 40.4168] },
                title: "Испания",
                title_en: "Spain",
                title_es: "España",
                title_pt: "Espanha",
                value: 82
            },
            {
                geometry: { type: "Point", coordinates: [24.9384, 60.1699] },
                title: "Финляндия",
                title_en: "Finland",
                title_es: "Finlandia",
                title_pt: "Finlândia",
                value: 86
            },
            {
                geometry: { type: "Point", coordinates: [2.3522, 48.8566] },
                title: "Франция",
                title_en: "France",
                title_es: "Francia",
                title_pt: "França",
                value: 83
            },
            {
                geometry: { type: "Point", coordinates: [-0.1276, 51.5074] },
                title: "Великобритания",
                title_en: "United Kingdom",
                title_es: "Reino Unido",
                title_pt: "Reino Unido",
                value: 88
            },
            {
                geometry: { type: "Point", coordinates: [-6.2603, 53.3498] },
                title: "Ирландия",
                title_en: "Ireland",
                title_es: "Irlanda",
                title_pt: "Irlanda",
                value: 85
            },
            {
                geometry: { type: "Point", coordinates: [12.4964, 41.9028] },
                title: "Италия",
                title_en: "Italy",
                title_es: "Italia",
                title_pt: "Itália",
                value: 81
            },
            {
                geometry: { type: "Point", coordinates: [25.2797, 54.6872] },
                title: "Литва",
                title_en: "Lithuania",
                title_es: "Lituania",
                title_pt: "Lituânia",
                value: 88
            },
            {
                geometry: { type: "Point", coordinates: [24.1052, 56.9496] },
                title: "Латвия",
                title_en: "Latvia",
                title_es: "Letonia",
                title_pt: "Letônia",
                value: 87
            },
            {
                geometry: { type: "Point", coordinates: [10.7522, 59.9139] },
                title: "Норвегия",
                title_en: "Norway",
                title_es: "Noruega",
                title_pt: "Noruega",
                value: 84
            },
            {
                geometry: { type: "Point", coordinates: [-9.1393, 38.7223] },
                title: "Португалия",
                title_en: "Portugal",
                title_es: "Portugal",
                title_pt: "Portugal",
                value: 80
            },
            {
                geometry: { type: "Point", coordinates: [18.0686, 59.3293] },
                title: "Швеция",
                title_en: "Sweden",
                title_es: "Suecia",
                title_pt: "Suécia",
                value: 85
            },
            {
                geometry: { type: "Point", coordinates: [14.5057, 46.0569] },
                title: "Словения",
                title_en: "Slovenia",
                title_es: "Eslovenia",
                title_pt: "Eslovênia",
                value: 83
            },
            {
                geometry: { type: "Point", coordinates: [17.1077, 48.1486] },
                title: "Словакия",
                title_en: "Slovakia",
                title_es: "Eslovaquia",
                title_pt: "Eslováquia",
                value: 82
            },
            {
                geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
                title: "Нидерланды",
                title_en: "Netherlands",
                title_es: "Países Bajos",
                title_pt: "Países Baixos",
                value: 86
            }
        ];

        // Обновляем тултипы при изменении языка
        function updateTooltips() {
            pointSeries.bullets.each(function(bullet) {
                if (bullet.get("sprite")) {
                    bullet.get("sprite").set("tooltipText", getTooltipText(bullet.dataItem));
                }
            });
        }

        // Слушаем изменение языка
        document.addEventListener('languageChanged', updateTooltips);

        // Устанавливаем данные и добавляем обработчик для обновления тултипов
        pointSeries.data.setAll(pointData.map(item => ({
            ...item,
            tooltipContent: getTooltipText({ dataContext: item })
        })));

        // Добавляем анимацию появления точек
        pointSeries.appear(1000, 100);

        // Устанавливаем начальное положение и добавляем анимацию появления карты
        chart.appear(1000, 100);
    });
}

// Запускаем инициализацию карты при загрузке страницы
document.addEventListener('DOMContentLoaded', initMap);
