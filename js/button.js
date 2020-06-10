const switchButton = document.querySelector(`.game-help .switch-button`),
    helpButton = document.querySelector(`.game-help .help`);

let oddSwitch = true;

function switchPosition(transform, transformReverse, firstOrder, secondOrder) {
    gameBoard.style.transform = transform;
    document.querySelector(`.container .black-panel .score`).style.transform = transform;
    document.querySelector(`.container .black-panel .black-logo`).style.transform = transform;
    document.querySelector(`.container .white-panel .score`).style.transform = transformReverse;
    document.querySelector(`.container .white-panel .white-logo`).style.transform = transformReverse;
    document.querySelector(`.container .title`).style.order = firstOrder;
    document.querySelector(`.container .black-panel`).style.order = secondOrder;
    document.querySelector(`.container .black-panel img`).style.order = firstOrder;
    document.querySelector(`.container .black-panel .score`).style.order = secondOrder;
    document.querySelector(`.container .white-panel`).style.order = firstOrder;
    document.querySelector(`.container .white-panel img`).style.order = secondOrder;
    document.querySelector(`.container .white-panel .score`).style.order = firstOrder;
    document.querySelector(`.container .game-help`).style.order = secondOrder;
};

switchButton.addEventListener(`click`, () => {
    if (oddSwitch) {
        switchPosition(`rotate(180deg)`, `rotate(0)`, `2`, `1`);
    } else {
        // * back to style.css 
        switchPosition(``, ``, ``, ``);
    };
    return oddSwitch = !oddSwitch;
});

helpButton.addEventListener(`click`, () => {
    Swal.fire({
        title: `Draughts`,
        text: `Pilih 'Selanjutnya' untuk petunjuk permainan !`,
        confirmButtonText: `Selanjutnya &rarr;`,
        showCancelButton: true,
        cancelButtonText: `Kembali`,
        imageUrl: `img/logo.png`,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: `Draughts`
    }).then((result) => {
        if (result.value) {
            Swal.mixin({
                width: 570,
                confirmButtonText: `Selanjutnya &rarr;`,
                showCancelButton: true,
                cancelButtonText: `Kembali`,
                progressSteps: [`1`, `2`, `3`, `4`]
            }).queue([{
                    title: `Keping`,
                    html: `
                      <p>Setiap keping hanya bisa <b><ins>maju satu langkah secara diagonal</ins></b>,<br><br>
                      Cara mengalahkan keping lawan yaitu <b><ins>dengan cara melompatinya</ins></b>, apabila <b><ins>lawan berada tepat satu langkah diagonal di depan/belakang keping yang akan melompatinya</ins></b></p>.
                  `,
                    imageUrl: `img/men-black.png`,
                    imageWidth: 50,
                    imageHeight: 50,
                    imageAlt: `Keping`
                },
                {
                    title: `Raja`,
                    html: `
                      <p>Setiap keping dapat menjadi keping Raja, apabila keping <b><ins>berhasil menyentuh garis akhir(ujung) lawan</b></ins>,<br><br>
                      <b><ins>Kemampuan</b></ins>:<br> dapat <b><ins>melangkah maju dan mundur(secara diagonal)</b></ins> sejauh <b><ins>satu langkah</b></ins> & <b><ins>melompati lawan(secara diagonal) sejauh mungkin, termasuk mundur</ins></b></p>.
                  `,
                    imageUrl: `img/king-black.png`,
                    imageWidth: 50,
                    imageHeight: 50,
                    imageAlt: `Raja`
                },
                {
                    title: `Lompatan Beruntun`,
                    html: `
                      <p>Pemain dapat <b><ins>melompati lebih dari satu keping lawan dalam satu giliran</b></ins>, apabila setelah lompatan pertama masih memungkinkan untuk melompati lawan lagi, akan tetapi hanya diberikan <b><ins>jeda waktu 3 detik setiap lompatan</ins></b></p>.
                  `,
                    icon: `info`
                },
                {
                    title: `Pemenang`,
                    html: `
                      <p>Pemenang ditentukan melalui siapa yang berhasil <b><ins>menghabiskan keping lawan terlebih dahulu</ins></b>,<br><br>
                      Pemenang juga ditentukan melalui siapa yang berhasil <b><ins>membuat seluruh keping yang tersisa menjadi keping Raja</ins></b>, lalu <b><ins>paling cepat mengembalikannya ke tempat awal mula permainan</ins></b>,<br><br>
                      Pemain yang tidak dapat giliran karena <b><ins>gerakannya terblokir</ins></b>, akan dianggap <b><ins>kalah</ins></b></p>.
                  `,
                    icon: `success`
                }
            ]).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: `Selamat Bermain !!!`,
                        html: `&copy 2020 kalUnite`,
                        imageUrl: `img/kalUnite-logo.png`,
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: `kalUnite`,
                        confirmButtonText: `Kembali`,
                        showCancelButton: false,
                    });
                };
            });
        };
    });
});