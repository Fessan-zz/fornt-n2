function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);



  reader.onload = function () {

    const textJson = reader.result;

    const textToJson = JSON.parse(textJson);

    htmlBuilder(textToJson);

  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

const htmlBuilder = (obj) => {
  const { name, fields, references, buttons } = obj;
  let str = "";
  str += `<h1>${name}</h1><br>`;

  const fieldStr = fieldHtml(fields);
  str += fieldStr;


  let formResult = document.createElement('form');
  formResult.innerHTML = str;
  const form = document.querySelector('div');
  form.appendChild(formResult);

  

};


const fieldHtml = (fields) => {
 let str = "";

 fields.forEach(({ label, input}) => {
  

  if (label) {
    str += `<label>${label}</label><br>`;
  }

  if(input) {
    const entries = Object.entries(input);
    entries.forEach(([ firstItem, lastItem ]) => {

      if (firstItem === 'type' && lastItem === 'color'){
        str += `<input  type=\"color\"`;
        
      }else if (firstItem === 'colors' && typeof lastItem == 'object'){
          str += `list=\"color\">`;
          str += `<datalist id=\"color\">`;
          lastItem.forEach((item) => {
            str += `<option value=\"${item}\">`;
          })
          str += `</datalist>`;
       } 

       if (firstItem === 'type' && lastItem === 'checkbox') {
         str+= `<input type=\"checkbox\">`;
        
       }
        
    })
  }
 })
 console.log(str);
 return str;
}




// const htmlBuilder = (obj) => {
//   const { name, fields, references, buttons} = obj;
// //console.log(fields, 'fields', references, 'references', buttons, 'buttons');
//   let strResult = "";
//   strResult += `<h1>${name}</h1><br>`;


//   //console.log(fields.length);
//   if(fields) {
//     fields.forEach(({ label, input }) => {
//       if (label){
//         strResult += `<label>${label}</label>`;
//       }
//       const entries = Object.entries(input);
//       strResult += `<input`;
//       //console.log(entries);
//       const [firstItem, lastItem] = entries;
//       //console.log(firstItem,'!!!!!', lastItem);
//       entries.forEach(([ firstItem, lastItem ]) =>{
//         //console.log(firstItem,'!!!!!', lastItem);
//         if(firstItem === 'required' && lastItem === true){
//           strResult += ` required`;
//         }
//         if (firstItem !== 'required'){
//           strResult += ` ${firstItem}=\"${lastItem}\"`
//         }
//       })
//       strResult +=` </input><br>`;
//     })

//   if(references){
//     //console.log(references);
//     references.forEach(({ text, ref }) => {
//       strResult += `<a href=\"${ref}\">${text}</a><br>`;
//     })
//   }

//    if(buttons) {
//     buttons.forEach(({ text }) => {
//       strResult += `<button>${text}</button>`
//     })
//   }

//   //console.log(strResult);

//   return strResult;
// }

// }