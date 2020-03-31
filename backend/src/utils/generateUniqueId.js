/**Criada para exemplificar quando uma funcionalidade é requerida por outras partes do programa
 * Neste caso, a geração de Id's únicos poderia ser utilizada para outros elementos
 * 
 * O teste unitário seria viável para uma função deste tipo
 */

const crypto = require('crypto');

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');
}