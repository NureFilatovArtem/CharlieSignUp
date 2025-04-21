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
                strokeOpacity: 0.3,
                interactive: false
            })
        );

        // Создаем серию точек
        var pointSeries = chart.series.push(
            am5map.MapPointSeries.new(root, {
                interactive: true,
                layer: 1
            })
        );

        // Определяем константы для точек
        const POINT_RUSSIA = {
            id: "RU",
            geometry: { type: "Point", coordinates: [37.6173, 55.7558] },
            title: "Россия",
            title_en: "Russia",
            title_es: "Rusia",
            title_pt: "Rússia",
            value: 65
        };

        const POINT_UKRAINE = {
            id: "UA",
            geometry: { type: "Point", coordinates: [30.5234, 48.4501] },
            title: "Украина",
            title_en: "Ukraine",
            title_es: "Ucrania",
            title_pt: "Ucrânia",
            value: 90
        };

        const POINT_KAZAKHSTAN = {
            id: "KZ",
            geometry: { type: "Point", coordinates: [71.4704, 50.1605] },
            title: "Казахстан",
            title_en: "Kazakhstan",
            title_es: "Kazajistán",
            title_pt: "Cazaquistão",
            value: 90
        };

        const POINT_UZBEKISTAN = {
            id: "UZ",
            geometry: { type: "Point", coordinates: [69.2401, 40.2995] },
            title: "Узбекистан",
            title_en: "Uzbekistan",
            title_es: "Uzbekistán",
            title_pt: "Uzbequistão",
            value: 92
        };

        const POINT_AUSTRIA = {
            id: "AT",
            geometry: { type: "Point", coordinates: [16.3738, 48.2082] },
            title: "Австрия",
            title_en: "Austria",
            title_es: "Austria",
            title_pt: "Áustria",
            value: 84
        };

        const POINT_BELGIUM = {
            id: "BE",
            geometry: { type: "Point", coordinates: [4.3517, 50.8503] },
            title: "Бельгия",
            title_en: "Belgium",
            title_es: "Bélgica",
            title_pt: "Bélgica",
            value: 87
        };

        const POINT_GERMANY = {
            id: "DE",
            geometry: { type: "Point", coordinates: [13.4050, 52.5200] },
            title: "Германия",
            title_en: "Germany",
            title_es: "Alemania",
            title_pt: "Alemanha",
            value: 85
        };

        const POINT_DENMARK = {
            id: "DK",
            geometry: { type: "Point", coordinates: [12.5683, 55.6761] },
            title: "Дания",
            title_en: "Denmark",
            title_es: "Dinamarca",
            title_pt: "Dinamarca",
            value: 83
        };

        const POINT_ESTONIA = {
            id: "EE",
            geometry: { type: "Point", coordinates: [24.7536, 59.4369] },
            title: "Эстония",
            title_en: "Estonia",
            title_es: "Estonia",
            title_pt: "Estónia",
            value: 89
        };

        const POINT_SPAIN = {
            id: "ES",
            geometry: { type: "Point", coordinates: [-3.7038, 40.4168] },
            title: "Испания",
            title_en: "Spain",
            title_es: "España",
            title_pt: "Espanha",
            value: 82
        };

        const POINT_FINLAND = {
            id: "FI",
            geometry: { type: "Point", coordinates: [24.9384, 60.1699] },
            title: "Финляндия",
            title_en: "Finland",
            title_es: "Finlandia",
            title_pt: "Finlândia",
            value: 86
        };

        const POINT_FRANCE = {
            id: "FR",
            geometry: { type: "Point", coordinates: [2.3522, 48.8566] },
            title: "Франция",
            title_en: "France",
            title_es: "Francia",
            title_pt: "França",
            value: 83
        };

        const POINT_UK = {
            id: "GB",
            geometry: { type: "Point", coordinates: [-0.1276, 51.5074] },
            title: "Великобритания",
            title_en: "United Kingdom",
            title_es: "Reino Unido",
            title_pt: "Reino Unido",
            value: 88
        };

        const POINT_IRELAND = {
            id: "IE",
            geometry: { type: "Point", coordinates: [-6.2603, 53.3498] },
            title: "Ирландия",
            title_en: "Ireland",
            title_es: "Irlanda",
            title_pt: "Irlanda",
            value: 85
        };

        const POINT_ITALY = {
            id: "IT",
            geometry: { type: "Point", coordinates: [12.4964, 41.9028] },
            title: "Италия",
            title_en: "Italy",
            title_es: "Italia",
            title_pt: "Itália",
            value: 81
        };

        const POINT_LITHUANIA = {
            id: "LT",
            geometry: { type: "Point", coordinates: [25.2797, 54.6872] },
            title: "Литва",
            title_en: "Lithuania",
            title_es: "Lituania",
            title_pt: "Lituânia",
            value: 88
        };

        const POINT_LATVIA = {
            id: "LV",
            geometry: { type: "Point", coordinates: [24.1052, 56.9496] },
            title: "Латвия",
            title_en: "Latvia",
            title_es: "Letonia",
            title_pt: "Letônia",
            value: 87
        };

        const POINT_NORWAY = {
            id: "NO",
            geometry: { type: "Point", coordinates: [10.7522, 59.9139] },
            title: "Норвегия",
            title_en: "Norway",
            title_es: "Noruega",
            title_pt: "Noruega",
            value: 84
        };

        const POINT_PORTUGAL = {
            id: "PT",
            geometry: { type: "Point", coordinates: [-9.1393, 38.7223] },
            title: "Португалия",
            title_en: "Portugal",
            title_es: "Portugal",
            title_pt: "Portugal",
            value: 80
        };

        const POINT_SWEDEN = {
            id: "SE",
            geometry: { type: "Point", coordinates: [18.0686, 59.3293] },
            title: "Швеция",
            title_en: "Sweden",
            title_es: "Suecia",
            title_pt: "Suécia",
            value: 85
        };

        const POINT_SLOVENIA = {
            id: "SI",
            geometry: { type: "Point", coordinates: [14.5057, 46.0569] },
            title: "Словения",
            title_en: "Slovenia",
            title_es: "Eslovenia",
            title_pt: "Eslovênia",
            value: 83
        };

        const POINT_SLOVAKIA = {
            id: "SK",
            geometry: { type: "Point", coordinates: [17.1077, 48.1486] },
            title: "Словакия",
            title_en: "Slovakia",
            title_es: "Eslovaquia",
            title_pt: "Eslováquia",
            value: 82
        };

        const POINT_NETHERLANDS = {
            id: "NL",
            geometry: { type: "Point", coordinates: [4.9041, 52.3676] },
            title: "Нидерланды",
            title_en: "Netherlands",
            title_es: "Países Bajos",
            title_pt: "Países Baixos",
            value: 86
        };

        // Массив всех точек
        const pointData = [
            POINT_RUSSIA,
            POINT_UKRAINE,
            POINT_KAZAKHSTAN,
            POINT_UZBEKISTAN,
            POINT_AUSTRIA,
            POINT_BELGIUM,
            POINT_GERMANY,
            POINT_DENMARK,
            POINT_ESTONIA,
            POINT_SPAIN,
            POINT_FINLAND,
            POINT_FRANCE,
            POINT_UK,
            POINT_IRELAND,
            POINT_ITALY,
            POINT_LITHUANIA,
            POINT_LATVIA,
            POINT_NORWAY,
            POINT_PORTUGAL,
            POINT_SWEDEN,
            POINT_SLOVENIA,
            POINT_SLOVAKIA,
            POINT_NETHERLANDS
        ];

        // Устанавливаем данные
        pointSeries.data.setAll(pointData);

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
            
            return translations[lang] || translations.en;
        }

        // Настраиваем внешний вид точек
        pointSeries.bullets.push(function(root, series, dataItem) {
            var container = am5.Container.new(root, {
                interactive: true,
                cursorOverStyle: "pointer",
                tooltipY: 0
            });

            // Пульсирующий круг
            var pulseCircle = am5.Circle.new(root, {
                radius: 6,
                fill: am5.color(0xFFD700),
                fillOpacity: 0.7,
                stroke: am5.color(0xFFD700),
                strokeWidth: 1.5,
                strokeOpacity: 0.5
            });

            // Основная точка
            var circle = am5.Circle.new(root, {
                radius: 6,
                fill: am5.color(0xFFD700),
                fillOpacity: 0.95,
                stroke: am5.color(0x121212),
                strokeWidth: 1.5,
                strokeOpacity: 1,
                interactive: true,
                cursorOverStyle: "pointer"
            });

            // Create tooltip
            var tooltip = am5.Tooltip.new(root, {
                getFillFromSprite: false,
                autoTextColor: false,
                labelText: getTooltipText(dataItem),
                background: am5.Rectangle.new(root, {
                    fill: am5.color(0x121212),
                    fillOpacity: 1,
                    stroke: am5.color(0xFFD700),
                    strokeWidth: 1,
                    cornerRadius: 4
                }),
                label: am5.Label.new(root, {
                    text: getTooltipText(dataItem),
                    fill: am5.color(0xFFD700),
                    fontSize: 14,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 4,
                    paddingBottom: 4,
                    textAlign: "center",
                    whiteSpace: "pre-wrap"
                }),
                position: "fixed",
                pointerOrientation: "vertical",
                dy: -40, // Move tooltip up
                dx: 0,
                animationDuration: 300,
                animationEasing: am5.ease.out(am5.ease.cubic)
            });

            // Set tooltip on both container and circle
            container.set("tooltip", tooltip);
            circle.set("tooltip", tooltip);

            // Add hover state for circle
            circle.states.create("hover", {
                scale: 1.2,
                fill: am5.color(0xFFD700),
                stroke: am5.color(0x121212),
                strokeWidth: 2
            });

            container.children.push(pulseCircle);
            container.children.push(circle);

            // Анимация пульсации
            pulseCircle.animate({
                key: "scale",
                from: 1,
                to: 2.2,
                duration: 1500,
                loops: Infinity,
                easing: am5.ease.out(am5.ease.cubic)
            });

            pulseCircle.animate({
                key: "opacity",
                from: 0.7,
                to: 0,
                duration: 1500,
                loops: Infinity,
                easing: am5.ease.out(am5.ease.cubic)
            });

            // Set z-index for better layering
            container.set("zIndex", 5);
            circle.set("zIndex", 7);

            return am5.Bullet.new(root, {
                sprite: container,
                dynamic: true
            });
        });

        // Обновляем тултипы при изменении языка
        function updateTooltips() {
            pointSeries.bullets.each(function(bullet) {
                const dataItem = bullet.dataItem;
                if (dataItem) {
                    const lang = getCurrentLang();
                    const title = dataItem.dataContext[`title_${lang}`] || dataItem.dataContext.title;
                    const value = dataItem.dataContext.value;
                    
                    const translations = {
                        ru: `${title}\nКонверсия: ${value}%`,
                        en: `${title}\nConversion: ${value}%`,
                        es: `${title}\nConversión: ${value}%`,
                        pt: `${title}\nConversão: ${value}%`
                    };
                    
                    const tooltipText = translations[lang] || translations.en;
                    const circle = bullet.get("sprite").children.getIndex(1);
                    if (circle) {
                        circle.set("data-tooltip", tooltipText);
                    }
                }
            });
        }

        // Слушаем изменение языка
        document.addEventListener('languageChanged', updateTooltips);

        // Анимация появления точек
        pointSeries.appear(1000, 100);

        // Анимация появления карты
        chart.appear(1000, 100);
    });
}

// Запускаем инициализацию карты при загрузке страницы
document.addEventListener('DOMContentLoaded', initMap);
