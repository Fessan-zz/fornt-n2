function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);







  reader.onload = function() {

    const textJson = reader.result;
    // htmlBuilder(textJson);
    const textToJson = JSON.parse(textJson);
    
    console.log(htmlBuilder(textToJson));

  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}


const htmlBuilder = (obj) => {
  const { name, fields, references, buttons} = obj;
//console.log(fields, 'fields', references, 'references', buttons, 'buttons');
  let strResult = "";
  strResult += `<h1>${name}</h1><br>`;
  //console.log(fields.length);
  if(fields) {
    fields.forEach(({ label, input}) => {
      strResult += `<label> ${label} </label><br>`;
      const entries = Object.entries(input);
      strResult += `<input type=\"${entries[0][1]}\" ${entries[1][0]} placeholder =\"${entries[2][1]}\"</input><br>`
    })
  }
  if(references){
    //console.log(references);
    references.forEach(({ text, ref }) => {
      strResult += `<a href=\"${ref}\">${text}</a><br>`;
    })
  }

  if(buttons) {
    buttons.forEach(({ text }) => {
      strResult += `<button>${text}</button>`
    })
  }
  //console.log(strResult);

  return strResult;
}


