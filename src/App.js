import React, { useState } from 'react';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm(props) {

  const contacto = {
    userFirstname: '',
    userLastname: '',
    userPhone: ''
  }

  const [user, setUser] = useState(contacto);

  const handleSubmit = (e) =>{
   e.preventDefault();
   if(!user.userFirstname || !user.userLastname || !user.userPhone){ return;}
   props.addUsuario(user);
   setUser(contacto);
  }

 const handleChange = (e) =>{
   e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
 }

  return (
    <form onSubmit={e => { handleSubmit(e) }} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        onChange={handleChange}
        type='text'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        onChange={handleChange}
        type='text' 
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        onChange={handleChange}
        type='text'
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable(props) {
  const ordenada = props.users.sort((a,b)=>a.userLastname.localeCompare(b.userLastname));

  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
      {ordenada.map((usuario, index)=>{
          return (
            <tr key={index}>
              <td>{usuario.userFirstname}</td>
              <td>{usuario.userLastname}</td>
              <td>{usuario.userPhone}</td>
            </tr>
          )}
      )}
      </tbody>
    </table>
  );
}

function App(props) {
  const usrlist = []
  const [listUser, setlistUsers]= useState(usrlist);

  console.log(listUser)

  const addUsuario = (user) =>{
    setlistUsers([...listUser,user]);
  }

  return (
    <section>
      <PhoneBookForm addUsuario={addUsuario}/>
      <InformationTable users={listUser}/>
    </section>
  );
}

export default App;