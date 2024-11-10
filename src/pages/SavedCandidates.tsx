import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("candidates") || "[]");
    setCandidates(savedCandidates);
  }, []);

  function removeCandidate(index: number) {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
    localStorage.setItem("candidates", JSON.stringify(newCandidates));
  }

  if (candidates.length === 0) {
    return <h1>No candidates saved</h1>;
  }

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>
                <img src={candidate.avatar_url} alt={candidate.login} />
              </td>
              <td>{candidate.name} ({candidate.login})</td>
              <td>{candidate.location}</td>
              <td><a href={`mailto:${candidate.email}`}>{candidate.email}</a></td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
              <td>
                <button className="reject-btn" onClick={() => removeCandidate(index)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
