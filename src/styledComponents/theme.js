export const theme = (mode = 'default') => {
    let theme =  {
        main: "palevioletred",
        primary : "cyan"
      }
      if(mode === 'dark'){
          theme = {...theme, primary : "black"}
      }
      return theme
}