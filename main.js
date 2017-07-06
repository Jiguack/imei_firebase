var express = require('express');
var nodeExcel = require('excel-export');
var app = express();
var imei_list = {};
var conf ={};
conf.rows = [];

app.get('/excel', function(req, res){
  	
	conf.stylesXmlFile = "styles.xml";
    conf.name = "mysheet";
  	conf.cols = [{
		caption:'IMEI',
        type:'string',
        width:100
	},{
		caption:'Updated Time',
        type:'string',
        width:100
	}];
	
	conf.rows = [];	
	for(a in imei_list) {
		conf.rows.push([a, imei_list[a]]);
	}		
	
  	var result = nodeExcel.execute(conf);
  	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  	res.setHeader("Content-Disposition", "attachment; filename=" + "IMEI_LIST.xlsx");
  	res.end(result, 'binary');
	console.log("REQUESTED EXCEL Downloading");
});

app.get('/imei', function(req, res){
	if (req.query.imei != undefined && req.query.imei != null) {
		imei_list[req.query.imei] = req.query.time;
		console.log(req.query.imei);
	}
});

app.use(express.static('public'));
app.listen(3000);
console.log('Listening on port 3000');
