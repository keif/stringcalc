var request = require('supertest')
	, app = require('../app.js')
	, http = require('http')
	;

var server = http.createServer(app);
console.log('spin up');

describe('Create a string calculator with a method int Add(string)', function (done) {
	it('sends an empty string and adds it', function(done) {
		var str = '';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 0
				expect(json.result).toBe(0);

				done(err);
			});
	});

	it('sends an integer and adds it', function(done) {
		var str = '1';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 1
				expect(json.result).toBe(1);

				done(err);
			});
	});

	it('sends an integer and adds it', function(done) {
		var str = '1,2';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(3);

				done(err);
			});
	});

	it('sends integers and adds it', function(done) {
		var str = '1,2,3,4';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(10);

				done(err);
			});
	});

	it('sends integers and adds it', function(done) {
		var str = '4,4,4,4';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(16);

				done(err);
			});
	});

	it('allow the add method to handle new lines between numbers', function(done) {
		var str = '1\n2,3';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(6);

				done(err);
			});
	});

	it('allow the add method to handle new lines between numbers', function(done) {
		var str = '1\n';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(1);

				done(err);
			});
	});

	it('allow custom delimiters', function(done) {
		var str = '//;\n1;2';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(3);

				done(err);
			});
	});

	it('allow custom delimiters with original delimiters', function(done) {
		var str = '//;\n1;2,3';
		request(server)
			.get('/calc/' + str)
			.end( function(err, dog) {
				var json = JSON.parse(dog.res.text);
				// response from our service
				expect(dog.res.statusCode).toBe(200);

				// expect 3
				expect(json.result).toBe(6);

				done(err);
			});
	});

});