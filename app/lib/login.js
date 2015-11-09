AccountsTemplates.configure({
  negativeValidation: false,
  negativeFeedback: false,
  positiveValidation: false,
  positiveFeedback: false,
    texts: {
        navSignIn: "signIn",
        navSignOut: "signOut",
        optionalField: "optional",
        pwdLink_pre: "",
        pwdLink_link: "Glemt passord?",
        pwdLink_suff: "",
        resendVerificationEmailLink_pre: "Verification email lost?",
        resendVerificationEmailLink_link: "Send again",
        resendVerificationEmailLink_suff: "",
        sep: "OR",
        signInLink_pre: "ifYouAlreadyHaveAnAccount",
        signInLink_link: "signin",  
        signInLink_suff: "",
        signUpLink_pre: "dontHaveAnAccount",
        signUpLink_link: "signUp",
        signUpLink_suff: "",
        socialAdd: "add",
        socialConfigure: "configure",
        socialIcons: {
            "meteor-developer": "fa fa-rocket",
        },
        socialRemove: "remove",
        socialSignIn: "signIn",
        socialSignUp: "signUp",
        socialWith: "with",
        termsPreamble: "clickAgree",
        termsPrivacy: "privacyPolicy",
        termsAnd: "and",
        termsTerms: "terms",
        button: {
          changePwd: "Endre passord",
          forgotPwd: "Glemt passord?",
          resetPwd: "Reset Pwd Text",
          signIn: "Logg inn",
        },
        title: {
            changePwd: "Password Title",
            enrollAccount: "Enroll Title",
            forgotPwd: "Forgot Pwd Title",
            resetPwd: "Reset Pwd Title",
            signIn: "",
            signUp: "Sign Up Title",
            verifyEmail: "Verify Email Title",
      }
    }
});

var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn") {
      // Successfully logged in
      // ...
    }
  }
};

AccountsTemplates.configure({
    onSubmitHook: mySubmitFunc
});

AccountsTemplates.configure({    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: true,
    overrideLoginErrors: true,
    sendVerificationEmail: false,
    lowercaseUsername: true,

    // Appearance
    showAddRemoveServices: false,
    // Email field required for this to work
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true,

    // Redirects
    homeRoutePath: '/',
    redirectTimeout: 4000,

    // Hooks
    //onLogoutHook: myLogoutFunc,
    onSubmitHook: mySubmitFunc,

    // Texts
    texts: {
      title: {
          forgotPwd: "Glemt passord?"
      }
    }
});
/*var pwd =*/ AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "brukernavn",
      placeholder: "brukernavn",
      required: true,
      minLength: 5,
  },
  //pwd
  {
    _id: 'password',
    type: 'password',
    displayName: "passord",
    placeholder: 'passord',
    required: true,
  }
]);

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('forgotPwd');
//AccountsTemplates.configureRoute('enrollAccount');
//AccountsTemplates.configureRoute('signIn');
//AccountsTemplates.configureRoute('signUp');
//AccountsTemplates.configureRoute('verifyEmail');