import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import DogCeoProvider from "./context/DogCeoProvider";
import DogCeo from "./presentacion/UI/DogCeo/DogCeo";

function App() {
  const theme = createMuiTheme();

  return (
    <DogCeoProvider>
      <ThemeProvider theme={theme}>
        <DogCeo />
      </ThemeProvider>
    </DogCeoProvider>
  );
}

export default App;
