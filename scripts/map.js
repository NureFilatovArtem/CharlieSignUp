// Map initialization and tooltip handling
document.addEventListener('DOMContentLoaded', () => {
    // Points data with fixed positions
    const mapPoints = [
        {
            id: 'russia',
            position: {
                top: '35%',
                left: '68%'
            },
            title: {
                ru: 'Россия: 60-70% конверсия',
                en: 'Russia: 60-70% Conversion',
                es: 'Rusia: 60-70% Conversión',
                pt: 'Rússia: 60-70% Conversão'
            }
        },
        {
            id: 'ukraine',
            position: {
                top: '42%',
                left: '54%'
            },
            title: {
                ru: 'Украина: 90% конверсия',
                en: 'Ukraine: 90% Conversion',
                es: 'Ucrania: 90% Conversión',
                pt: 'Ucrânia: 90% Conversão'
            }
        },
        {
            id: 'kazakhstan',
            position: {
                top: '43%',
                left: '60%'
            },
            title: {
                ru: 'Казахстан: 90% конверсия',
                en: 'Kazakhstan: 90% Conversion',
                es: 'Kazajistán: 90% Conversión',
                pt: 'Cazaquistão: 90% Conversão'
            }
        },
        {
            id: 'uzbekistan',
            position: {
                top: '46%',
                left: '60%'
            },
            title: {
                ru: 'Узбекистан: 85-99% конверсия',
                en: 'Uzbekistan: 85-99% Conversion',
                es: 'Uzbekistán: 85-99% Conversión',
                pt: 'Uzbequistão: 85-99% Conversão'
            }
        },
        {
            id: 'austria',
            position: {
                top: '45%',
                left: '55%'
            },
            title: {
                ru: 'Австрия: 75-85% конверсия',
                en: 'Austria: 75-85% Conversion',
                es: 'Austria: 75-85% Conversión',
                pt: 'Áustria: 75-85% Conversão'
            }
        },
        {
            id: 'belgium',
            position: {
                top: '41%',
                left: '49%'
            },
            title: {
                ru: 'Бельгия: 80-90% конверсия',
                en: 'Belgium: 80-90% Conversion',
                es: 'Bélgica: 80-90% Conversión',
                pt: 'Bélgica: 80-90% Conversão'
            }
        },
        {
            id: 'germany',
            position: {
                top: '42%',
                left: '51%'
            },
            title: {
                ru: 'Германия: 85-95% конверсия',
                en: 'Germany: 85-95% Conversion',
                es: 'Alemania: 85-95% Conversión',
                pt: 'Alemanha: 85-95% Conversão'
            }
        },
        {
            id: 'denmark',
            position: {
                top: '37%',
                left: '50%'
            },
            title: {
                ru: 'Дания: 70-80% конверсия',
                en: 'Denmark: 70-80% Conversion',
                es: 'Dinamarca: 70-80% Conversión',
                pt: 'Dinamarca: 70-80% Conversão'
            }
        },
        {
            id: 'estonia',
            position: {
                top: '37%',
                left: '53%'
            },
            title: {
                ru: 'Эстония: 75-85% конверсия',
                en: 'Estonia: 75-85% Conversion',
                es: 'Estonia: 75-85% Conversión',
                pt: 'Estónia: 75-85% Conversão'
            }
        },
        {
            id: 'spain',
            position: {
                top: '48%',
                left: '47%'
            },
            title: {
                ru: 'Испания: 65-75% конверсия',
                en: 'Spain: 65-75% Conversion',
                es: 'España: 65-75% Conversión',
                pt: 'Espanha: 65-75% Conversão'
            }
        },
        {
            id: 'finland',
            position: {
                top: '33%',
                left: '53%'
            },
            title: {
                ru: 'Финляндия: 70-80% конверсия',
                en: 'Finland: 70-80% Conversion',
                es: 'Finlandia: 70-80% Conversión',
                pt: 'Finlândia: 70-80% Conversão'
            }
        },
        {
            id: 'france',
            position: {
                top: '45%',
                left: '48%'
            },
            title: {
                ru: 'Франция: 75-85% конверсия',
                en: 'France: 75-85% Conversion',
                es: 'Francia: 75-85% Conversión',
                pt: 'França: 75-85% Conversão'
            }
        },
        {
            id: 'uk',
            position: {
                top: '40%',
                left: '47%'
            },
            title: {
                ru: 'Великобритания: 80-90% конверсия',
                en: 'United Kingdom: 80-90% Conversion',
                es: 'Reino Unido: 80-90% Conversión',
                pt: 'Reino Unido: 80-90% Conversão'
            }
        },
        {
            id: 'ireland',
            position: {
                top: '40%',
                left: '46%'
            },
            title: {
                ru: 'Ирландия: 70-80% конверсия',
                en: 'Ireland: 70-80% Conversion',
                es: 'Irlanda: 70-80% Conversión',
                pt: 'Irlanda: 70-80% Conversão'
            }
        },
        {
            id: 'italy',
            position: {
                top: '46%',
                left: '50%'
            },
            title: {
                ru: 'Италия: 75-85% конверсия',
                en: 'Italy: 75-85% Conversion',
                es: 'Italia: 75-85% Conversión',
                pt: 'Itália: 75-85% Conversão'
            }
        },
        {
            id: 'lithuania',
            position: {
                top: '40%',
                left: '52%'
            },
            title: {
                ru: 'Литва: 70-80% конверсия',
                en: 'Lithuania: 70-80% Conversion',
                es: 'Lituania: 70-80% Conversión',
                pt: 'Lituânia: 70-80% Conversão'
            }
        },
        {
            id: 'latvia',
            position: {
                top: '39%',
                left: '53%'
            },
            title: {
                ru: 'Латвия: 75-85% конверсия',
                en: 'Latvia: 75-85% Conversion',
                es: 'Letonia: 75-85% Conversión',
                pt: 'Letônia: 75-85% Conversão'
            }
        },
        {
            id: 'norway',
            position: {
                top: '35%',
                left: '50%'
            },
            title: {
                ru: 'Норвегия: 70-80% конверсия',
                en: 'Norway: 70-80% Conversion',
                es: 'Noruega: 70-80% Conversión',
                pt: 'Noruega: 70-80% Conversão'
            }
        },
        {
            id: 'portugal',
            position: {
                top: '48%',
                left: '46%'
            },
            title: {
                ru: 'Португалия: 65-75% конверсия',
                en: 'Portugal: 65-75% Conversion',
                es: 'Portugal: 65-75% Conversión',
                pt: 'Portugal: 65-75% Conversão'
            }
        },
        {
            id: 'sweden',
            position: {
                top: '35%',
                left: '55%'
            },
            title: {
                ru: 'Швеция: 75-85% конверсия',
                en: 'Sweden: 75-85% Conversion',
                es: 'Suecia: 75-85% Conversión',
                pt: 'Suécia: 75-85% Conversão'
            }
        },
        {
            id: 'slovenia',
            position: {
                top: '47%',
                left: '55%'
            },
            title: {
                ru: 'Словения: 70-80% конверсия',
                en: 'Slovenia: 70-80% Conversion',
                es: 'Eslovenia: 70-80% Conversión',
                pt: 'Eslovênia: 70-80% Conversão'
            }
        },
        {
            id: 'slovakia',
            position: {
                top: '40%',
                left: '50%'
            },
            title: {
                ru: 'Словакия: 75-85% конверсия',
                en: 'Slovakia: 75-85% Conversion',
                es: 'Eslovaquia: 75-85% Conversión',
                pt: 'Eslováquia: 75-85% Conversão'
            }
        },
        {
            id: 'netherlands',
            position: {
                top: '39%',
                left: '50%'
            },
            title: {
                ru: 'Нидерланды: 80-90% конверсия',
                en: 'Netherlands: 80-90% Conversion',
                es: 'Países Bajos: 80-90% Conversión',
                pt: 'Países Baixos: 80-90% Conversão'
            }
        },
        {
            id: 'poland',
            position: {
                top: '41%',
                left: '52%'
            },
            title: {
                ru: 'Польша: 75-85% конверсия',
                en: 'Poland: 75-85% Conversion',
                es: 'Polonia: 75-85% Conversión',
                pt: 'Polônia: 75-85% Conversão'
            }
        }
    ];

    // Function to adjust position based on scale
    function adjustPositionForScale(scale) {
        const baseScale = 175; // Base scale where positions are perfect
        
        // Add 5% to top position when scale is between 100% and 140%
        if (scale >= 100 && scale <= 140) {
            console.log(`Scale: ${scale}, Adjustment: +7%`);
            
            // Update all points
            const pins = document.querySelectorAll('.geo-pin');
            pins.forEach(pin => {
                const originalTop = parseInt(pin.getAttribute('data-original-top'));
                if (!isNaN(originalTop)) {
                    const newTop = originalTop + 7; // Add 5% to top position
                    pin.style.top = `${newTop}%`;
                    console.log(`${pin.getAttribute('data-geo')}: ${originalTop}% -> ${newTop}%`);
                }
            });
        } else {
            // Reset to original positions if scale is outside 100-140% range
            const pins = document.querySelectorAll('.geo-pin');
            pins.forEach(pin => {
                const originalTop = pin.getAttribute('data-original-top');
                if (originalTop) {
                    pin.style.top = `${originalTop}%`;
                }
            });
        }
    }

    // Create map points
    function initializeMap() {
        const mapContainer = document.querySelector('.geo-map-container');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        console.log('Initializing map points...');

        // Clear existing points
        const existingPoints = mapContainer.querySelectorAll('.geo-pin');
        existingPoints.forEach(point => point.remove());

        // Create new points
        mapPoints.forEach(point => {
            const pinElement = document.createElement('div');
            pinElement.className = 'geo-pin';
            pinElement.setAttribute('data-geo', point.id);

            // Store original position as data attribute (without %)
            const originalTop = parseInt(point.position.top);
            pinElement.setAttribute('data-original-top', originalTop);
            
            // Set initial position
            pinElement.style.top = point.position.top;
            pinElement.style.left = point.position.left;

            // Set data attributes for all languages
            Object.entries(point.title).forEach(([lang, text]) => {
                pinElement.setAttribute(`data-${lang}`, text);
            });

            mapContainer.appendChild(pinElement);
        });

        // Initialize tooltips
        initializeTooltips();
        
        // Initial position adjustment based on current scale
        const transform = getComputedStyle(mapContainer).transform;
        if (transform && transform !== 'none') {
            const scale = parseFloat(transform.split('(')[1]) || 1.75;
            adjustPositionForScale(scale * 100);
        }
    }

    // Add scale change detection
    const mapContainer = document.querySelector('.geo-map-container');
    if (mapContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const transform = getComputedStyle(mapContainer).transform;
                    if (transform && transform !== 'none') {
                        const scale = parseFloat(transform.split('(')[1]) || 1.75;
                        adjustPositionForScale(scale * 100);
                    }
                }
            });
        });

        observer.observe(mapContainer, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    // Initialize tooltips and hover effects
    function initializeTooltips() {
        const pins = document.querySelectorAll('.geo-pin');
        pins.forEach(pin => {
            pin.addEventListener('mouseenter', () => {
                pin.classList.add('geo-pin-hover');
            });

            pin.addEventListener('mouseleave', () => {
                pin.classList.remove('geo-pin-hover');
            });

            pin.addEventListener('focus', () => {
                pin.classList.add('geo-pin-hover');
            });

            pin.addEventListener('blur', () => {
                pin.classList.remove('geo-pin-hover');
            });
        });
    }

    // Update tooltips when language changes
    function updateMapLanguage(lang) {
        const pins = document.querySelectorAll('.geo-pin');
        pins.forEach(pin => {
            const newText = pin.getAttribute(`data-${lang}`);
            if (newText) {
                pin.setAttribute('aria-label', `${newText} Geo Pin`);
            }
        });
        console.log(`Map language updated to: ${lang}`);
    }

    // Helper function to add new points
    window.addMapPoint = function(id, position, titles) {
        const point = {
            id,
            position,
            title: titles
        };
        mapPoints.push(point);
        initializeMap();
        return point;
    };

    // Initialize map
    initializeMap();

    // Listen for language changes
    document.addEventListener('languageChanged', (e) => {
        const newLang = e.detail.language;
        updateMapLanguage(newLang);
    });
});
