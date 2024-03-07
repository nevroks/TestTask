import React, { useState, useEffect } from 'react';

// Наш хук
export default function useDebounce(value, delay) {
    // Состояние и сеттер для отложенного значения
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Выставить debouncedValue равным value (переданное значение)
            // после заданной задержки
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        // Вызывается снова, только если значение изменится
        // мы так же можем добавить переменную "delay" в массива зависимостей ...
        // ... если вы собираетесь менять ее динамически.
        [value]
    );

    return debouncedValue;
}