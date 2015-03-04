

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    listdb: function() {
      return Listdb.find({});
    }
  });

  Template.body.events({
    "submit .new-member": function(e) {
      e.preventDefault();
      
      var firstname = $('#firstName').val();
      var lastname = $('#lastName').val();
      var email = $('#email').val();
     
      Listdb.insert({
        name: {
          firstName:firstname,
          lastName: lastname
        },
        email:email
      });

      $('#firstName').val("");
      $('#lastName').val("");
      $('#email').val("");

    },

    "click .delete": function(e) {
      e.preventDefault();
      var d = Blaze.getData(event.target);
      Listdb.remove({_id:d._id});
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
      if (Listdb.find().count()<1){
        Listdb.insert({
          name: {firstName: 'Mariel', lastName: 'Milito'},
          email: 'militomariel@gmail.com',
          priorWork: 'Ski Industry',
          aspirations: 'I want to code',
          skills:['PCI','commuting'],
          contact:{twitter: '@marielmilito', linkedIn: 'Mariel Milito', faceBook: 'Mariel Dickson Milito'}
          });

          Listdb.insert({
          name: {firstName: 'Charlie', lastName: 'Fox'},
          email: 'webartificer@gmail.com',
          priorWork: 'Designer',
          aspirations: 'Code Ninja',
          skills:['UI'],
          contact:{twitter: '@oakseven', linkedIn: 'webartificer'}    
          });

          Listdb.insert({
          name: {firstName: 'Charles', lastName: 'Harrod'},
          email: 'sam.charles.harrod@gmail.com',
          priorWork: 'Retail Mgmt',
          aspirations: 'Badass',
          skills:['not really'],
          contact:{linkedIn: 'Charles Harrod', faceBook: 'Charles Harrod'}    
          });
    } 
    //console.log(Listdb.find().fetch());
  });
}
