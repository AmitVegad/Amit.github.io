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



function signOut(){
    firebase.auth().signOut();
    console.log("signOut");
    window.location.replace("../index.html");
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
      getUserData(user.uid);
      getupload(user.uid);
  }
})

function getUserData(uid) {
    firebase.database().ref('users/' + uid).once("value", snap => {
        let Data = snap.val();
        let heading = document.getElementById('nav_head');
        heading.innerHTML = "Hi " + Data.name;
    })
}
function getupload(uid){
    firebase.storage().ref().child(uid).getDownloadURL()
  .then((url) => {
    var image = document.getElementById("nav_img");
    image.src = url;
  })
  .catch((error) => {
    switch (error.code) {
      case 'storage/object-not-found':
        break;
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
    }
  });
  }