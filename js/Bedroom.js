"use strict";
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
$(document).ready(function () {
    // load page
    onPageLoading();

    // Cập nhật đồng hồ mỗi giây
    setInterval(updateClock, 1000);

    // Gọi hàm ngay lập tức để hiển thị đúng thời gian ngay khi trang tải
    // updateClock();

    // sự kiện khi nhấn vào menu-items
    $(".menu-item").on('click', function () {
        // lấy index của switch vừa được nhấn
        var index = $(this).index('.menu-item');
        // remove all class active
        $(".menu-item").removeClass('active animate__animated animate__fadeInUp');
        // thêm class active vào
        $(this).addClass('active');
        // hiệu ứng hiển thị
        if (index == 0) {
            $(".other-container").css('display', 'none')
            $(".chart-render-container").css('display', 'none');
            $(".bedroom").css('display', 'block').addClass('animate__animated animate__fadeInUp');
        } else if (index == 1) {
            $(".other-container").css('display', 'none');
            $(".bedroom").css('display', 'none');
            $(".chart-render-container").addClass('animate__animated animate__fadeInUp').css('display', 'block');
        } else if (index == 2) {
            $(".bedroom").css('display', 'none');
            $(".chart-render-container").css('display', 'none');
            $(".other-container").css('display', 'block').addClass('animate__animated animate__fadeInUp');
        }
    })

    // hiệu ứng khi nhấn nút SWITCH
    $(".cb").on('change', function () {
        // lấy index của switch vừa được nhấn
        var index = $(this).index('.cb');
        // in ra index của switch vừa được nhấn
        console.log('Button index:', index);
        // truy xuất đến phần tử cha có class là animate và thêm hiệu ứng vào nếu đủ điều kiện
        if ($(this).is(':checked')) {
            // truy xuất đến class animate chứa switch
            var vAnimate = $(this).parents('.animate');
            vAnimate.css('animation', 'rainbow 2s linear infinite');
            // truy xuất đến class status gần nhất
            var vStatus = $(this).closest('.animate').find('.status');
            vStatus.html("ON");
            // điều kiện để đổi hình
            if (index == 0) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', 'img/light-bulb.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_1');
                vFireBase.update({
                    light: 'ON',
                });
            } else if (index == 1) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', 'img/air-conditioner.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_2');
                vFireBase.update({
                    cooler: 'ON',
                });
            } else if (index == 2) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', '../img/alarm.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_3');
                vFireBase.update({
                    alarm: 'ON',
                });
            }
            else if (index == 3) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', '../img/cctv-camera.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_4');
                vFireBase.update({
                    camera: 'ON',
                });
            }
        } else {
            // truy xuất đến class animate chứa switch
            var vAnimate = $(this).parents('.animate');
            vAnimate.css('animation', 'none');
            // truy xuất đến class status gần nhất
            var vStatus = $(this).closest('.animate').find('.status');
            vStatus.html("OFF");
            // điều kiện để đổi hình
            if (index == 0) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', '../img/light-bulb-off.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_1');
                vFireBase.update({
                    light: 'OFF',
                });
            } else if (index == 1) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', '../img/air-conditioner-off.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_2');
                vFireBase.update({
                    cooler: 'OFF',
                });
            } else if (index == 2) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', '../img/alarm-off.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_3');
                vFireBase.update({
                    alarm: 'OFF',
                });
            }
            else if (index == 3) {
                // truy xuất đến thẻ img gần nhất để đổi hình
                var vStatus = $(this).closest('.animate').find('.device-img');
                vStatus.attr('src', '../img/cctv-camera-off.png');
                // gửi dữ liệu lên firebase
                var vFireBase = firebase.database().ref('device_4');
                vFireBase.update({
                    camera: 'OFF',
                });
            }
        }
    })
})
/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// reload page
function onPageLoading() {
    // truy xuất vào tất cả các thẻ
    var item = $(".animate");
    // duyệt lần lượt từng thẻ và thêm hiệu ứng vào
    item.each(function (index, elements) {
        // gọi hàm hiển thị lần lượt từng thẻ
        showItemWithAnimation($(this), index * 100);
    });
    // chờ 0.5s rồi mới hiển thị phần tử sensor cuối cùng
    setTimeout(function () {
        $('.sensor-data-item').last().css('display', "block");
    }, 500)
    // chờ 0.5s rồi mới load dữ liệu từ firebase lên
    setTimeout(function () {
        fireBaseConfig();
        loadFireBaseData();
    }, 500)
}

// load firebase data
function loadFireBaseData() {
    //functions
    // make sure that the name in ' ' match with name of your database child
    // nhiệt độ độ ẩm
    var nhietDo = document.getElementById('nhietdo');
    var dbRef = firebase.database().ref('weather_data').child('temperature');
    var doAm = document.getElementById('doam');
    var dbRef2 = firebase.database().ref('weather_data').child('humidity');
    // ánh sáng
    var anhsang = document.getElementById('anhsang');
    var dbRef7 = firebase.database().ref('weather_data').child('light');
    // khí gas
    var khiga = document.getElementById('khiga');
    var dbRef8 = firebase.database().ref('gas_sensor').child('gas');
    if (parseInt(khiga) >= 1000) {
        var donvi = $('.ppm').html("");
    }
    // gán dữ liệu nhiệt độ, độ ẩm, ánh sáng, khí ga vào giao diện và tự động điều khiển trạng thái của thiết bị
    dbRef.on('value', function (snap) {
        // lấy giá trị của trường temperature và gán vào giao diện 
        nhietDo.innerText = parseInt(snap.val());
        // điều khiển thiết bị và gửi trạng thái của thiết bị lên firebase
        if (parseInt(snap.val()) >= 30) {
            var vFireBase = firebase.database().ref('device_2');
            vFireBase.update({
                cooler: 'ON',
            });
        } else if (parseInt(snap.val()) <= 20) {
            var vFireBase = firebase.database().ref('device_2');
            vFireBase.update({
                cooler: 'OFF',
            });
        }
    });
    dbRef2.on('value', snap => doAm.innerText = parseInt(snap.val()));
    dbRef7.on('value', function (snap) {
        // lấy giá trị của trường cảm biến ánh sáng và gán vào giao diện 
        anhsang.innerText = snap.val();
        // điều khiển thiết bị và gửi trạng thái của thiết bị lên firebase
        if (parseInt(snap.val()) >= 2045) {
            var vFireBase = firebase.database().ref('device_1');
            vFireBase.update({
                light: 'ON',
            });
        } else if (parseInt(snap.val()) < 2045) {
            var vFireBase = firebase.database().ref('device_1');
            vFireBase.update({
                light: 'OFF',
            });
        }
    });
    dbRef8.on('value', function (snap) {
        // lấy giá trị của trường cảm biến ánh sáng và gán vào giao diện 
        khiga.innerText = snap.val();
        // điều khiển thiết bị và gửi trạng thái của thiết bị lên firebase
        if (parseInt(snap.val()) >= 2000) {
            var vFireBase = firebase.database().ref('device_3');
            vFireBase.update({
                alarm: 'ON',
            });
        } else if (parseInt(snap.val()) < 2000) {
            var vFireBase = firebase.database().ref('device_3');
            vFireBase.update({
                alarm: 'OFF',
            });
        }
    });
    // gán dữ liệu trạng thái của thiết bị vào giao diện
    var dbRef3 = firebase.database().ref('device_1').child('light');
    var dbRef4 = firebase.database().ref('device_2').child('cooler');
    var dbRef5 = firebase.database().ref('device_3').child('alarm');
    var dbRef6 = firebase.database().ref('device_4').child('camera');
    dbRef3.on('value', function (snapshot) {
        var data = snapshot.val();  // Lấy giá trị của 'light'
        if (data == "ON") {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(3);
            vAnimate.css('animation', 'rainbow 2s linear infinite');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').first();
            vStatus.html("ON");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').first();
            vStatus.attr('src', 'img/light-bulb.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').first();
            vSwitch.prop('checked', true);  // Đặt switch thành trạng thái checked (bật)
        } else {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(3);
            vAnimate.css('animation', 'none');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').first();
            vStatus.html("OFF");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').first();
            vStatus.attr('src', '../img/light-bulb-off.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').first();
            vSwitch.prop('checked', false);  // Đặt switch thành trạng thái checked (bật)
        }
    });
    dbRef4.on('value', function (snapshot) {
        var data = snapshot.val();  // Lấy giá trị của 'light'
        if (data == "ON") {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(4);
            vAnimate.css('animation', 'rainbow 2s linear infinite');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').eq(1);
            vStatus.html("ON");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').eq(1);
            vStatus.attr('src', '../img/air-conditioner.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').eq(1);
            vSwitch.prop('checked', true);  // Đặt switch thành trạng thái checked (bật)
        } else {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(4);
            vAnimate.css('animation', 'none');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').eq(1);
            vStatus.html("OFF");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').eq(1);
            vStatus.attr('src', '../img/air-conditioner-off.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').eq(1);
            vSwitch.prop('checked', false);  // Đặt switch thành trạng thái checked (bật)
        }
    });
    dbRef5.on('value', function (snapshot) {
        var data = snapshot.val();  // Lấy giá trị của 'light'
        if (data == "ON") {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(5);
            vAnimate.css('animation', 'rainbow 2s linear infinite');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').eq(2);
            vStatus.html("ON");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').eq(2);
            vStatus.attr('src', '../img/alarm.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').eq(2);
            vSwitch.prop('checked', true);  // Đặt switch thành trạng thái checked (bật)
        } else {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(5);
            vAnimate.css('animation', 'none');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').eq(2);
            vStatus.html("OFF");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').eq(2);
            vStatus.attr('src', '../img/alarm-off.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').eq(2);
            vSwitch.prop('checked', false);  // Đặt switch thành trạng thái checked (bật)
        }
    });
    dbRef6.on('value', function (snapshot) {
        var data = snapshot.val();  // Lấy giá trị của 'light'
        if (data == "ON") {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(6);
            vAnimate.css('animation', 'rainbow 2s linear infinite');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').eq(3);
            vStatus.html("ON");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').eq(3);
            vStatus.attr('src', '../img/cctv-camera.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').eq(3);
            vSwitch.prop('checked', true);  // Đặt switch thành trạng thái checked (bật)
        } else {
            // truy xuất đến class animate chứa switch
            var vAnimate = $('.animate').eq(6);
            vAnimate.css('animation', 'none');
            // truy xuất đến class status gần nhất
            var vStatus = $('.status').eq(3);
            vStatus.html("OFF");
            // truy xuất đến thẻ img gần nhất để đổi hình
            var vStatus = $('.device-img').eq(3);
            vStatus.attr('src', '../img/cctv-camera-off.png');
            // thay đổi trạng thái switch
            var vSwitch = $('.cb').eq(3);
            vSwitch.prop('checked', false);  // Đặt switch thành trạng thái checked (bật)
        }
    });
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// Hàm hiển thị phần tử với hiệu ứng
function showItemWithAnimation(item, delay) {
    setTimeout(function () {
        // thêm hiệu ứng và đổi lại display
        item.addClass('animate__animated animate__fadeInUp').css('display', "block");
    }, delay); // Thay đổi giá trị thời gian nếu cần
}

// FIREBASE CONFIG
function fireBaseConfig() {
    // firebase config
    var firebaseConfig = {
        apiKey: "AIzaSyCFQ3U664pRQOs1zt6lclzDaBfEAX7G0OA",
        authDomain: "iot-final-c8488.firebaseapp.com",
        databaseURL: "https://iot-final-c8488-default-rtdb.firebaseio.com",
        projectId: "iot-final-c8488",
        storageBucket: "iot-final-c8488.appspot.com",
        messagingSenderId: "212380927364",
        appId: "1:212380927364:web:f2e4181dbaf820877249d1",
        measurementId: "G-5MVLEVMM9B"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const db = firebase.database();

    // chart render
    fireBaseChartRender(db);
    // CALENDAR RENDER
    calendarRender();
}

// CHART RENDER
function fireBaseChartRender(db) {
    const temp = document.getElementById('temp-chart').getContext('2d');
    const humid = document.getElementById('humid-chart').getContext('2d');
    const light = document.getElementById('light-chart').getContext('2d');
    const gas = document.getElementById('gas-chart').getContext('2d');

    // Tạo biểu đồ bằng Chart.js
    const tempChart = new Chart(temp, {
        type: 'line',  // Loại biểu đồ (có thể là 'bar', 'line', 'pie', ...)
        data: {
            labels: [],  // Danh sách nhãn (có thể là thời gian hoặc các giá trị khác)
            datasets: [{
                label: 'Temperature',
                data: [],  // Dữ liệu sẽ được cập nhật từ Firebase
                backgroundColor: [
                    'red', // Màu nền cột đầu tiên
                    'red', // Màu nền cột thứ hai
                    'red', // Màu nền cột thứ ba
                    'red'  // Màu nền cột thứ tư
                ],
                borderColor: 'red',
                borderWidth: 3,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Màu chữ trục tung,
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'white', // Màu chữ trục hoành
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',  // Màu của legend labels
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                }
            }
        }
    });

    const humidChart = new Chart(humid, {
        type: 'line',  // Loại biểu đồ (có thể là 'bar', 'line', 'pie', ...)
        data: {
            labels: [],  // Danh sách nhãn (có thể là thời gian hoặc các giá trị khác)
            datasets: [{
                label: 'Humid',
                data: [],  // Dữ liệu sẽ được cập nhật từ Firebase
                backgroundColor: [
                    'blue', // Màu nền cột đầu tiên
                    'blue', // Màu nền cột thứ hai
                    'blue', // Màu nền cột thứ ba
                    'blue'  // Màu nền cột thứ tư
                ],
                borderColor: 'blue',
                borderWidth: 3,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Màu chữ trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'white', // Màu chữ trục hoành
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',  // Màu của legend labels
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                }
            }
        }
    });

    const lightChart = new Chart(light, {
        type: 'line',  // Loại biểu đồ (có thể là 'bar', 'line', 'pie', ...)
        data: {
            labels: [],  // Danh sách nhãn (có thể là thời gian hoặc các giá trị khác)
            datasets: [{
                label: 'Light Sensor',
                data: [],  // Dữ liệu sẽ được cập nhật từ Firebase
                backgroundColor: [
                    '#FFFF00', // Màu nền cột đầu tiên
                    '#FFFF00', // Màu nền cột thứ hai
                    '#FFFF00', // Màu nền cột thứ ba
                    '#FFFF00'  // Màu nền cột thứ tư
                ],
                borderColor: '#FFFF00',
                borderWidth: 3,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Màu chữ trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'white', // Màu chữ trục hoành
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',  // Màu của legend labels
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                }
            }
        }
    });

    const gasChart = new Chart(gas, {
        type: 'line',  // Loại biểu đồ (có thể là 'bar', 'line', 'pie', ...)
        data: {
            labels: [],  // Danh sách nhãn (có thể là thời gian hoặc các giá trị khác)
            datasets: [{
                label: 'Gas',
                data: [],  // Dữ liệu sẽ được cập nhật từ Firebase
                backgroundColor: [
                    'orange', // Màu nền cột đầu tiên
                    'orange', // Màu nền cột thứ hai
                    'orange', // Màu nền cột thứ ba
                    'orange'  // Màu nền cột thứ tư
                ],
                borderColor: 'orange',
                borderWidth: 3,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white', // Màu chữ trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
                x: {
                    ticks: {
                        color: 'white', // Màu chữ trục hoành
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.5)', // Màu đường kẻ khung của trục tung
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white',  // Màu của legend labels
                        font: {
                            size: 18  // Đổi cỡ chữ cho chú giải
                        }
                    }
                }
            }
        }
    });

    // Khôi phục dữ liệu nếu có
    const tempSavedLabels = localStorage.getItem('tempChartLabels');
    const tempSavedData = localStorage.getItem('tempChartData');
    const humidSavedLabels = localStorage.getItem('humidChartLabels');
    const humidSavedData = localStorage.getItem('humidChartData');
    const lightSavedLabels = localStorage.getItem('lightChartLabels');
    const lightSavedData = localStorage.getItem('lightChartData');
    const gasSavedLabels = localStorage.getItem('gasChartLabels');
    const gasSavedData = localStorage.getItem('gasChartData');

    // chỉ lấy 10 phần tử cuối cùng hiển thị vào chart mà thôi
    if (tempSavedLabels && tempSavedData) {
        tempChart.data.labels = JSON.parse(tempSavedLabels).slice(-10);
        tempChart.data.datasets[0].data = JSON.parse(tempSavedData).slice(-10);
        tempChart.update();
    }

    if (humidSavedLabels && humidSavedData) {
        humidChart.data.labels = JSON.parse(humidSavedLabels).slice(-10);
        humidChart.data.datasets[0].data = JSON.parse(humidSavedData).slice(-10);
        humidChart.update();
    }

    if (lightSavedLabels && lightSavedData) {
        lightChart.data.labels = JSON.parse(lightSavedLabels).slice(-10);
        lightChart.data.datasets[0].data = JSON.parse(lightSavedData).slice(-10);
        lightChart.update();
    }

    if (gasSavedLabels && gasSavedData) {
        gasChart.data.labels = JSON.parse(gasSavedLabels).slice(-10);
        gasChart.data.datasets[0].data = JSON.parse(gasSavedData).slice(-10);
        gasChart.update();
    }

    // Lấy dữ liệu từ Firebase
    const temperatureRef = db.ref('weather_data/temperature');
    const humidRef = db.ref('weather_data/humidity');
    const lightRef = db.ref('weather_data/light');
    const gasRef = db.ref('gas_sensor/gas');


    temperatureRef.on('value', (snapshot) => {
        // lấy dữ liệu nhiệt độ mới nhất từ firebase
        const data = snapshot.val();

        // Cập nhật dữ liệu vào biểu đồ
        tempChart.data.labels.push(new Date().toLocaleTimeString()); // Ví dụ: sử dụng thời gian làm nhãn
        tempChart.data.datasets[0].data.push(data); // Thêm nhiệt độ vào dữ liệu

        // Nếu số phần tử trong mảng vượt quá giới hạn, xóa phần tử cũ nhất
        if (tempChart.data.labels.length > 10) {
            tempChart.data.labels.shift(); // Xóa nhãn đầu tiên
            tempChart.data.datasets[0].data.shift(); // Xóa dữ liệu đầu tiên
        }

        // Lưu dữ liệu vào LocalStorage
        localStorage.setItem('tempChartLabels', JSON.stringify(tempChart.data.labels));
        localStorage.setItem('tempChartData', JSON.stringify(tempChart.data.datasets[0].data));

        tempChart.update(); // Cập nhật biểu đồ
    });

    humidRef.on('value', (snapshot) => {
        // lấy dữ liệu nhiệt độ mới nhất từ firebase
        const data = snapshot.val();

        // Cập nhật dữ liệu vào biểu đồ
        humidChart.data.labels.push(new Date().toLocaleTimeString()); // Ví dụ: sử dụng thời gian làm nhãn
        humidChart.data.datasets[0].data.push(data); // Thêm nhiệt độ vào dữ liệu

        // Nếu số phần tử trong mảng vượt quá giới hạn, xóa phần tử cũ nhất
        if (humidChart.data.labels.length > 10) {
            humidChart.data.labels.shift(); // Xóa nhãn đầu tiên
            humidChart.data.datasets[0].data.shift(); // Xóa dữ liệu đầu tiên
        }

        // Lưu dữ liệu vào LocalStorage
        localStorage.setItem('humidChartLabels', JSON.stringify(humidChart.data.labels));
        localStorage.setItem('humidChartData', JSON.stringify(humidChart.data.datasets[0].data));

        humidChart.update(); // Cập nhật biểu đồ
    });

    lightRef.on('value', (snapshot) => {
        // lấy dữ liệu nhiệt độ mới nhất từ firebase
        const data = snapshot.val();

        // Cập nhật dữ liệu vào biểu đồ
        lightChart.data.labels.push(new Date().toLocaleTimeString()); // Ví dụ: sử dụng thời gian làm nhãn
        lightChart.data.datasets[0].data.push(data); // Thêm nhiệt độ vào dữ liệu

        // Nếu số phần tử trong mảng vượt quá giới hạn, xóa phần tử cũ nhất
        if (lightChart.data.labels.length > 10) {
            lightChart.data.labels.shift(); // Xóa nhãn đầu tiên
            lightChart.data.datasets[0].data.shift(); // Xóa dữ liệu đầu tiên
        }

        // Lưu dữ liệu vào LocalStorage
        localStorage.setItem('lightChartLabels', JSON.stringify(lightChart.data.labels));
        localStorage.setItem('lightChartData', JSON.stringify(lightChart.data.datasets[0].data));

        lightChart.update(); // Cập nhật biểu đồ
    });

    gasRef.on('value', (snapshot) => {
        // lấy dữ liệu nhiệt độ mới nhất từ firebase
        const data = snapshot.val();

        // Cập nhật dữ liệu vào biểu đồ
        gasChart.data.labels.push(new Date().toLocaleTimeString()); // Ví dụ: sử dụng thời gian làm nhãn
        gasChart.data.datasets[0].data.push(data); // Thêm nhiệt độ vào dữ liệu

        // Nếu số phần tử trong mảng vượt quá giới hạn, xóa phần tử cũ nhất
        if (gasChart.data.labels.length > 10) {
            gasChart.data.labels.shift(); // Xóa nhãn đầu tiên
            gasChart.data.datasets[0].data.shift(); // Xóa dữ liệu đầu tiên
        }

        // Lưu dữ liệu vào LocalStorage
        localStorage.setItem('gasChartLabels', JSON.stringify(gasChart.data.labels));
        localStorage.setItem('gasChartData', JSON.stringify(gasChart.data.datasets[0].data));

        gasChart.update(); // Cập nhật biểu đồ
    });
}

// CALENDAR RENDER
function calendarRender() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
}

// UPDATE CLOCK
function updateClock() {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // Tính toán góc xoay cho kim giây, phút, giờ
    const secondAngle = seconds * 6; // 360 độ / 60 giây = 6 độ mỗi giây
    const minuteAngle = minutes * 6 + seconds * 0.1; // 6 độ mỗi phút, cộng với ảnh hưởng từ kim giây
    const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 30 độ mỗi giờ, cộng với ảnh hưởng từ kim phút

    // Thay đổi CSS của các kim theo góc tính toán
    document.querySelector('.s').style.transform = `translate(-50%, -80%) rotate(${secondAngle}deg)`;
    document.querySelector('.m').style.transform = `translate(-50%, -100%) rotate(${minuteAngle}deg)`;
    document.querySelector('.h').style.transform = `translate(-50%, -100%) rotate(${hourAngle}deg)`;
}


