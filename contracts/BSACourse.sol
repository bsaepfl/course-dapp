pragma solidity ^0.4.24;

contract BSACourse {
  string public name;
  uint public credits;
  address public university;
  
  uint public numberOfAttendants;
  uint public numberOfRecipients;
  mapping(address => bool) public attendants;
  mapping(address => bool) public recipients;
  
  /* #n3
  bool public ended;
  */
  
  constructor(string _name, uint _credits) public {
    university = msg.sender;
    name = _name;
    credits = _credits;
  }
  
  modifier onlyUniversity() {
    require(msg.sender == university);
    _;
  }
  
  /* #n3
  modifier stillOpen() {
    require(!ended);
    _;
  }
  */
  
  function enroll() public 
  // #n3 stillOpen()
  {
    require(!attendants[msg.sender]);
    attendants[msg.sender] = true;
    numberOfAttendants++;
  }
  
  function pass(address student) public onlyUniversity()
  // #n3 stillOpen()
  {
    require(attendants[student]);
    recipients[student] = true;
    numberOfRecipients++;
  }
  
  /* #n3
  function close() public onlyUniversity() stillOpen() {
    ended = true;
  }
  */
}
