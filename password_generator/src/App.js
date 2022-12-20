import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import {useState} from 'react';

function App() {
  const [password, setPassword] = useState({
    length: 10,
    uppercase: false,
    numbers: false,
    special_characters: false
  });
  const [handleText, setHandleText] = useState('');
  const [copied, setCopied] = useState(false);
 
const handleChangeNumbers = () => {
  setPassword({
    ...password, numbers: !password.numbers
  });
}

const handleChangeSpecialCharacters = () => {
  setPassword({
    ...password, special_characters: !password.special_characters
  });
}

const handleChangeCaps = () => {
  setPassword({
    ...password, uppercase: !password.uppercase
  });
}

function generatePassword(){
  const validNumbers = [1,2,3,4,5,6,7,8,9,0];
  const specialChar = ['!','@','#','$','%','^','&','*','(',')'];
  const lowercaseLetters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const uppercaseLetters = lowercaseLetters.map(letters => letters.toUpperCase());
  const {length,uppercase, numbers, special_characters} = password;
  const generateTheWord = (length,uppercase, numbers, special_characters) => {
    const availableChar = [
      ...(lowercaseLetters ? lowercaseLetters : []),
      ...(uppercase ? uppercaseLetters : []),
      ...(numbers ? validNumbers : []),
      ...(special_characters ? specialChar : [])
    ];
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
    const characters = shuffleArray(availableChar).slice(0, length);
    setHandleText(characters.join(''));
    return characters;
  }
generateTheWord(length,uppercase, numbers, special_characters);
}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Generator</h1>
      </header>
      <div className='Pcard'>
      <Card sx={{ maxWidth: 500, minWidth: 500 }}>
        <CardContent>
          <Typography variant='h6'>
            Password Generator
          </Typography>
          <div>
            <TextField fullWidth id="outlined-read-only-input" InputProps={{
            readOnly: true,
          }} label="Your Password" value={handleText} onChange={(event) => setHandleText(event.target.value)}>

            </TextField>
            <Button variant='contained' endIcon={<CopyAllIcon />} onClick={() => {
              if(handleText.length > 0){
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                setInterval(() =>{
                  setCopied(false);
                }, 2000);
              }
            }}>
             {copied ? 'Copied!' : 'Copy Text'}
            </Button>
          </div>
          <div className='checkboxPrompt'>
          <p>Include numbers</p>
          <Checkbox value={password.numbers} onChange={handleChangeNumbers}/>
          </div>
          <div className='checkboxPrompt'>
          <p>Include special characters</p>
          <Checkbox value={password.special_characters} onChange={handleChangeSpecialCharacters}/>
          </div>
          <div className='checkboxPrompt'>
          <p>Include capital letters</p>
          <Checkbox value={password.uppercase} onChange={handleChangeCaps}/>
          </div>
          <div>
            <Button variant='contained' endIcon={<LockIcon />} onClick={generatePassword}>
              Generate Password
            </Button>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

export default App;
