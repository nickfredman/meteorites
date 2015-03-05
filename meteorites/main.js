

if (Meteor.isClient) {
  Meteor.startup(function () {
    new WOW().init();
  });


  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    listdb: function() {

      return Listdb.find({});
    }
  });

  Template.body.events({
    //View a member
    "click .viewOverlay": function(e) {
      $('#overlay').css('display','block');
      $('.view').css('display','block');

      var d = Blaze.getData(event.target);
      console.log(d);
      var data = Listdb.find({_id:d._id}).fetch();
      console.log(data);

    }, 
    
    // View a member - closing
    "click .closeView": function(e) {
        $('#overlay').css('display','none');
        $('.view').css('display','none');
    },

    // Add a new member
    "click .createOverlay": function(e) {
        $('#overlay').css('display','block');
        $('.create').css('display','block');
    },

    // Add a new member - closing
    "click .closeCreate": function(e) {
        $('#overlay').css('display','none');
        $('.create').css('display','none');
    },

    // Edit a member 
    "click .editOverlay": function( e ) {
         $('.view').css('display','none');
         $('.edit').css('display','block');

    },

    // Edit a member - pencil - closing
    "click .closeEdit": function( e ) {
        $('.edit').css('display','none');
        $('#overlay').css('display','none');
    },
    
    "submit .new-member": function(e) {
      e.preventDefault();

      var firstname = $('#firstName').val();
      var lastname = $('#lastName').val();
      var email = $('#email').val();
      var priorWork = $('#priorWork').val();
      var aspirations = $('#aspirations').val();
      var skills = $('#skills').val();
      var twitter = $('#twitter').val();
      var linkIn = $('#linkIn').val();
      var faceBook = $('#faceBook').val();

      Listdb.insert({
        name: {
          firstName:firstname,
          lastName: lastname
        },
        email:email,
        priorWork:priorWork,
        aspirations: aspirations,
        skills: skills,
        contact: {
          twitter:twitter,
          linkIn:linkIn,
          faceBook:facebook
        }
      });

      $('#firstName').val("");
      $('#lastName').val("");
      $('#email').val("");
      $('#priorWork').val("");
      $('#aspirations').val("");
      $('#skills').val("");
      $('#twitter').val("");
      $('#linkIn').val("");
      $('#faceBook').val("");

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
