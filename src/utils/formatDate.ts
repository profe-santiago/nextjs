export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(dateString));
}