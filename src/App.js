import React, { useState } from 'react';
import Avatar from './avatar.png';


function App() {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    
  fetch(`https://api.github.com/users/${search}`)
    .then(response => response.json())
    .then(userResponse => setUserData(userResponse));
  }
  

  const handleChange = (event) => {
  
    setSearch(event.target.value)
  }
  return (
   <div className = "container  text-center">
     <h1 className = "py-5 text-uppercase text-primary">Encontre um perfil no GitHub</h1>
     <form onSubmit = {handleSubmit}>
       <div className = "form-group">
         <label>Digite o usuário do github</label>
         <div className="input-group">
          <input 
          type = "text" className = "form-control" required
          value = {search}
          onChange = {handleChange}
          
          
          />
          
          <span className = "input-group-btn">
            <button type = "submit" className = "btn btn-success">
              Procurar
            </button>
          </span>
         </div>
       </div>
     </form>
     <div className = "py-5">
      {!userData && (
      <img src = {Avatar} height = "200px" className = "responsive rounded-circle" alt = "avatar" />
      )}
      {userData && (
        <div>
          <a href = {userData.html_url} target = "_blank"><img src = {userData.avatar_url} height = "200px" className = "responsive rounded-circle" alt = "avatar" /> </a>
          <h1 className = "pt-3">
            <a href = {userData.html_url} target = "_blank" >{userData.name}</a>
          </h1>
          <h3>{userData.location}</h3>
          {userData.bio != undefined && (
            <p>
              Bio:
              
              <p className = "text-info">
                {userData.bio}
              </p>
            </p>
          )}
          <span >Seguidores: {userData.followers}</span>
          <span className = "ml-4">Seguindo: {userData.following}</span>
          <p className = "pt-1"></p>
          <p>Repositórios públicos: {userData.public_repos}</p>
        </div>
      )}
      
     </div>
   </div>
  );
}

export default App;
