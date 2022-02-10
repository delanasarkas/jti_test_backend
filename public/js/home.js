// GOTO PAGE WITH TYPE
const goTo = (page) => {
    window.location.href = `/${page}`

    if(page == 'output'){
        localStorage.removeItem('jti_test_selected');
    }
}

// GENERATE AUTO PROVIDER
const prefix = (type) => {
    function tsel() {
        const arrays = [
            '0852', 
            '0853', 
            '0811', 
            '0812', 
            '0813', 
            '0821', 
            '0822', 
            '0851'
          ];
    
          return arrays;
    }

    function xl() {
        const arrays = [
            '0817', 
            '0818', 
            '0819', 
            '0859', 
            '0877', 
            '0878', 
            '0879'
        ];
  
        return arrays;
    }

    function isat() {
        const arrays = [
            '0814', 
            '0815', 
            '0816', 
            '0855', 
            '0856', 
            '0857', 
            '0858'
        ];
  
        return arrays;
    }

    function tri() {
        const arrays = [
            '0896', 
            '0897', 
            '0898', 
            '0899'
        ];
  
        return arrays;
    }

    function sfren() {
        const arrays = [
            '0882', 
            '0883', 
            '0884'
        ];
  
        return arrays;
    }

    if(type == 'tsel'){
        return tsel();
    } else if(type == 'xl'){
        return xl();
    } else if(type == 'isat'){
        return isat();
    } else if(type == 'tri'){
        return tri();
    } else if(type == 'sfren'){
        return sfren();
    }
}

const generateProvider = (event, auto) => {
    let val = event == null ? auto : event.target.value;
    let valPrefix = val.substring(0, 4)

    if(val.length > 0) {
        // PREFIX CONDITION
        if(prefix('xl').includes(valPrefix.toString())){
            $('#provider option').eq(1).prop('selected', true);
        } else if(prefix('tsel').includes(valPrefix.toString())){
            $('#provider option').eq(2).prop('selected', true);
        } else if(prefix('tri').includes(valPrefix.toString())){
            $('#provider option').eq(3).prop('selected', true);
        } else if(prefix('isat').includes(valPrefix.toString())){
            $('#provider option').eq(4).prop('selected', true);
        } else if(prefix('sfren').includes(valPrefix.toString())){
            $('#provider option').eq(5).prop('selected', true);
        } else {
            $('#provider option').eq(0).prop('selected', true);
        }
    } else {
        
    }
}

// AXIOS PROCCESS
const API_URL = 'http://localhost:8080';

const inputSubmitAuto = () => {
    // DECLARE LOADER
    $('#alert_input_success').addClass( "d-none" ).empty();
    let button = $('#btn_auto');
    let buttonLoader = $('#btn_auto_loader');

    // ARR ALL PREFIX
    const allPrefix = [];
    allPrefix.push(
        '0852', 
        '0853', 
        '0811', 
        '0812', 
        '0813', 
        '0821', 
        '0822', 
        '0851',
        '0817', 
        '0818', 
        '0819', 
        '0859', 
        '0877', 
        '0878', 
        '0879',
        '0814', 
        '0815', 
        '0816', 
        '0855', 
        '0856', 
        '0857', 
        '0858',
        '0896', 
        '0897', 
        '0898', 
        '0899',
        '0882', 
        '0883', 
        '0884'
    );

    // LOGIC RANDOMIZE PHONE NUMBER
    const randomize = Math.floor(Math.random() * allPrefix.length);
    const randomNumber = Math.floor((Math.random() * 90000000) + 500);
    const result = allPrefix[randomize]+randomNumber;
    
    // ADD VALUE TO FIELD PHONE
    $("input[name=phone]").val(result);

    // GENERATE PROVIDER
    generateProvider(null, allPrefix[randomize]);

    // GET VALUE
    let userVal = $("input[name=user]").val();
    let providerVal = $("#provider").find(":selected").text();
    let lastVal = result.substr(result.length - 1);

    // LOADER
    button.addClass( "d-none" );
    buttonLoader.removeClass( "d-none" );

    // CONDITION CHECK IF DATA EXIST
    axios.get(API_URL+ `/api/find-data?phone=${result}`)
    .then((res) => {
        const resDataFind = res.data.data;

        if(resDataFind.length == 0) {
            processInputSubmitAuto(result, providerVal, lastVal, userVal, button, buttonLoader);
        } else {
            $('#alert_input_error').removeClass( "d-none" ).append('Phone number is exist!');

            // END LOADER
            button.removeClass( "d-none" );
            buttonLoader.addClass( "d-none" );
        }
    })
    .catch(() => {
        console.clear();
    })
}

// FUNCTION INPUT SUBMIT AUTO
const processInputSubmitAuto = (result, providerVal, lastVal, userVal, button, buttonLoader) => {
    // POST AXIOS
    axios.post(API_URL + '/api/input', {
        phone: result,
        provider: providerVal,
        is_even: (parseInt(lastVal) % 2 == 0) ? 1 : 0,
        user_created: userVal,
    })
    .then((res) => {
        // SUCCESS
        const successMessage = res.data.meta.message;
        const idResponse = res.data.data.id;

        setTimeout(() => {    
            // WEB SOCKET MESSAGE
            socket.emit('message', {
                id: idResponse,
                phone: result,
                provider: providerVal,
                is_even: (parseInt(lastVal) % 2 == 0) ? 1 : 0,
            })

            // SOUND
            var sound = new Audio("/sound/beep.mp3");
            sound.play();

            // ADD MESSAGE 
            $('#alert_input_error').addClass( "d-none" );
            $('#alert_input_success').removeClass( "d-none" ).append(successMessage);

            // CLEAN FORM
            $("input[name=phone]").val("");
            $("#provider").find(":selected").prop("selected", false)

            // END LOADER
            button.removeClass( "d-none" );
            buttonLoader.addClass( "d-none" );
        }, 500);
    })
    .catch((err) => {
        // ERR
        const errMessage = err.response.data.message;

        $('#alert_input_error').removeClass( "d-none" ).append(errMessage);

        // END LOADER
        button.removeClass( "d-none" );
        buttonLoader.addClass( "d-none" );

        console.clear();
    })
}

// FUNCTION INPUT SUBMIT
const inputSubmit = () => {
    // GET VALUE
    let userVal = $("input[name=user]").val();
    let phoneVal = $("input[name=phone]").val();
    let providerVal = $("#provider").find(":selected").text();
    let lastVal = phoneVal.substr(phoneVal.length - 1);
    let button = $('#btn_save');
    let buttonLoader = $('#btn_save_loader');

    // LOADER
    $('#alert_input_success').addClass( "d-none" ).empty();
    button.addClass( "d-none" );
    buttonLoader.removeClass( "d-none" );

    // CONDITION CHECK IF DATA EXIST
    axios.get(API_URL+ `/api/find-data?phone=${phoneVal}`)
    .then((res) => {
        const result = res.data.data;

        if(result.length == 0) {
            processInputSubmit(phoneVal, providerVal, lastVal, userVal, button, buttonLoader);
        } else {
            $('#alert_input_error').removeClass( "d-none" ).append('Phone number is exist!');

            // END LOADER
            button.removeClass( "d-none" );
            buttonLoader.addClass( "d-none" );
        }
    })
    .catch((err) => {
        console.log(err.response);
        // console.clear();
    })
}

const processInputSubmit = (phoneVal, providerVal, lastVal, userVal, button, buttonLoader) => {
    // POST AXIOS
    axios.post(API_URL + '/api/input', {
        phone: phoneVal,
        provider: providerVal,
        is_even: (parseInt(lastVal) % 2 == 0) ? 1 : 0,
        user_created: userVal,
    })
    .then((res) => {
        // SUCCESS
        const successMessage = res.data.meta.message;

        setTimeout(() => {    
            // ADD MESSAGE 
            $('#alert_input_error').addClass( "d-none" );
            $('#alert_input_success').removeClass( "d-none" ).append(successMessage);

            // CLEAN FORM
            $("input[name=phone]").val("");
            $("#provider").find(":selected").prop("selected", false)

            // END LOADER
            button.removeClass( "d-none" );
            buttonLoader.addClass( "d-none" );
        }, 500);
    })
    .catch((err) => {
        // ERR
        const errMessage = err.response.data.message;

        $('#alert_input_error').removeClass( "d-none" ).append(errMessage);

        // END LOADER
        button.removeClass( "d-none" );
        buttonLoader.addClass( "d-none" );
    })
}

// ============ OUTPUT =============
// SELECTED PHONE LIST
const selectedCard = (id, phone) => {
    // get class
    const list = document.querySelectorAll('.btn-card-phone-list');
    const listSelected = $(`#${id}`)

    // loop
    for (i = 0; i < list.length; i++) {
        // Remove the class 'active' if it exists
        list[i].classList.remove('active-list')
    }
    // add 'active' classs to the element that was clicked
    listSelected.addClass('active-list');

    // store data
    localStorage.setItem('jti_test_selected', id);
    $("input[name=phone_edit]").val(phone);
}

const submitEdit = () => {
    const id = localStorage.getItem('jti_test_selected');
    const phone = $("input[name=phone_edit]").val();

    axios.put(API_URL+ `/api/update/${id}`, {
        phone_edit: phone,
    })
    .then((res) => {
        const code = res.data.meta.code;
        const message = res.data.meta.message;

        if(code == 200) {
            $('#updated_alert').removeClass( "d-none" ).append(message);
        } else {
            $('#updated_alert_fail').removeClass( "d-none" ).append(message);
        }
    })
}

const deletePhone = () => {
    if (confirm('Are you sure delete phone number?')) {
        const id = localStorage.getItem('jti_test_selected');

        axios.delete(API_URL+ `/api/delete/${id}`)
        .then(() => {
            window.location.href = '/output';
        })
    }
}