define(['text!mx/HypertensioninfoTpl.htm','BzModel','underscore','common/RespMessage'],
function(htm,BzModel,_,RespMessage){

  return {render:function(local,cb){
   var oldid=cb.params.parentForm.find('input[name=oldid]').val();
    var Hypertensioninfo = BzModel.extend({
    urlRoot : 'eers/hypertensioninfo',
     idAttribute: "hyid",
    defaults: function() {
      return {
        hyid:null,
        hytime:null,
        usemedicine:null,
        effect:null,
        sbp:null,
        dbp:null,
        hylevel:null,
        risklevel:null,
        oldid:null,
       title: "emptytodo...",
        order: Hypertensioninfos.nextOrder(),
        done: false
      };
    },
    validate: function(attrs, options) {
    if (!attrs.oldid) {
      return '请先保存基本信息';
    }
  },
    toggle: function() {
      this.save({done: !this.get("done")});
    }
  });

  var HypertensioninfoList = Backbone.Collection.extend({
    url:'eers/hypertensioninfo',
    model: Hypertensioninfo,
    //localStorage: new Backbone.LocalStorage("hypertensioninfo-backbone"),
    done: function() {
      return this.where({done: true});
    },
    remaining: function() {
      return this.where({done: false});
    },
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: 'order'
  });
    var Hypertensioninfos = new HypertensioninfoList;

  var HypertensioninfoView = Backbone.View.extend({
    template: _.template(htm),
    events: {
      "click a[action=destroy]" : "destroy",
      "click a[action=save]"    : "save"
    },
   initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    // Re-render the name and tel of the hypertensioninfo item.
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      return this;
    },
    destroy: function() {
      this.model.destroy(RespMessage.createOption());
    },
    save: function() {
       var o={};
       var os=this.$('form').serializeArray();
              var validateResult=this.$('form').form('validate');
              if(!validateResult){
                  require(['common/ValidateFormMessage'],function(js){
                     js.render();
                  })
                  return;
              }

       var me=this;
       _.each(os,function(item){
          if(item.value)
           o[item.name]=item.value;
       })
       $.extend(o,{oldid:cb.params.parentForm.find('input[name=oldid]').val()});
       //this.model.set(o);
       this.model.save(o,RespMessage.createOption(this));
    }

  });

  var AppView = Backbone.View.extend({
    el: local.find("div[opt=main]"),
    events: {
      "click div[opt=add]":  "addOneView"
    },
    initialize: function() {
      this.listenTo(Hypertensioninfos, 'add', this.addOne);
      this.listenTo(Hypertensioninfos, 'reset', this.addAll);
      this.listenTo(Hypertensioninfos, 'all', this.render);
      var me=this;
      this.addOneView();
      if(oldid){
        Hypertensioninfos.fetch({ data: $.param({ page: 1,customtag:'nopagination',
                      intelligentsearch:[{name:'oldid',operate:'=',value:cb.params.parentForm.find('input[name=oldid]').val()}]})
                      ,success:function(resp){
                         if(resp && resp.length){
                            me.$("div[opt=list]").children().first().remove();
                         }
                      }});
      }
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

    },
    addOne: function(todo) {
      var view = new HypertensioninfoView({model: todo});
      var vel=view.render().el;
      this.$("div[opt=list]").append(vel);
      $.parser.parse(vel);
    },
    addOneView: function(e) {
      var m=new Hypertensioninfo({});
          m.on("invalid", function(model, error) {
      alert(" " + error);
    });

      var view = new HypertensioninfoView({model:m});
      var vel=view.render().el;
      this.$("div[opt=list]").append(vel);
      $.parser.parse(vel);
    },
    addAll: function() {
      Hypertensioninfos.each(this.addOne, this);
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;
  }}
})
