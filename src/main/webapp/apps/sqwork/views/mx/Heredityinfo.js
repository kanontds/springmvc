define(['text!mx/HeredityinfoTpl.htm','BzModel','underscore','common/RespMessage'],
function(htm,BzModel,_,RespMessage){

  return {render:function(local,cb){
   var oldid=cb.params.parentForm.find('input[name=oldid]').val();
    var Heredityinfo = BzModel.extend({
    urlRoot : 'eers/heredityinfo',
     idAttribute: "heredityid",
    defaults: function() {
      return {
        heredityid:null,
        hypertension:null,
        hyperlipemiars:null,
        diabetes:null,
        coronary:null,
        cerebrovascular:null,
        oldid:null,
        title: "emptytodo...",
        order: Heredityinfos.nextOrder(),
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

  var HeredityinfoList = Backbone.Collection.extend({
    url:'eers/heredityinfo',
    model: Heredityinfo,
    //localStorage: new Backbone.LocalStorage("heredityinfo-backbone"),
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
    var Heredityinfos = new HeredityinfoList;

  var HeredityinfoView = Backbone.View.extend({
    template: _.template(htm),
    events: {
      "click a[action=destroy]" : "destroy",
      "click a[action=save]"    : "save"
    },
   initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },
    // Re-render the name and tel of the heredityinfo item.
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
      this.listenTo(Heredityinfos, 'add', this.addOne);
      this.listenTo(Heredityinfos, 'reset', this.addAll);
      this.listenTo(Heredityinfos, 'all', this.render);
       this.addOneView();
      var me=this;
      if(oldid){
        Heredityinfos.fetch({ data: $.param({ page: 1,customtag:'nopagination',
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
      var view = new HeredityinfoView({model: todo});
      var vel=view.render().el;
      this.$("div[opt=list]").append(vel);
      $.parser.parse(vel);
    },
    addOneView: function(e) {
      var m=new Heredityinfo({});
          m.on("invalid", function(model, error) {
      alert(" " + error);
    });

      var view = new HeredityinfoView({model:m});
      var vel=view.render().el;
      this.$("div[opt=list]").append(vel);
      $.parser.parse(vel);
    },
    addAll: function() {
      Heredityinfos.each(this.addOne, this);
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;
  }}
})
