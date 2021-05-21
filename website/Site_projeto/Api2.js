// Docs: https://source.corp.google.com/piper///depot/google3/third_party/devsite/firebase/en/docs/auth/web/google-signin.md

function googleProvider() {
  // [START auth_google_provider_create]
  var gprovider = new firebase.auth.GoogleAuthProvider();

  // [START auth_google_provider_scopes]
  gprovider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // [END auth_google_provider_scopes]
  
  // [START auth_google_provider_params]
  gprovider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  // [END auth_google_provider_params]
  return gprovider;   
}

function onSignIn(googleUser) {  
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);

      // Sign in with credential from the Google user.
      // [START auth_google_signin_credential]
      firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      // [END auth_google_signin_credential]
      // window.location.href = "./Formpage.html";
    } else {
      console.log('User already signed-in Firebase.');
    }    
    document.getElementById("Formdis").style.display = 'inline';
    document.getElementById("Formdis").style.visibility = 'visible';
  });
}
// [END auth_google_callback]

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}