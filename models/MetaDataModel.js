/**
 * Created by adityamangipudi1 on 4/28/15.
 */
var mongoose = require('mongoose');
var MetaDataModel = mongoose.model('metadata', {
    origin:{
        type: String,
        required: true

    }, imageUrl:{
        type: String,
        required: true
    },
    uuidName:{
        type: String,
        required: true,
        unique: true

    }




});
module.exports = MetaDataModel;
