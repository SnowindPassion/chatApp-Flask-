import $ from 'jquery';

let failedAuth = function (errors) {
  $(".submit").removeClass("disabled").prop("disabled", false);

  let [usernameErrors, passwordErrors] = [[], []];

  errors.forEach (function (err) {
    switch (err[0]) {
      case "username":
        usernameErrors.push(err[1][0]);
        $(".form-username-input").addClass("invalid");
        break;
      case "password":
        passwordErrors.push(err[1][0]);
        if (!$(".login-form-password-input").hasClass("invalid")) {
          $(".form-password-input").addClass("invalid");
        }
        break;
    }
  });

  return [usernameErrors, passwordErrors];
};

export { failedAuth };
