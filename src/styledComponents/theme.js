export const theme = (mode = 'default') => {
    let theme =  {
        primary : "white",
        text : 'black'
      }
      if(mode === 'dark'){
          theme = {...theme, primary : "black", text : 'white'}
      }
      if(mode === 'other1'){
        theme = {...theme, primary : "#264653", text : '#2a9d8f'}
      }
      if(mode === 'other2'){
        theme = {...theme, primary : "#6d6875", text : '#ffcdb2'}
      }
      if(mode === 'other3'){
        theme = {...theme, primary : "#e63946", text : '#a8dadc'}
      }
      if(mode === 'other4'){
        theme = {...theme, primary : "#03071e", text : '#ffba08'}
      }
      if(mode === 'other5'){
        theme = {...theme, primary : "#774936", text : '#edc4b3'}
      }
      if(mode === 'other6'){
        theme = {...theme, primary : "#ade8f4", text : '#03045e'}
      }
      if(mode === 'other7'){
        theme = {...theme, primary : "#ced4da", text : '#212529'}
      }
      if(mode === 'other8'){
        theme = {...theme, primary : "#ffdab9", text : '#f08080'}
      }
      return theme
}