var firebaseConfig = {
  apiKey: "AIzaSyBqOYBORWlGuWNVuT-vVIullWbBGWxIOGY",
  authDomain: "newpew-abcb4.firebaseapp.com",
  databaseURL: "https://newpew-abcb4.firebaseio.com",
  projectId: "newpew-abcb4",
  storageBucket: "newpew-abcb4.appspot.com",
  messagingSenderId: "949329081940",
  appId: "1:949329081940:web:e65641ae4284c415addfc1",
  measurementId: "G-T98V7TFQ2J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot) {
       childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;

        //start code
        //getting the datafrom the database

        console.log(message_data);
        
        name = message_data['name']; //keyfolder was name
        message = message_data['message']; //keyfolder was message
        like = message_data['like']; //keyfolder was like
        row = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>" + message + "</h4><button class='btn btn-warning' id='" + firebase_message_id + "' value='" ;
        document.getElementById("output").innerHTML += row;


        //end code
      }
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}
