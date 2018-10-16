pragma solidity ^0.4.24;

contract BSACourse {
  string public name;
  uint public credits;
  address public university;
  bool public ended;
  mapping(address => bool) attendants;
  mapping(address => bool) public recipients;
  
  constructor(string _name, uint _credits) public {
    university = msg.sender;
    name = _name;
    credits = _credits;
  }
  
  modifier onlyUniversity() {
    require(msg.sender == university);
    _;
  }
  
  modifier stillOpen() {
    require(!ended);
    _;
  }
  
  function enroll() public stillOpen() {
    attendants[msg.sender] = true;
  }
  
  function pass(address student) public onlyUniversity() stillOpen() {
    require(attendants[student]);
    recipients[student] = true;
  }
  
  function close() public onlyUniversity() stillOpen() {
    ended = true;
  }
}
