import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles'
import DogCeo from './presentation/UI/DogCeo/DogCeo';


function App() {

  const theme = createMuiTheme()
 
  return (
      <ThemeProvider theme={theme}>
        <DogCeo/>
      </ThemeProvider>      
  );
}

export default App;
