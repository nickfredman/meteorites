
 
if (Meteor.isClient) {
  Meteor.startup(function () {
    new WOW().init();
  });


  // counter starts at 0
  Session.setDefault('counter', 0);

  // get data from database and 
  // display on the index.html
  Template.body.helpers({
    listdb: function() {
      return Listdb.find({});
    }
  });

  // get specific person ID
  Template.viewModal.helpers({
    viewamember: function() {
      var memberId = Session.get('selectedMember');
      return Listdb.find({_id:memberId}).fetch();
    }
  });

  // collect individual data based on selected person
  Template.body.events({
    //View a member
    "click .viewOverlay": function(e) {
      $('#overlay').css('display','block');
      $('.view').css('display','block');
      var d = Blaze.getData(event.target);
      Session.set('selectedMember', d._id); 
    }, 
    
    // View a member - closing
    "click .closeView": function(e) {
      $('#overlay').css('display','none');
      $('.view').css('display','none');
    },

    //Add a new member - initial form display
    "click .createOverlay": function(e) {
      $('#overlay').css('display','block');
      $('.create').css('display','block');
    },

      // Add a new member - trigger is submit button
      "click .createBtn": function(e) {
      e.preventDefault();
      $('#overlay').css('display','none');
      $('.create').css('display','none');

        // get new member data from form
      var firstname = $('#firstName').val();
      var lastname = $('#lastName').val();
      var email = $('#email').val();
      var priorWork = $('#priorWork').val();
      var aspirations = $('#aspirations').val();
      var skills = $('#skills').val();
      var twitter = $('#twitter').val();
      var linkIn = $('#linkIn').val();
      var faceBook = $('#faceBook').val();
        // add newmember data to db
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
          faceBook:faceBook
        }
      });      
    },
      // Add a new member - close the form via X
      "click .closeCreate": function(e) {
      e.preventDefault();
      $('#overlay').css('display','none');
      $('.create').css('display','none');
    },

    // Edit a member 
    "click .editOverlay": function(e) {
      $('.view').css('display','none');
      $('.edit').css('display','block');

      var memberId = Session.get('selectedMember');
      var data = Listdb.findOne({_id:memberId});
        // update display on page with new form data
      $('#editfirstName').val(data.name.firstName);
      $('#editlastName').val(data.name.lastName);
      $('#editemail').val(data.email);
      $('#editpriorWork').val(data.priorWork);
      $('#editaspirations').val(data.aspirations);
      $('#editskills').val(data.skills);
      $('#edittwitter').val(data.twitter);
      $('#editlinkIn').val(data.linkIn);
      $('#editfaceBook').val(data.faceBook);
    },

    // submit edited data to db using submit button
      // get edited values from form
      "click .editBtn": function(e) {
      $('.view').css('display','none');
      $('.edit').css('display','block');
      var memberId = Session.get('selectedMember');
      var firstname = $('#editfirstName').val();
      var lastname = $('#editlastName').val();
      var email = $('#editemail').val();
      var priorWork = $('#editpriorWork').val();
      var aspirations = $('#editaspirations').val();
      var skills = $('#editskills').val();
      var twitter = $('#edittwitter').val();
      var linkIn = $('#editlinkIn').val();
      var faceBook = $('#editfaceBook').val();

      // do the actual db update with edited form data
      Listdb.update(memberId,
          {$set: {
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
              faceBook:faceBook
          }
        }
      }); 
    },

    // Edit a member - pencil - closing
    "click .closeEdit": function( e ) {
      $('.edit').css('display','none');
      $('#overlay').css('display','none');
    },
    
    // "submit .new-member": function(e) {
    //   e.preventDefault();

    //   var firstname = $('#firstName').val();
    //   var lastname = $('#lastName').val();
    //   var email = $('#email').val();
    //   var priorWork = $('#priorWork').val();
    //   var aspirations = $('#aspirations').val();
    //   var skills = $('#skills').val();
    //   var twitter = $('#twitter').val();
    //   var linkIn = $('#linkIn').val();
    //   var faceBook = $('#faceBook').val();

    //   Listdb.insert({
    //     name: {
    //       firstName:firstname,
    //       lastName: lastname
    //     },
    //     email:email,
    //     priorWork:priorWork,
    //     aspirations: aspirations,
    //     skills: skills,
    //     contact: {
    //       twitter:twitter,
    //       linkIn:linkIn,
    //       faceBook:facebook
    //     }
    //   });

    //   $('#firstName').val("");
    //   $('#lastName').val("");
    //   $('#email').val("");
    //   $('#priorWork').val("");
    //   $('#aspirations').val("");
    //   $('#skills').val("");
    //   $('#twitter').val("");
    //   $('#linkIn').val("");
    //   $('#faceBook').val("");

    // },

    // delete selected person
    "click .delete": function(e) {
      e.preventDefault();
      var d = Blaze.getData(event.target);
      Listdb.remove({_id:d._id});
    }

  });
}
 // server side
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
