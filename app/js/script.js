$(document).ready(function () {
    var form = $('.js-request_form');

    initDatepicker(form.find('.js-form__date'));
    initForm(form);
    initTextInput(form);
});

function initForm(form) {
    form.on('submit', function(e) {
        e.preventDefault();
        
        $(this).find('input[type="text"]').each(function() {
            validTextInput($(this)) ? hideError($(this)) : showError($(this));
        });
    
        $(this).find('.js-form__date').each(function() {
            validDateInput($(this)) ? hideError($(this)) : showError($(this));
        });
    
        $(this).find('.js-require__field--radio').each(function() {
            validRadioInput($(this)) ? hideError($($(this).find('input[type="radio"]')[0])) : showError($($(this).find('input[type="radio"]')[0]));
        });
    
        $(this).find('.js-form__select').each(function() {
            validSelectInput($(this), 0) ? hideError($(this)) : showError($(this));
        });
    
        $(this).find('input[type="email"]').each(function() {
            validEmail($(this)) ? hideError($(this)) : showError($(this));
        });
    
        $(this).find('input[type="email"]').each(function() {
            validEmail($(this)) ? hideError($(this)) : showError($(this));
        });
    
        $(this).find('input[type="password"]').each(function() {
            validPassword($(this)) ? hideError($(this)) : showError($(this));
        });
    
        if ($('.js-require__field.error').length) {
            scrollToBlock($('.js-require__field.error'));
        } else sendData($(this).serializeArray());
    });    
}

function initDatepicker(input) {
    input.datepicker({
        maxDate: 'today'
    });
}

function validTextInput(input) {
    return Boolean(input.val().trim());
}

function validDateInput(input) {
    return new Date(input.val()) <= new Date();
}

function validRadioInput(radioContainer) {
    return radioContainer.find('input[type="radio"]:checked').length;
}

function validSelectInput(select, defaultVal) {
    return select.val() != defaultVal;
}

function validEmail(input) {
    var regEmail = new RegExp("^(([^<>()[\\]\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");

    return input.val().match(regEmail);
}

function validPassword(input) {
    return !(~input.val().indexOf(' ')) && input.val().length > 5;
}

function showError(field) {
    var container = field.closest('.js-require__field');

    if (container && !container.hasClass('error')) {
        container.addClass('error');
        if (!container.find('.js-form__error').text()) container.find('.js-form__error').text(getError(field));
    }
}

function hideError(field) {
    var container = field.closest('.js-require__field');

    if (container && container.hasClass('error')) container.removeClass('error');
}

function getError(field) {
    var typeField = field.attr('type'),
        errorText = field.attr('name');

    switch(typeField) {
        case 'text':
            errorText += ' can not be empty.';
            break;
        case 'datepicker':
            errorText += field.val() ? ' can not be later than today.' : ' need be chosen.';
            break;
        case 'radio':
            errorText += ' need be chosen.';
            break;
        case 'select':
            errorText += ' need be chosen.';
            break;
        case 'email':
            errorText += field.val() ? ' incorrect. Please check it out' : ' can not be empty.';
            break;
        case 'password':
            if (!field.val()) {
                errorText += ' can not be empty.';
            }  else if ( !(~field.val().indexOf(' ')) ) {
                errorText += ' can not be with backspace.'
            } else if (field.val().length > 5) {
                errorText += ' length need be at least 5.';
            }
            break;
        default:
            alert('You do something incorrect. Please retype the form.');
      }

    return errorText;
}

function scrollToBlock(block) {
    $('html, body').animate({
        scrollTop: block.first().offset().top - 10
    }, 300);
}

function sendData(data) {
    var userData = '<div class="overlay js-overlay"><div class="data">';

    for (var i = 0; i < data.length; i ++) {
        userData += '<div class="data__item">Your ' + data[i].name + ' is: ' + data[i].value + '</div>';
    }

    userData += '</div></div>';

    $('body').append(userData);

    $('.js-overlay').off().on('click', function(event) {
        if ($(event.target)[0] == $(this)[0]) $('.js-overlay').remove();
    });
}

function initTextInput(form) {
    form.find('input[type="text"]').on('input', function() {
        $(this).val($(this).val().replace(/\'/g, ''));
        $(this).val($(this).val().replace(/\"/g, ''));
    });
}
