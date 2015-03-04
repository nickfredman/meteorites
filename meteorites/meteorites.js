Members = new Mongo.Collection("members");
//Members = new Meteor.Collection("members");

if (Meteor.isClient) {
  // // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
  
  // Template.body.helpers({
  //   members: [
  //     {name: "John"},
  //     {name: "Mike"},
  //     {name: "Andy"}
  //   ]
  // });
   
  Template.body.helpers({
    members: function() {
      //Members.insert({name:"cj"});
      return Members.find({});
    }
  });

  Template.body.events({
    "submit .new-member": function(event) {
      var name = event.target.name.value;
      
      Members.insert({
          name: name
      });
      
      event.target.name.value = "";

      return false;
    },

    "click .delete": function(event) {
      // console.log($(event.target).closest('li').attr('data-id'));
      // console.log(Blaze.getData(event.target));
      var d = Blaze.getData(event.target);
      Members.remove({_id:d._id});
      return false;
    }
  
  });

}

if (Meteor.isServer) {
  // Meteor.startup(function () {
  //   // code to run on server at startup
  // });
}
