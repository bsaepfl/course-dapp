pragma solidity ^0.4.24;

contract BSACourse {
  string public name;
  uint public credits;
  address public university;
  bool public ended;
  uint public numberOfAttendants;
  uint public numberOfRecipients;
  mapping(address => bool) public attendants;
  mapping(address => bool) public recipients;
  
  event StudentEnrolled(address student);
  
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
    require(!attendants[msg.sender]);
    attendants[msg.sender] = true;
    numberOfAttendants++;
    emit StudentEnrolled(msg.sender);
  }
  
  function pass(address student) public onlyUniversity() stillOpen() {
    require(attendants[student]);
    recipients[student] = true;
    numberOfRecipients++;
  }
  
  function close() public onlyUniversity() stillOpen() {
    ended = true;
  }
}
