const glob = require('glob');
const cp = require('cp');
const dir_pattern = "2017*";
const dest_dir = 'logic-puzzle';
let count_of_current_quizItem_in_db = 7505;


glob(dir_pattern, function (err, dirs) {
    dirs.forEach(dir => {
        glob(`${dir}/*.json`, function (err, files) {

            files.forEach((file, index) => {

                ++count_of_current_quizItem_in_db;

                let jsonFile = file.replace('/', '_');
                console.log(jsonFile)
                // copy json files
                cp(file, `${dest_dir}/${count_of_current_quizItem_in_db}.json`, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })

                let pngFile = file.replace('json', 'png')
                let newPngFile = pngFile.replace('/', '_')
                console.log(pngFile)
                console.log(newPngFile)
                // copy png files
                cp(pngFile, `${dest_dir}/${count_of_current_quizItem_in_db}.png`, (err, result) => {
                    if (err) {
                        throw err;
                    }
                })

            })
        })
    })
})


