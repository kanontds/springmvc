App = Ember.Application.create();


//定义一两个对象开始
Person = Ember.Object.extend({
  say:function(thing) {
    var name = this.get('name');
    alert('${name} says: ${thing}');
      
  }
  
});

Soldier = Person.extend({
  say:function(thing) {
    // this will call the method in the parent class (Person#say), appending
    // the string ', sir!' to the variable `thing` passed in
    this._super('${thing}, sir!');
      
  }
  
});

var yehuda = Soldier.create({
  name: 'Yehuda Katz'
  
});
//定义一两个对象结束

App.Router.map(function() {
  this.route('about', { path: '/about' });
  this.route('favorites', { path: '/favs' });
  
});


//yehuda.say('Yes'); // alerts "Yehuda Katz says: Yes, sir!"
