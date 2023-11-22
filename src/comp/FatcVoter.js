import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

function FetchVoters({ contract }) {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchVoters = async () => {
      const voterInfo = await contract.getVoter();
      setVoters(voterInfo);
    };

    contract && fetchVoters();
  }, [contract]);

  return (
    <Container>
      <div className="mt-4">
        <h3 className="text-dark">Voters Information</h3>
        <Table striped bordered className="mb-3">
          <thead>
            <tr>
              <th className="p-3">Voter Name</th>
              <th className="p-3">Voter Address</th>
              <th className="p-3">Voted To</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter.voterAddress}>
                <td className="p-3">{voter.name}</td>
                <td className="p-3">{voter.voterAddress}</td>
                <td className="p-3">{voter._CandidateAddress}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default FetchVoters;
