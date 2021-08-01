var firebaseConfig = {
  apiKey: "AIzaSyD5XdCly96Qx2E59oW3p1inBjwhNrgNgWg",
  authDomain: "portfolio-1bc2a.firebaseapp.com",
  databaseURL: "https://portfolio-1bc2a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-1bc2a",
  storageBucket: "portfolio-1bc2a.appspot.com",
  messagingSenderId: "514159859598",
  appId: "1:514159859598:web:460a04cc236a60e5cfb6df",
  measurementId: "G-XG3VGSYD92"
};

firebase.initializeApp(firebaseConfig);

let login=  document.getElementById('login');
let register =   document.getElementById('register');
register.style.display = 'none';

function CreateAcc(){
  login.style.display = "none";
  register.style.display = "block";
  
}
function loginAcc(){
    login.style.display = "block";
    register.style.display = "none";
}

let wrongpass = document.getElementById('wrongPass');
let wrongemail = document.getElementById('wrongEmail');
wrongpass.style.display = "none";
wrongemail.style.display = "none";

let sign_name = document.getElementById('name');
let sign_email = document.getElementById('email');
let sign_phone = document.getElementById('phone');
let sign_password = document.getElementById('password');
let sign_password2 = document.getElementById('password2') ;

let sign_file = document.querySelector('#imageUpload');

let sign_labemail = document.getElementById('sign_labemail');
let sign_labpassword = document.getElementById('sign_labpassword');
let sign_labname = document.getElementById('sign_labname');
let sign_labphone = document.getElementById('sign_labphone');
let sign_labpassword2 = document.getElementById('sign_labpassword2');

function signupValidation(){
  let isvalidate = true;
  let _email = sign_email.value;
  let lastAtPos = _email.lastIndexOf('@');
  let lastDotPos = _email.lastIndexOf('.');

  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && _email.indexOf('@@') == -1 && lastDotPos > 2 && (_email.length - lastDotPos) > 2)) {
      isvalidate = false;
      sign_email.classList.add("error");
      sign_labemail.classList.add("error_lab");
  }
  let pass_Reg =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if(!pass_Reg.test(sign_password.value)){
    isvalidate = false;
    sign_password.classList.add("error");
    sign_labpassword.classList.add("error_lab");
  }
  if(sign_password.value != sign_password2.value){
    isvalidate = false;
    sign_password2.classList.add("error");
    sign_labpassword2.classList.add("error_lab");
  }
  let phone_Reg = /^(?=.*\d).{10,10}$/;
  if(!phone_Reg.test(sign_phone.value)){
    isvalidate = false;
    sign_phone.classList.add("error");
    sign_labphone.classList.add("error_lab");
  }
  if(sign_name.value == ""){
    isvalidate = false;
    sign_name.classList.add("error");
    sign_labname.classList.add("error_lab");
  }

  return isvalidate;
}

function makeSignDefault(){
  wrongpass.style.display = "none";
  wrongemail.style.display = "none";
  if(sign_name.value != ""){
    sign_name.classList.remove("error");
    sign_labname.classList.remove("error_lab");
  }
  if(sign_phone.value != ""){
    sign_phone.classList.remove("error");
    sign_labphone.classList.remove("error_lab");
  }
  if(sign_password.value != ""){
    sign_password.classList.remove("error");
    sign_labpassword.classList.remove("error_lab");
  }
  if(sign_password2.value != ""){
    sign_password2.classList.remove("error");
    sign_labpassword2.classList.remove("error_lab");
  }
  if(sign_email.value != ""){
    sign_email.classList.remove("error");
    sign_labemail.classList.remove("error_lab");
  }
}

function signUp(){
  let name = sign_name.value;
  let email = sign_email.value;
  let phone = sign_phone.value; ;
  let password = sign_password.value;
  const file = sign_file.files[0];

  if(signupValidation()){
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        var _user = {
          name: name,
          phone:phone ,
          uid: user.uid,
          email: user.email,
          password: password
      }
      firebase.database().ref('users/' + _user.uid).set(_user).catch(error => {
      });
      firebase.storage().ref().child(user.uid).put(file).then((snapshot) => {

      });
      login.style.display = "block";
      register.style.display = "none";
    })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  }
}

let email = document.getElementById('login_email');
let password = document.getElementById('login_password');
let labemail = document.getElementById('lab_email');
let labpassword = document.getElementById('lab_password');
function loginValidation(){
  let isvalidate = true;
  if(email.value == ""){
    isvalidate = false;
    email.classList.add("error");
    labemail.classList.add("error_lab")
  }
  if(password.value == ""){
    isvalidate = false;
    password.classList.add("error");
    labpassword.classList.add("error_lab");
  }
  return isvalidate;
}

function Login(){
  
  if(loginValidation()){
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          login.style.display = "none";
          register.style.display = "none";
          window.location.replace("./Cv/Cv.html");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode == "auth/user-not-found"){
              wrongemail.style.display = "block";
            }
            if(errorCode == "auth/wrong-password"){
              wrongpass.style.display = "block";
            }
        });
    }
}
function makeDefault(){
  wrongpass.style.display = "none";
  wrongemail.style.display = "none";
  if(email.value != ""){
    email.classList.remove("error");
    labemail.classList.remove("error_lab");
  }
  if(password.value != ""){
    password.classList.remove("error");
    labpassword.classList.remove("error_lab");
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#imagePreview').css('background-image', 'url('+e.target.result +')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function() {
  readURL(this);
});
