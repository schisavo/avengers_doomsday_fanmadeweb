/*
 * Estructura de los valores utilizados
 * por el contador de lanzamiento.
 */
export interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

/*
 * Calcula el tiempo restante hasta una fecha determinada.
 *
 * Acepta una fecha como string o como timestamp.
 * Si la fecha ya paso, devuelve todos los valores en cero.
 */
export function getCountdown(
    targetDate: string | number,
): CountdownTime {
    const target =
        typeof targetDate === "number"
        ? targetDate
        : new Date(targetDate).getTime();

    const difference = target - Date.now();

    /*
    * Evita valores negativos cuando el contador
    * ya llego a cero.
    */
    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    /*
    * Convierte la diferencia de tiempo a segundos
    * para calcular cada unidad del contador.
    */
    const totalSeconds = Math.floor(
        difference / 1000,
    );

    return {
        days: Math.floor(
            totalSeconds / 86400,
        ),

        hours: Math.floor(
            (totalSeconds % 86400) / 3600,
        ),

        minutes: Math.floor(
            (totalSeconds % 3600) / 60,
        ),

        seconds: totalSeconds % 60,
    };
}

/*
 * Agrega ceros a la izquierda para mantener
 * un formato uniforme en el contador.
 */
export function padCountdown(value: number,length: number,): string {
    return String(value).padStart(
        length,
        "0",
    );
}