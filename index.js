function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);
  reader.onload = function () {
    
    const textJson = reader.result;

    const textToJson = JSON.parse(textJson);
      
    htmlBuilder(textToJson);
    $('input[name="mobphone"]').mask('+0 (000) 000 00 00', {placeholder: "+_ (___) ___ __ __"});
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

  const referStr = referHtml(references);
  str += referStr;

  const strBtn = btnHtml(buttons);
  str += strBtn;


  let formResult = document.createElement('form');
  formResult.innerHTML = str;
  const form = document.querySelector('div');
  form.appendChild(formResult);

  

};



//// fields
const fieldHtml = (fields) => {
 let str = "";

 fields.forEach(({ label, input}) => {
  

  if (label) {
    str += `<label>${label}</label>`;
  }

  if(input) {
    const entries = Object.entries(input);
    str += `<input `
    entries.forEach(([ firstItem, lastItem ]) => {
     if (firstItem === 'colors') {
       str += ` type =\"color\"  list=\"color\"> <datalist id=\"color\">`;
       lastItem.forEach((item) => {
         str += `<option value=\"${item}\">`
       })
       str += `</datalist`;
     }else if (lastItem === 'text' || lastItem === 'password') {
      str += ` ${firstItem}=\"${lastItem}\"`
      }else if (firstItem === 'placeholder'){
        str += `placeholder=\"${lastItem}\"`
      }else if (firstItem === 'required' && lastItem === true) {
        str += ` ${firstItem} `;
      } else if (firstItem === 'type' && lastItem === 'checkbox') {
        str += ` type=\"${lastItem}\"`;
      } else if (firstItem === 'checked' && lastItem === true){
        str += ` checked `;
      } else if (lastItem === 'number') {
        str += ` type=\"number\"`;
      } else if (firstItem === 'multiple' && lastItem === true){
        str += ` multiple`
      } else if (firstItem === 'technologies') {
        str += ` type =\"text\" list=\"tech\"> <datalist id=\"tech\">`;
        lastItem.forEach((item) => {
          str += `<option value=\"${item}\">`
        })
        str += `</datalist`;
      } else if (lastItem === 'file') {
        str += `type=\"file\"`;
      } else if (firstItem === 'filetype') {
        str += ` accept=\"`
        lastItem.forEach((item) => {
          str += `${item},`
        })
        str += `\"`;
      } else if (lastItem === 'date') {
        str += `type=\"date\"`;
      } else  if (firstItem === 'mask' && lastItem === '+7 (999) 99-99-999') {
        str += ` name=\"mobphone\"`
      }
     
    })
    str += `><br>`
  }
 })
 console.log(str);
 return str;
}

/////////////// refer
const referHtml = (ref) => {
  let str = "";
  if (ref) {
     ref.forEach((item) => { 
    if(item.input) {
      const entries = Object.entries(item.input);
      str += `<input `;
      entries.forEach(([ firstItem, lastItem ]) => {
        if (lastItem === 'checkbox') {
          str += `type=\"checkbox\"`;
        } else if (firstItem === 'required' && lastItem === true) {
          str += ` ${firstItem} `;
        } else if (firstItem === 'checked' && lastItem === true){
          str += ` checked `;
        }
      })
      str += `><br>`;
    } else {
      const { 'text without ref': firstText, text, ref } = item;
      if (firstText) {
        str += `<span>${firstText}  </span>`;
      }
      if (ref) {
        str += `<a href=\"${ref}\">`
      }
      if (text) {
        str += `${text}</a><br>`;
      }
    }
  })
  }
 
  return str;
}

const btnHtml = (btn) => {
  let str = "";
  if(btn) {
    btn.forEach(({ text }) => {
      str += `<button>${text}</button>`
    })
  }
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