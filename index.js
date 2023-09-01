    const firebaseConfig = {
        apiKey: "AIzaSyC3D8Yr3HH9YgYJrLaTLrE7AfVoUF0G2xU",
        authDomain: "talkative-talk.firebaseapp.com",
        databaseURL: "https://talkative-talk-default-rtdb.firebaseio.com",
        projectId: "talkative-talk",
        storageBucket: "talkative-talk.appspot.com",
        messagingSenderId: "1051849440191",
        appId: "1:1051849440191:web:44a6917b255ce712c8bf0a",
        measurementId: "G-Y6XZGZTSF9"
    };


    firebase.initializeApp(firebaseConfig);

    const db = firebase.database();
    let username = prompt("Enter your username");

    const chatTable = db.ref('chats/')


    function sendMessage() {
        const messageInput = document.getElementById("message-input");
        const message = messageInput.value;
        messageInput.value = "";
        var chatRef = chatTable.push();
        chatRef.set({message:message, username:username})
    }

    document.getElementById("message-input").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default "Enter" behavior (newline)
            sendMessage(); // Call the sendMessage function when "Enter" is pressed
        }
    });
    
    function changeUsername() {
        const newUsername = prompt("Enter your new username");
        if (newUsername !== null && newUsername.trim() !== "") {
            username = newUsername;
        }
    }
    // Attach event listener to the "Change Username" button
    document.getElementById("changeUsernameButton").addEventListener("click", changeUsername);
    
    
        
    


chatTable.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });
  
// Assuming you have a button with id "clearButton" to clear all messages
document.getElementById("clearButton").addEventListener("click", function () {
    // Clear all messages in the database
    chatTable.remove(); // Replace with appropriate method to delete all records
    
    // Clear the messages on the page
    document.getElementById("messages").innerHTML = "";
  });






  
  



