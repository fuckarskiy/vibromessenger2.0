let userId, username;

// ===== AUTH STEP1 =====
document.getElementById("next1").onclick = async()=>{
  let name=document.getElementById("username").value;
  let res=await fetch("/register_step1",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:name})});
  let data=await res.json();
  localStorage.setItem("temp_username",name);
  document.getElementById("step1").style.display="none";
  document.getElementById("step2").style.display="block";
};

// ===== AUTH STEP2 =====
document.getElementById("next2").onclick = async()=>{
  let name=localStorage.getItem("temp_username");
  let pwd=document.getElementById("password").value;
  // Регистрируем нового или логиним
  let res=await fetch("/register_step2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:name,password:pwd})});
  if(res.ok){showMain(name);}
  else{
    res=await fetch("/login_step2",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:name,password:pwd})});
    if(res.ok){showMain(name);}
    else alert("Ошибка регистрации/логина");}
};

// ===== SHOW MAIN =====
function showMain(name){
  document.getElementById("auth").style.display="none";
  document.getElementById("main").style.display="flex";
  username=name;
  loadUsers();
}

// ===== LOAD USERS =====
async function loadUsers(){
  let res=await fetch("/search?q=");
  let users=await res.json();
  let ul=document.getElementById("users-list"); ul.innerHTML="";
  users.forEach(u=>{let b=document.createElement("button");b.textContent=u.username;ul.appendChild(b);});
}

// ===== SEND MESSAGE =====
document.getElementById("send-msg").onclick=async()=>{
  let msg=document.getElementById("msg-input").value;
  if(!msg) return;
  await fetch("/dm/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:userId,to:userId,msg:msg})});
  document.getElementById("messages").innerHTML+="<div>"+msg+"</div>";
  document.getElementById("msg-input").value="";
}

// ===== PROFILE =====
document.getElementById("profile-btn").onclick=()=>{document.getElementById("profile").style.display="block";}
document.getElementById("save-profile").onclick=async()=>{
  let uname=document.getElementById("profile-username").value;
  let avatar=document.getElementById("profile-avatar").value;
  await fetch("/profile/update",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:userId,username:uname,avatar:avatar})});
  document.getElementById("profile").style.display="none";
}
