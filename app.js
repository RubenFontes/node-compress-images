const sharp = require('sharp');
const compress_images = require('compress-images');
//const fs = require('fs');

let path = process.argv[2];
let width = Number(process.argv[3]);

function resize (path, width, exit){

    sharp(path).resize({width: width})
        .toFile(exit, (error) => {
            if(error){
                console.log(error);
            }else{
                console.log('image successfully compress');
                compress(exit, './compressed/compressed_');
            }
        })
};

function compress(input, output){
    compress_images(input, output, { compress_force: false, statistic: true, autoupdate: true }, false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    
    function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");
    }
    );

    /*fs.unlink(input, (e)=>{
        if(e){
            console.log(e);
        }else{
            console.log(input, 'deleted');
        }
    })*/

}

resize(path, width, './tmp/resize.jpg');