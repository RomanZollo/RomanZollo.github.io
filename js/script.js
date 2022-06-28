window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
});

$(document).ready(function() {
    // Modal
    $('[data-modal=consultation]').on('click', function() {  /* consultation */
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');  /* закрытие всех модальных окон */
    });

    $('.button_mini').each(function(i) {  /* кнопка купить */
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text()); /* замена текста после строчки "Ваш заказ:"(выбор пульсометра который выбран) */
            $('.overlay, #order').fadeIn('slow');
        });
    });

    /* Validation */
    function validateForms(form){
        $(form).validate({
            rules: {                      /* настройки валидации */
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {                  /* настройка сообщений которые выводятся при валидации */
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("{0} минимальное число символов!")
                },
                phone: "Пожалуйста, введите свой номер телефон",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес электронной почты"
                }
              }
        });
    };

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');

    $('input[name=phone]').mask("+7(999) 999-99-99");

    // отправка писем с сайта
    $('form').submit(function(e) {     // обращаемся ко всем формам. (e) - event
        e.preventDefault();            // отмена стандартного поведения браузера
        $.ajax({
            type: "POST",              // POST - данные отправить
            url: "mailer/smart.php",   // кто будет отправлять
            data: $(this).serialize()  // какие данные
        }).done(function() {                 // действие после выполнения операции (отправка POST)
            $(this).find("input").val("");   // отчищаем строки в input (имя, телефон, почта)

            $('#consultation, #order').fadeOut();  // закрытие модальных окон после отправки письма
            $('.overlay, #thanks').fadeIn('slow'); // появление окошка благодарности за заказ

            $('form').trigger('reset');
        });
        return false;
    });
});
