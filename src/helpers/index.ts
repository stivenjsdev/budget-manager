export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  // cambia el gtm-0500 por el correspondiente a tu zona horaria
  const dateObj = new Date(dateStr + " GMT-0500");
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("es-ES", options).format(dateObj);
}
