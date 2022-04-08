require('dotenv/config')
require('olddbmodel/models/Resource')
const { connectDB } = require('olddbmodel/utils/connect-db.js')
const Partner = require('olddbmodel/models/Members')
const Atencion = require('olddbmodel/models/Atencion')
/** miembro
 * {
 * "_id":{"$oid":"61a7b2e470002e569cc6fad1"},
 * "sexo":{"$oid":"60faa327222e765e5e423a4c"},
 * "socioono":{"$oid":"60faa327222e765e5e423a42"},
 * "nacionalidad":{"$oid":"60faa321222e765e5e4239de"},
 * "ciudadresidencia":{"$oid":"60faa323222e765e5e423a06"},
 * "codigo":"03009",
 * "nombre":"eliminar MARIA ROSA",
 * "apellidos":"MORCUENDE",
 * "sipcard":".",
 * "correoelectronico":"ROSAFRANCOMORCUENDE@HOTMAIL.COM",
 * "observaciones":".",
 * "cosaspendientes":null,
 * "fechanacimiento":{"$date":{"$numberLong":"38448000000"}},
 * "__v":{"$numberInt":"0"}}
 */

/** Atencion
 *{"_id":{"$oid":"61a7b2e570002e569cc6fad8"},
 "tipoaenciones":[{"$oid":"60faa32b222e765e5e423a92"},{"$oid":"60faa32b222e765e5e423a94"}],
 "Proyectos":[{"$oid":"60faa328222e765e5e423a5c"},{"$oid":"60faa328222e765e5e423a5e"}],
 "motivosatencion":[],
 "derivadoa":[{"$oid":"60faa32a222e765e5e423a7a"}],
 "derivadode":[],
 "formacion":[],
 "voluntariado":[],
 "cosaspendientes":null,
 "archived":false,
 "comentario":"Se presenta el Ingreso Mínimo Vital",
 "user":{"$oid":"61a7b2e470002e569cc6fad1"},
 "fechaatencion":{"$date":{"$numberLong":"1623024000000"}},
 "__v":{"$numberInt":"0"},
 "fechacosaspendientes":null}
 */

async function main () {
  await connectDB()
  const partners = await Partner.find()
    .populate(['sexo', 'socioono', 'nacionalidad', 'ciudadresidencia'])

  const partnersWithAttentions = await Promise.all(partners.map(async (p) => {
    const attentions = await Atencion.find({ user: p })
      .populate(['tipoaenciones', 'Proyectos', 'motivosatencion', 'derivadoa', 'derivadode',
        'formacion', 'voluntariado', 'lugaratencion'])
    return { ...p, attentions }
  }))
  const curated = partnersWithAttentions.map((_) => {
    const member = _._doc
    return {
      code: member.codigo,
      name: member.nombre,
      surname: member.apellidos,
      bornDate: member.fechanacimiento,
      sipCard: member.sipcard,
      email: member.correoelectronico,
      phone: member.telefono,
      observations: member.observaciones,
      pendent: member.cosaspendientes,
      partner: extractNameResources(member.socioono),
      sex: extractNameResources(member.sexo),
      nationality: extractNameResources(member.nacionalidad),
      residency: extractNameResources(member.ciudadresidencia),
      attentions: _.attentions.map((__) => {
        const a = __._doc
        return {
          attentionsTypes: extractNameResources(a.tipoaenciones),
          projects: extractNameResources(a.Proyectos),
          attentionReasons: extractNameResources(a.motivosatencion),
          derivedTo: extractNameResources(a.derivadoa),
          derivedFrom: extractNameResources(a.derivadode),
          formation: extractNameResources(a.formacion),
          volunteer: extractNameResources(a.volunteer),
          placeAttention: extractNameResources(a.lugaratencion),
          pendent: a.cosaspendientes,
          archived: a.archived,
          comment: a.comentario,
          dateAttention: a.fechaatencion,
          datePendent: a.fechacosaspendientes
        }
      })
    }
  })
  const date =  new Date().toISOString()
  require('fs').writeFileSync('data.json', JSON.stringify(curated))
  console.log('backup completado')
}

main()

function extractNameResources (a) {
  if (!a) { return a }
  const formatInStr = r => `${r.name}:${r.type}`
  if (a.map) {
    return a.map(formatInStr)
  } else {
    return formatInStr(a)
  }
}
