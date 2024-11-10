import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  const [currentUser, setCurrentUser] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    searchGithub().then((data) => {
      setUsers(data);
      searchUser(data[0].login);
    });
  }, []);

  const searchUser= async (username: string) => {
    const user = await searchGithubUser(username);
    setCurrentUser(user);
  }

  const nextUser = () => {
    setCurrentIndex((prev) => (prev + 1) % users.length);
    searchUser(users[currentIndex].login);
  }

  const saveUserToLocalStorage = () => {
    if (currentUser) {
      const savedUsers = JSON.parse(localStorage.getItem('candidates') || '[]');
      savedUsers.push(currentUser);
      localStorage.setItem('candidates', JSON.stringify(savedUsers));
      nextUser();
    }
  }

  return (
    <div>
      <h1>Candidate Search</h1>
      <div className='card'>
        <div className='card-content'>
          <img src={currentUser?.avatar_url} alt={currentUser?.login} />
          <div className='card-info'>
          <h2>{currentUser?.login}</h2>
          <p>Location: {currentUser?.location}</p>
          <p>Email: <a href={`mailto:${currentUser?.email}`}>{currentUser?.email}</a></p>
          <p>Company: {currentUser?.company}</p>
          <p>Bio: {currentUser?.bio}</p>
          </div>
        </div>
        <div className='card-btns'>
          <button className='reject-btn' onClick={nextUser}>-</button>
          <button className='save-btn' onClick={saveUserToLocalStorage}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
