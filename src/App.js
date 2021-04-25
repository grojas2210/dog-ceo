import DogCeo from "./components/DogCeo/DogCeo";
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core/styles'


function App() {

  const theme = createMuiTheme()
 
  return (
      <ThemeProvider theme={theme}>
        <DogCeo/>
      </ThemeProvider>      
  );
}

export default App;
