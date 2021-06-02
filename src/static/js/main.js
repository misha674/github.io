document.addEventListener("DOMContentLoaded", () => {

    //  SEND FORM
    
    let validateForms =  (selector, rules) => {
        new window.JustValidate(selector,{
            rules: rules,
            submitHandler: (form) =>{
                let formData = new FormData(form);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            for(let [name, value] of formData) {
                                console.log(`${name} = ${value}`); 
                            }                           
                        }
                    }
                }

                xhr.open('POST', 'send.php', true);
                xhr.send(formData);

                form.reset();
            }
        })
    }

    validateForms('.main-form',{email:{required: true, email: true}, password:{required: true, minLength: 5}});
    

    //  END SEND FORM

});