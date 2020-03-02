$('select.dropdown').each(function () {

    var dropdown = $('<div />').addClass('dropdown selectDropdown');

    $(this).wrap(dropdown);

    var label = $('<span />').text($(this).attr('placeholder')).insertAfter($(this));
    label.attr('id', 'choice')
    var list = $('<ul />');

    $(this).find('option').each(function () {
        list.append($('<li />').append($('<a />').text($(this).text())));
    });

    list.insertAfter($(this));

    if ($(this).find('option:selected').length) {
        label.text($(this).find('option:selected').text());
        list.find('li:contains(' + $(this).find('option:selected').text() + ')').addClass('active');
        $(this).parent().addClass('filled');
    }

});

$(document).on('click touch', '.selectDropdown ul li a', function (e) {
    e.preventDefault();
    var dropdown = $(this).parent().parent().parent();
    var active = $(this).parent().hasClass('active');
    var label = active ? dropdown.find('select').attr('placeholder') : $(this).text();

    dropdown.find('option').prop('selected', false) ;
    const list = dropdown.find('ul li').removeClass('active');

    dropdown.toggleClass('filled', !active);
    dropdown.children('span').text(label);

    if (!active) {
        dropdown.find('option:contains(' + $(this).text() + ')').prop('selected', true);
        $(this).parent().addClass('active');
    }

    dropdown.removeClass('open');

    if (document.getElementById('choice').textContent === "Please choose") {
        document.getElementById('dropdown').setAttribute('selected', -1)
    }
    else {
        for (let i = 0; i < list.length; i++) {
            if (list[i].className === 'active') {
                document.getElementById('dropdown').setAttribute('selected', i)
                return
            } 
        }
    }
    
});

$('.dropdown > span').on('click touch', function (e) {
    var self = $(this).parent();
    self.toggleClass('open');
});

$(document).on('click touch', function (e) {
    console.log('click afuera')
    //var dropdown = $('.dropdown');
    var dropdown = document.getElementById('dropdown')
    console.log(dropdown)
    if (dropdown !== e.target) {
        dropdown.classList.remove('open')

        //dropdown.removeClass('open');
    }
});

// light
$('.switch input').on('change', function (e) {
    $('.dropdown, body').toggleClass('light', $(this).is(':checked'));
});