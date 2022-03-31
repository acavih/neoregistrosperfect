export default function calcularEdad (fecha: string) {
  const fechaNacimiento = new Date(fecha)
  const fechaActual = new Date()
  const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
  const mes = fechaActual.getMonth() - fechaNacimiento.getMonth()
  if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
    return edad - 1
  }
  return edad
}
