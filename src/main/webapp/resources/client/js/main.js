(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', 0);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
        
        //add active class to header
        const navElement = $("#navbarCollapse");
        const currentUrl = window.location.pathname;
        navElement.find('a.nav-link').each(function () {
            const link = $(this); // Get the current link in the loop
            const href = link.attr('href'); // Get the href attribute of the link

            if (href === currentUrl) {
                link.addClass('active'); // Add 'active' class if the href matches the current URL
            } else {
                link.removeClass('active'); // Remove 'active' class if the href does not match
            }
        });
    });



    // Product Quantity
    // $('.quantity button').on('click', function () {
    //     var button = $(this);
    //     var oldValue = button.parent().parent().find('input').val();
    //     if (button.hasClass('btn-plus')) {
    //         var newVal = parseFloat(oldValue) + 1;
    //     } else {
    //         if (oldValue > 0) {
    //             var newVal = parseFloat(oldValue) - 1;
    //         } else {
    //             newVal = 0;
    //         }
    //     }
    //     button.parent().parent().find('input').val(newVal);
    // });

    /* cart plus and minus */
    $('.quantity button').on('click', function () {/* query selector all button. */
        let change = 0;
        
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();

        
        
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
            change = 1;
        } else {
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
                change = -1;
            } else {
                newVal = 1;
            }
        }
        const input = button.parent().parent().find('input');
        input.val(newVal);

             //set form index
        const index = input.attr("data-cart-detail-index")
        const el = document.getElementById(`cartDetails${index}.quantity`);
        $(el).val(newVal);//just know why has index .



        //get price
        const price = input.attr("data-cart-detail-price"); 
        const id = input.attr("data-cart-detail-id");

        const priceElement = $(`p[data-cart-detail-id='${id}']`);
        if (priceElement) {
            const newPrice = +price * newVal;
            priceElement.text(formatCurrency(newPrice.toFixed(2)) + " đ");
        }

        //update total cart price
        const totalPriceElement = $(`p[data-cart-total-price]`);/* query selector return 1 element then use # */

        if (totalPriceElement && totalPriceElement.length) {
            const currentTotal = totalPriceElement.first().attr("data-cart-total-price");
            let newTotal = +currentTotal;
            if (change === 0) {
                newTotal = +currentTotal;
            } else {
                newTotal = change * (+price) + (+currentTotal);
            }

            //reset change
            change = 0;

            //update
            totalPriceElement?.each(function (index, element) {/* ? operator  is : Optional chaining */
                //update text
                $(totalPriceElement[index]).text(formatCurrency(newTotal.toFixed(2)) + " đ");

                //update data-attribute
                $(totalPriceElement[index]).attr("data-cart-total-price", newTotal);
            });
        }
    });

    function formatCurrency(value) {
        // Use the 'vi-VN' locale to format the number according to Vietnamese currency format
        // and 'VND' as the currency type for Vietnamese đồng
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0, // No decimal part for whole numbers
        });

        let formatted = formatter.format(value);
        // Replace dots with commas for thousands separator
        formatted = formatted.replace(/\./g, ',');
        return formatted;
    }

    // handle filter product
$('#btnFilter').click(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định (ví dụ: submit form) khi nhấn nút

    // Khởi tạo các mảng lưu trữ giá trị của các checkbox được chọn
    let factoryArr = []; // Lưu giá trị của bộ lọc "factory" (nhà sản xuất)
    let targetArr = [];  // Lưu giá trị của bộ lọc "target" (đối tượng hướng đến)
    let priceArr = [];   // Lưu giá trị của bộ lọc "price" (khoảng giá)

    // Lấy giá trị của tất cả các checkbox đã được chọn trong phần lọc "factory"
    $("#factoryFilter .form-check-input:checked").each(function () {
        factoryArr.push($(this).val()); // Thêm giá trị của checkbox vào mảng factoryArr
    });

    // Lấy giá trị của tất cả các checkbox đã được chọn trong phần lọc "target"
    $("#targetFilter .form-check-input:checked").each(function () {
        targetArr.push($(this).val()); // Thêm giá trị vào mảng targetArr
    });

    // Lấy giá trị của tất cả các checkbox đã được chọn trong phần lọc "price"
    $("#priceFilter .form-check-input:checked").each(function () {
        priceArr.push($(this).val()); // Thêm giá trị vào mảng priceArr
    });

    // Lấy giá trị của radio button được chọn để sắp xếp sản phẩm
    let sortValue = $('input[name="radio-sort"]:checked').val();

    // Tạo đối tượng URL từ URL hiện tại của trình duyệt để thao tác với query parameters
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams; // Đối tượng giúp xử lý các tham số trên URL

    // Cập nhật các tham số trên URL:
    searchParams.set('page', '1');        // Đặt tham số 'page' về '1' để chuyển về trang đầu tiên khi lọc
    searchParams.set('sort', sortValue);    // Đặt tham số 'sort' với giá trị của radio button đã chọn

    // Nếu có bộ lọc "factory" được chọn, ghép các giá trị lại thành chuỗi phân cách bằng dấu phẩy
    if (factoryArr.length > 0) {
        searchParams.set('factory', factoryArr.join(','));
    }
    // Nếu có bộ lọc "target" được chọn, ghép các giá trị lại thành chuỗi phân cách bằng dấu phẩy
    if (targetArr.length > 0) {
        searchParams.set('target', targetArr.join(','));
    }
    // Nếu có bộ lọc "price" được chọn, ghép các giá trị lại thành chuỗi phân cách bằng dấu phẩy
    if (priceArr.length > 0) {
        searchParams.set('price', priceArr.join(','));
    }

    // Cập nhật URL của trình duyệt với các tham số mới và tải lại trang để áp dụng bộ lọc
    window.location.href = currentUrl.toString();
});


// Xử lý tự động chọn checkbox và radio khi trang được tải dựa trên URL (để khi reload trang thì các bộ lọc vẫn được giữ lại)
// Tạo đối tượng URLSearchParams từ query string(vd : ?name=John&age=30) trong URL hiện tại
const params = new URLSearchParams(window.location.search);

// Nếu URL có tham số 'factory', tự động check các checkbox tương ứng
if (params.has('factory')) {
    const factories = params.get('factory').split(','); // Lấy giá trị của 'factory' và tách thành mảng (giá trị cách nhau bởi dấu phẩy)
    factories.forEach(factory => {
        // Chọn checkbox có giá trị tương ứng trong phần #factoryFilter
        $(`#factoryFilter .form-check-input[value="${factory}"]`).prop('checked', true);//prop get set properties , 
        // thiết lập thuộc tính checked của checkbox đó thành true.
    });
}

// Nếu URL có tham số 'target', tự động check các checkbox tương ứng
if (params.has('target')) {
    const targets = params.get('target').split(',');
    targets.forEach(target => {
        // Chọn checkbox có giá trị tương ứng trong phần #targetFilter
        $(`#targetFilter .form-check-input[value="${target}"]`).prop('checked', true);
    });
}

// Nếu URL có tham số 'price', tự động check các checkbox tương ứng
if (params.has('price')) {
    const prices = params.get('price').split(',');
    prices.forEach(price => {
        // Chọn checkbox có giá trị tương ứng trong phần #priceFilter
        $(`#priceFilter .form-check-input[value="${price}"]`).prop('checked', true);
    });
}

// Nếu URL có tham số 'sort', tự động check radio button tương ứng
if (params.has('sort')) {
    const sort = params.get('sort');
    // Chọn radio button có name là "radio-sort" và giá trị tương ứng
    $(`input[type="radio"][name="radio-sort"][value="${sort}"]`).prop('checked', true);
}

})(jQuery);

