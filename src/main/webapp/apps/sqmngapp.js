Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext.ux':'http://bsd/wp/ext-4.2.1/examples/ux/'
    }
    //'http://bsd/wp/ext-4.2.1/examples/ux/'

});

Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'AM',
    controllers: [
        'Users'
    ],
    appFolder: 'apps/app04',

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items2: [
                {
                    //xtype: 'panel',
                    xtype: 'userlist',
                    title: 'Users',
                    html : 'List of users will go here'
                }
            ],
            layout: 'border',
                items: [{
                    region: 'north',
                    html: '<h1 class="x-panel-header">Page Title</h1>',
                    border: false,
                    margins: '0 0 0 0'
                }, {
                    region: 'west',
                    collapsible: true,
                    split: true,
                    title: 'Navigation',
                    width: 150
                    // could use a TreePanel or AccordionLayout for navigational items
                }, {
                xtype: 'userlist',
                    region: 'east',
                    title: 'East Panel',
                    collapsible: true,

                    width: 250
                }, Ext.create('Ext.tab.Panel', {
                                           region: 'center', // a center region is ALWAYS required for border layout
                                           //deferredRender: false,
                   			            layout:'fit',
                                           id: 'mainContent-panel',

                                           //maskOnDisable:false,
                                           plugins: Ext.create('Ext.ux.TabCloseMenu', {
                                               extraItemsTail: [
                                                   '-',
                                                   {
                                                       text: 'Closable',
                                                       checked: true,
                                                       hideOnClick: true,
                                                       handler: function (item) {
                                                           currentItem.tab.setClosable(item.checked);
                                                       }
                                                   },
                                                   '-',
                                                   {
                                                       text: 'Enabled',
                                                       checked: true,
                                                       hideOnClick: true,
                                                       handler: function(item) {
                                                           currentItem.tab.setDisabled(!item.checked);
                                                       }
                                                   }
                                               ],
                                               listeners: {
                                                   beforemenu: function (menu, item) {
                                                       var enabled = menu.child('[text="Enabled"]');
                                                       menu.child('[text="Closable"]').setChecked(item.closable);
                                                       if (item.tab.active) {
                                                           enabled.disable();
                                                       } else {
                                                           enabled.enable();
                                                           enabled.setChecked(!item.tab.isDisabled());
                                                       }

                                                       currentItem = item;
                                                   }
                                               }
                                           }),
                                           //hideMode:"visibility",
                                           closeAction:'hide',
                                           activeTab: 0,     // first tab initially active
                                           items: [
                                               {
                                                   xtype: 'userlist'

                                               }
                   				    ]
                                      })]
        });
    }
});