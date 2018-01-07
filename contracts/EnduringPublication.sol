pragma solidity ^0.4.18;


import {SafeMath} from './math/SafeMath.sol';
import {Ownable} from './ownership/Ownable.sol';


contract EnduringPublication is Ownable {
  using SafeMath for uint;

  event PublishData(address indexed _publisher, bytes32 _text, uint256 _messagePartNumber);

  function EnduringPublication() public
  {

  }

  function publish(bytes32[] _text) public
  {
    for(uint256 i = 0; i < _text.length; i++)
    {
      for(uint256 j = 0; j < 32; j++)            // Validate anscii
      {
        uint8 c = uint8(_text[i][j]);            // Convert to uint8
        require(32 <= c);                        // Greater than space
        require(c <= 122);                       // Less than z
      }
      PublishData(msg.sender, _text[i], i);
    }
  }

  function() public
  {
    revert();
  }

  function destroy() public
  onlyOwner
  {
    selfdestruct(owner);
  }
}
