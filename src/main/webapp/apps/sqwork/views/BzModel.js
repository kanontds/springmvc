/**
数据型的id转换为string类型
**/
define(['backbone','backbone.mutators'],function(Backbone,mutators){
//mutator用法
var testMutator=function(){
var User = Backbone.Model.extend({
            // Define mutator properties
            mutators: {
                fullname: function () {
                    return this.get('firstname') + ' ' + this.get('lastname');
                }
            },
            defaults: {
                firstname: 'Sugar',
                lastname: 'Daddy'
            }
        });

        var user = new User();
        // use get to get the 'mutated' value
        user.get('fullname') // 'Sugar Daddy'

        console.log(user.get('fullname'));
        // serialize the model and see the 'mutated' value in the resulting JSON
        user.toJSON() // '{firstname: 'Sugar', lastname: 'Daddy', fullname: 'Sugar Daddy'}'

}
//BzModel backbone终级模型
var BM = Backbone.Model.extend({
            set222: function(attributes, options) {
                var newAttributes={_tt:'wp'};
                for(var p in attributes) {
                    var _v=attributes[p];
                    newAttributes[p]=$.isNumeric(_v)?(_v+''):_v;
                }
                Backbone.Model.prototype.set.apply(this, [newAttributes,options]);
            }
        });
  return BM;
})