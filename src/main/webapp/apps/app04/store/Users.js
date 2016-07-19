Ext.define('AM.store.Users', {
    extend: 'Ext.data.Store',
    fields: ['name', 'email'],
    model: 'AM.model.User',
    data2: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ],
    autoLoad: true,

        proxy: {
            type: 'ajax',
            //url: 'eers/test-users',
            api: {
                    read: 'eers/test-users',
                    update: 'data/updateUsers.json'
                },
            reader: {
                type: 'json',
                root: 'users',
                successProperty: 'success'
            }
        }
});