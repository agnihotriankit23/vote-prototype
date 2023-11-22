import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

function FetchCandidates({ contract }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidateInfo = await contract.getCandidate();
      setCandidates(candidateInfo);
    };

    contract && fetchCandidates();
  }, [contract]);

  return (
    <Container>
      <div className="mt-4">
        <h3 className="text-dark">Candidates</h3>
        {candidates.map((candidate) => (
          <Row key={candidate._CandidateAddress} className="mb-3">
            <Col>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td className="p-3">Candidate Name:</td>
                    <td className="p-3">{candidate.name}</td>
                  </tr>
                  <tr>
                    <td className="p-3">Candidate Address:</td>
                    <td className="p-3">{candidate._CandidateAddress}</td>
                  </tr>
                  <tr>
                    <td className="p-3">Votes Received:</td>
                    <td className="p-3">{candidate.vote.toString()}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default FetchCandidates;
