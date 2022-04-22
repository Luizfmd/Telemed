'use strict'

const { hooks } = require('@adonisjs/ignitor')
const moment = require('moment');

hooks.after.providersRegistered(() => {

    const Validator = use('Validator');
    const Database = use('Database');

    const floatFn = async (data, field, message, args, get) => {
        const value = get(data, field);

        if (!value) {
        return;
        }

        let float = value.match(/^\d+\.\d{0,2}$/g);

        if (!float) {
        throw message;
        }
    }

    Validator.extend('float', floatFn)

    })

    hooks.after.providersBooted(() => {
    const View = use("View");

    View.global("normalizeTimestamp", function(value) {
        return moment(value).format("DD/MM/YYYY HH:mm:ss");
    });

    View.global("formatFloat", function(value) {
        //return value.toFixed(2).toString().replace('.', ',');
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    });

    View.global("sum", function(v1, v2) {
        return parseInt(v1) + parseInt(v2);
    });

    View.global("subs", function(v1, v2) {
        return parseInt(v1) - parseInt(v2);
    });

    View.global("nl2br", function (str, is_xhtml) {
        if (typeof str === 'undefined' || str === null) {
        return '';
    }

    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    })

    View.global('formatDate', function(date) {
        return moment(date).format('DD/MM/YYYY');
    })
});
