const glob = require('glob');
const fs = require('fs');
const async = require('async');
const path = require('path');

function printSQL(file, done) {
	const name = path.basename(file, '.json');
	fs.readFile(file, 'utf-8', (err, data) => {

		let result = JSON.parse(data)
		result.name = name;

		done(null, result);
	})

}

const file_pattern = 'logic-puzzle/*.json';

glob(file_pattern, (err, files) => {

	async.map(files, printSQL, (err, datas) => {
		datas.forEach(data => {
			let initializedBox = '[0,2,7,2,1,5,7,1,4,8]';
			let stepsString = data.steps_string.split('\n').join(' ');
			let stepsLength = data.steps_length;
			let count = data.count;
			let answer = data.answer;
			let maxUpdateTimes = data.max_update_times;
			let questionZh = data.question_zh;
			let descriptionZh = JSON.stringify(data.desc_zh);
			let destination = JSON.stringify(data.desc);
			let chartPath = `destination/${data.name}.png`
			let infoPath = `destination/${data.name}.json`

			let sql = `INSERT INTO \`quizItem\`(initializedBox,stepsString,count,questionZh,stepsLength,answer,maxUpdateTimes,descriptionZh,chartPath,infoPath) VALUES (\'${initializedBox}\',\'${stepsString}\',${count},\'${questionZh}\',${stepsLength},${answer},\'${maxUpdateTimes}\',\'${descriptionZh}\',\'${chartPath}\',\'${infoPath}\');`

			console.log(sql);
		})
	})
})
