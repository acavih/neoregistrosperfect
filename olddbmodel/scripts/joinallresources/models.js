const mongoose = require('mongoose')

/**
 *
 * @param {mongoose.Connection} connection
 * @returns
 */
function createModels (connection) {
    return {
        Resource: connection.model('resources', new mongoose.Schema({
            type: { type: String, required: true },
            name: { type: String, default: '' }
        })),

        Member: connection.model('members', new mongoose.Schema({
            codigo: { type: String },
            nombre: { type: String },
            apellidos: { type: String },
            fechanacimiento: { type: Date },
            sipcard: { type: String },
            correoelectronico: { type: String },
            telefono: { type: String },
            observaciones: { type: String },
            cosaspendientes: { type: String },
            sexo: { type: mongoose.Types.ObjectId, ref: 'resources' },
            socioono: { type: mongoose.Types.ObjectId, ref: 'resources' },
            nacionalidad: { type: mongoose.Types.ObjectId, ref: 'resources' },
            ciudadresidencia: { type: mongoose.Types.ObjectId, ref: 'resources' }
        })),

        Attention: connection.model('attentions', new mongoose.Schema({
            comentario: { type: String },
            fechaatencion: { type: Date },
            tipoaenciones: [{ type: mongoose.Types.ObjectId, ref: 'tipoatenciones' }],
            Proyectos: [{ type: mongoose.Types.ObjectId, ref: 'proyectos' }],
            motivosatencion: [{ type: mongoose.Types.ObjectId, ref: 'motivosatencion' }],
            derivadoa: [{ type: mongoose.Types.ObjectId, ref: 'derivaciones' }],
            derivadode: [{ type: mongoose.Types.ObjectId, ref: 'derivaciones' }],
            formacion: [{ type: mongoose.Types.ObjectId, ref: 'formacion' }],
            voluntariado: [{ type: mongoose.Types.ObjectId, ref: 'voluntariado' }],
            lugaratencion: { type: mongoose.Types.ObjectId, ref: 'lugaratencion' },
            cosaspendientes: { type: String, default: '' },
            fechacosaspendientes: { type: Date },
            user: { type: mongoose.Types.ObjectId, ref: 'partners' },
            archived: { type: Boolean, default: false }
        }))
    }
}
module.exports = createModels
