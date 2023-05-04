import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log("local : ", storedUser);
      setUser(storedUser.result)

    }
  }, []);


  return (
    <div>
      <h5>Home page</h5>
      {user ? (
        <div>
          <p>Welcome {user.name}!</p>
          <button onClick={() => {
            localStorage.removeItem('user');
            setUser(null);
          }}>Logout</button>
        </div>
      ) : (
        <h6></h6>
      )}

      {/* {user?.map((value) =>
      (
        <div>
          <p>Welcome {user.name}!</p>
          <button onClick={() => {
            localStorage.removeItem('user');
            setUser(null);
          }}>Logout</button>
        </div>
      ))
      } */}
    </div>
  );
};

export default Home;



// setFile(img.src.replace('data:image/png;base64,', ''))


