/*SON/2018-11-06 00:29 - DEVELOPMENT

This class is the admins table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the
"UserController" class

*/


const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const UserController = require("../../controllers/menu/UserController.js");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});




router.post("/user_registration", urlencodedParser, function(
  request,
  response
) {

  var date = new Date();
  date.setHours(date.getHours() + 3);
  var jsonObject_ = {
    FirstName: request.body.FirstName,
    MiddleName: request.body.MiddleName,
    Surname: request.body.Surname,
    PhoneNumber: request.body.PhoneNumber,
    Email: request.body.Email,
    GenderId: request.body.GenderId,
    NationalId: request.body.NationalId,
    EncryptedPassword	: request.body.EncryptedPassword	,
    RegisteredDate: date
  };

  var myUserControllerObjectPromise = UserController.insert_users(
    jsonObject_
  );

  myUserControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );
});

router.get("/admin_registration_form", function(req, res) {
  res.sendFile(__dirname + "/" + "AdminRegistration.html");
});

router.get("/admin_login", function(req, res) {
  res.sendFile(__dirname + "/" + "AdminLogin.html");
});

router.post("/user_login", urlencodedParser, function(
  request,
  response
) {
  var jsonObject_ = {
    AttemptedEmail: request.body.AttemptedEmail,
    AttemptedPassword: request.body.AttemptedPassword
  };

  var myUserControllerObjectPromise = UserController.user_login(
    jsonObject_
  );

  myUserControllerObjectPromise.then(
    function(result) {
      response.send(result);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );

});






router.post("/get_all_user", urlencodedParser, function(
  request,
  response
) {
  var myUserControllerObjectPromise = UserController.get_all_admin();

  myUserControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      console.log(err);
      response.send("An error occurred");
    }
  );
});

router.post("/update_user", urlencodedParser, function(
  request,
  response
) {
  var date = new Date();
  date.setHours(date.getHours() + 3);

  var jsonObject_ = {
    FirstName: request.body.FirstName,
    MiddleName: request.body.MiddleName,
    Surname: request.body.Surname,
    PhoneNumber: request.body.PhoneNumber,
    Email: request.body.Email,
    GenderId: request.body.GenderId,
    NationalId: request.body.NationalId,
    EncryptedPassword	: request.body.EncryptedPassword	,
    RegisteredDate: date
  };

  var myUserControllerObjectPromise = UserController.batch_admins_update(
    jsonObject_
  );

  myUserControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post("/get_specific_user", urlencodedParser, function(
  request,
  response
) {
  var mKey = request.body.column_name;
  //var mValue=parseInt(request.query.search_value, 10);
  var mValue = request.body.search_value;

  var myUserControllerObjectPromise = UserController.get_specific_admins(
    mKey,
    mValue
  );

  myUserControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post("/update_individual_user", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.ColumnName;
  var value_ = request.body.ColumnValue;

  var date = new Date();
  date.setHours(date.getHours() + 0);

  var jsonObject_ = {
    FirstName: request.body.FirstName,
    MiddleName: request.body.MiddleName,
    Surname: request.body.Surname,
    PhoneNumber: request.body.PhoneNumber,
    Email: request.body.Email,
    GenderId: request.body.GenderId,
    NationalId: request.body.NationalId,
    EncryptedPassword	: request.body.EncryptedPassword	,
    RegisteredDate: date
  };

  var myUserControllerObjectPromise = UserController.individual_admins_update(
    column_name,
    value_,
    jsonObject_
  );

  myUserControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post("/delete_individual_user", urlencodedParser, function(
  request,
  response
) {
  var column_name = request.body.column_name;
  //var mValue=parseInt(request.body.search_value, 10);
  var value_ = request.body.search_value;

  var myUserControllerObjectPromise = UserController.delete_admins_record(
    column_name,
    value_
  );

  myUserControllerObjectPromise.then(
    function(result) {
      var response_object = { results: result };
      response.send(response_object);
    },
    function(err) {
      response.send("An error occurred");
      console.log(err);
    }
  );
});

router.post(
  "/get_staff_members_with_a_specific_quality",
  urlencodedParser,
  function(request, response) {
    var TableTwo = request.body.TableTwo;

    var JoiningKey = request.body.JoiningKey;

    var SearchColumn = request.body.SearchColumn;

    var SearchValue = request.body.SearchValue;

    var myUserControllerObjectPromise = UserController.get_staff_members_with_a_specific_quality(
      TableTwo,
      JoiningKey,
      SearchColumn,
      SearchValue
    );

    myUserControllerObjectPromise.then(
      function(result) {
        var response_object = { results: result };
        response.send(response_object);
      },
      function(err) {
        response.send("An error occurred");
        console.log(err);
      }
    );
  }
);

module.exports = router;