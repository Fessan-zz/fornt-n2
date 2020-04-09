function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);
  reader.onload = function () {
    
    const textJson = reader.result;

    const textToJson = JSON.parse(textJson);
      
    htmlBuilder(textToJson);
    $('input[name="mobphone"]').mask('+0 (000) 000 00 00', {placeholder: "+7 (999) 99-99-999"});
    $('input[name="serial"]').mask('00-00 000000', {placeholder: "99-99 999999"});
    $('input[name="code"]').mask('000-000', {placeholder: "999-999"});
  };

  reader.onerror = function () {
    console.log(reader.error);
  };


}


const htmlBuilder = (obj) => {
  const { name, fields, references, buttons } = obj;
  let str = "";
  str += `<h1>${name}</h1><br>`;

  str += `<div class=\"form-group\">`
  const fieldStr = fieldHtml(fields);
  str += fieldStr;

  const referStr = referHtml(references);
  str += referStr;

  const strBtn = btnHtml(buttons);
  str += strBtn;
  str += `</div>`

  let formResult = document.createElement('form');

  formResult.classList.add("d-flex", "justify-content-center", "align-items-center", "flex-column");
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
     }else if (lastItem === 'text' || lastItem === 'password' || lastItem === 'email'|| lastItem === 'textarea') {
      str += ` ${firstItem}=\"${lastItem}\" class=\"form-control \"`
      } else if (firstItem === 'placeholder'){
        str += `placeholder=\"${lastItem}\"`
      }else if (firstItem === 'required' && lastItem === true) {
        str += ` ${firstItem} `;
      } else if (firstItem === 'type' && lastItem === 'checkbox') {
        str += ` type=\"${lastItem}\" `;
      } else if (firstItem === 'checked' && lastItem === true){
        str += ` checked `;
      } else if (lastItem === 'number' ) {
        
      } else if (lastItem === 'number' && label === 'Введите Номер телефона') {
        str += ` type=\"text\" class=\"form-control \"`;
      } else if (lastItem === 'number' && label === 'Серия, номер') {
        str += ` type=\"text\" class=\"form-control \"`;
      } else if (lastItem === 'number' && label === 'Код подразделения') {
        str += ` type=\"text\" class=\"form-control \"`;
      } else if (firstItem === 'multiple' && lastItem === true){
        str += ` multiple`
      } else if (firstItem === 'technologies') {
        str += ` type =\"text\" class=\"form-control\" list=\"tech\"> <datalist id=\"tech\">`;
        lastItem.forEach((item) => {
          str += `<option value=\"${item}\">`
        })
        str += `</datalist`;
      } else if (lastItem === 'file') {
        str += `type=\"file\" class=\"form-control \"`;
      } else if (firstItem === 'filetype') {
        str += ` accept=\"`
        lastItem.forEach((item) => {
          str += `${item},`
        })
        str += `\"`;
      } else if (lastItem === 'date') {
        str += `type=\"date\" class=\"form-control \"`;
      } else  if (firstItem === 'mask' && lastItem === '+7 (999) 99-99-999') {
        str += ` name=\"mobphone\"`
      } else  if (firstItem === 'mask' && lastItem === '99-99 999999') {
        str += ` name=\"serial\"`
      } else  if (firstItem === 'mask' && lastItem === '999-999') {
        str += ` name=\"code\"`
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
          str += `type=\"checkbox\" `;
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
      str += `<button class=\"btn\ mr-3 btn-primary">${text}</button>`
    })
  }
  return str;
}

