//SPDX-License-Identifier:MIT
pragma solidity ^0.8.18;

error _CandidateAlreadyExists();
error _AlreadyVoted();

contract BlockchainVoting {
    address Manager;
    uint256 TotalCandidates;
    uint256 TotalVoters;

    constructor() {
        Manager = msg.sender;
    }

    struct voter {
        uint256 Id;
        string name;
        address voterAddress;
        address candidateAddress;
    }

    struct Candidate {
        string name;
        address candidateAddress;
        uint vote;
    }

    struct proposal {
        string name;
        address candidateAddress;
    }

    voter[] voters;
    Candidate[] Candidates;
    proposal[] proposals;

    function SetCandidate(
        address _Address,
        string memory _name
    ) external OnlyManager {
        for (uint256 i = 0; i < Candidates.length; i++) {
            if (Candidates[i].candidateAddress == _Address) {
                revert _CandidateAlreadyExists();
            } else {}
        }
        Candidates.push(Candidate(_name, _Address, 0));
        TotalCandidates++;
    }

    function SetVote(
        uint256 _Id,
        string memory _name,
        address _voterAddress,
        address candidateAddress
    ) external {
        require(
            Candidates.length >= 2,
            "Candidate  greater then 2 or Must Be 2 "
        );
        for (uint256 i = 0; i < voters.length; i++) {
            if (
                voters[i].Id == _Id && voters[i].voterAddress == _voterAddress
            ) {
                revert _AlreadyVoted();
            }
        }


        for (uint i; i < Candidates.length; i++) {
            if (Candidates[i].candidateAddress == candidateAddress) {
                Candidates[i].vote++;
                voters.push(
                    voter(_Id, _name, _voterAddress, candidateAddress)
                );
                TotalVoters++;
            }
        }
    }

    function RequestForNextVoting(
        address _requestAddress,
        string memory _name
    ) external {
        proposals.push(proposal(_name, _requestAddress));
    }

    function getRequestProposal() external view returns (proposal[] memory) {
        return proposals;
    }

    function getCandidate() external view returns (Candidate[] memory) {
        return Candidates;
    }

    function getVoter() external view returns (voter[] memory) {
        return voters;
    }

    modifier OnlyManager() {
        require(msg.sender == Manager);
        _;
    }
}
