const AccessControl = require('accesscontrol');

const control = new AccessControl();

control
    .grant('1')
        .readAny('sheet', ['id_week_day_01', 'id_week_day_02', 'id_week_day_03', 'id_week_day_04', 'id_week_day_05', 'id_week_day_06'])
        .readAny('clients', ['name', 'user', 'email'])
control    
    .grant('2')
        .extend('1')
        .createOwn('sheet')
        .deleteOwn('sheet')
control
    .grant('3')
        .extend('1')
        .createAny('sheet')
        .deleteAny('sheet')
    

module.exports = control;