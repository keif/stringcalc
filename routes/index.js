/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.calc = function(req, res){
	console.log();
	console.log('calc init', req.params[0]);
	var param = req.params[0];
	var delimiter = '\\n,';
	if (param.indexOf('//') === 0) {
		delimiter += param.substr(2, 1);
		param = param.substr(3);
	}
	delimiter = new RegExp('[' + delimiter + ']+');
	console.log('new delim:', delimiter);
	var params = param.split(delimiter);
	var result = 0;
	console.log(params);
	if (params.length > 1) {
		for (var i = 0; i < params.length; i++) {
			if (params[i] !== '') {
				result += parseInt(params[i], 10);
			}
		}
	} else {
		if (params[0] !== '') {
			result = parseInt(params[0], 10);
		}
	}
	console.log();
	console.log('result:', result, typeof result);
	res.end(JSON.stringify({"result": result }));
};