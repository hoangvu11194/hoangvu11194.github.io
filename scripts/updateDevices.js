$(document).ready(function($)
{
	//ajax row data
	var devicesdata =
	[
        {deviceID:"1", command:"1AB", assetNo:"111", serialNo:"123", simCardNo:"320800", activationStatus:"Active", lastLoginDate:"14/08/2018", lastSyncedDate:"19/03/2019", lastActivation:"24/03/2019"},
        {deviceID:"2", command:"2DP", assetNo:"222", serialNo:"456", simCardNo:"423645", activationStatus:"Active", lastLoginDate:"14/11/2017", lastSyncedDate:"10/02/2019", lastActivation:"24/03/2019"},  
		{deviceID:"3", command:"3ZF", assetNo:"333", serialNo:"789", simCardNo:"034901", activationStatus:"Inactive", lastLoginDate:"", lastSyncedDate:"10/02/2019", lastActivation:"24/03/2019"}, 
	]

    function convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }
    $("#exportCSV").click(function downloadCSV(args) {  
        var data, filename, link;
        var csv = convertArrayOfObjectsToCSV({
            data: devicesdata
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    });
    $("#back").click(function () {  
       
        window.location.href = "/manageDevices.html"
    });

	var random_id = function  () 
	{
		var id_num = Math.random().toString(9).substr(2,3);
		var id_str = Math.random().toString(36).substr(2);
		
		return id_num + id_str;
	}


	//--->create data table > start
	var tbl = '';
	tbl +='<table class="table table-hover">'

		//--->create table header > start
		tbl +='<thead>';
			tbl +='<tr>';
			tbl +='<th>Device ID</th>';
			tbl +='<th>Command</th>';
            tbl +='<th>Asset No</th>';
            tbl +='<th>Serial No</th>';
            tbl +='<th>Sim Card No.</th>';
            tbl +='<th>Activation Status</th>';
            tbl +='<th>Last Login Date</th>';
            tbl +='<th>Last Synced Date</th>';
            tbl +='<th>Last Activation</th>';
            tbl +='<th>Options</th>';
			tbl +='</tr>';
		tbl +='</thead>';
		//--->create table header > end

		
		//--->create table body > start
		tbl +='<tbody>';

			//--->create table body rows > start
			$.each(devicesdata, function(index, val) 
			{
				//you can replace with your database row id
				var row_id = random_id();

				//loop through ajax row data
				tbl +='<tr row_id="'+row_id+'">';
					tbl +='<td ><div class="row_data" edit_type="click" col_name="deviceID">'+val['deviceID']+'</div></td>';
					tbl +='<td ><div class="row_data" edit_type="click" col_name="command">'+val['command']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="assetNo">'+val['assetNo']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="serialNo">'+val['serialNo']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="simCardNo">'+val['simCardNo']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="activationStatus">'+val['activationStatus']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="lastLoginDate">'+val['lastLoginDate']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="lastSyncedDate">'+val['lastSyncedDate']+'</div></td>';
                    tbl +='<td ><div class="row_data" edit_type="click" col_name="lastActivation">'+val['lastActivation']+'</div></td>';
                    //--->edit options > start
					tbl +='<td>';
					 
						tbl +='<span class="btn_edit" > <a href="#" class="btn btn-link " row_id="'+row_id+'" > Edit</a> </span>';

						//only show this button if edit button is clicked
						tbl +='<span class="btn_save"> <a href="#" class="btn btn-link"  row_id="'+row_id+'"> Save</a> | </span>';
						tbl +='<span class="btn_cancel"> <a href="#" class="btn btn-link" row_id="'+row_id+'"> Cancel</a> | </span>';

					tbl +='</td>';
					//--->edit options > end
				tbl +='</tr>';
				
			});

			//--->create table body rows > end

		tbl +='</tbody>';
		//--->create table body > end

	tbl +='</table>'	
	//--->create data table > end

	//out put table data
	$(document).find('.tbl_user_data').html(tbl);

	$(document).find('.btn_save').hide();
	$(document).find('.btn_cancel').hide(); 


	//--->make div editable > start
	$(document).on('click', '.row_data', function(event) 
	{
		event.preventDefault(); 

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		//make div editable
		$(this).closest('div').attr('contenteditable', 'true');
		//add bg css
		$(this).addClass('bg-warning').css('padding','5px');

		$(this).focus();
	})	
	//--->make div editable > end


	//--->save single field data > start
	$(document).on('focusout', '.row_data', function(event) 
	{
		event.preventDefault();

		if($(this).attr('edit_type') == 'button')
		{
			return false; 
		}

		var row_id = $(this).closest('tr').attr('row_id'); 
		
		var row_div = $(this)				
		.removeClass('bg-warning') //add bg css
		.css('padding','')

		var col_name = row_div.attr('col_name'); 
		var col_val = row_div.html(); 

		var arr = {};
		arr[col_name] = col_val;

		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');
		
	})	
	//--->save single field data > end
    var arrEdit = {};
 
	//--->button > edit > start	
	$(document).on('click', '.btn_edit', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

	

		

		//--->add the original entry > start
		tbl_row.find('.row_data').each(function(index, val) 
		{  
		    var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).html();
			arrEdit[col_name] = col_val;
			//this will help in case user decided to click on cancel button
			$(this).attr('original_entry', $(this).html());
		}); 		
		//--->add the original entry > end
		//--->create data table > start
	var tblUpdate = '';
	tblUpdate +='<table class="table table-hover">'

		//--->create table header > start
		tblUpdate +='<thead>';
			tblUpdate +='<tr>';
			tblUpdate +='<th>Activation Status</th>';
            tblUpdate +='<th>Asset No</th>';
            tblUpdate +='<th>Serial No</th>';
            tblUpdate +='<th>Sim Card No.</th>';
			tblUpdate +='</tr>';
		tblUpdate +='</thead>';
		//--->create table header > end

		
		//--->create table body > start
		tblUpdate +='<tbody>';

			//--->create table body rows > start
			
			
				//you can replace with your database row id
				var row_id = random_id();

				//loop through ajax row data
				tblUpdate +='<tr row_id="'+row_id+'">';
					tblUpdate +='<td ><div class="row_data" edit_type="click" col_name="activationStatus">'+arrEdit['activationStatus']+'</div></td>';
                    tblUpdate +='<td ><div class="row_data" edit_type="click" col_name="assetNo">'+arrEdit['assetNo']+'</div></td>';
                    tblUpdate +='<td ><div class="row_data" edit_type="click" col_name="serialNo">'+arrEdit['serialNo']+'</div></td>';
                    tblUpdate +='<td ><div class="row_data" edit_type="click" col_name="simCardNo">'+arrEdit['simCardNo']+'</div></td>';
				tblUpdate +='</tr>';
				
		

			//--->create table body rows > end

		tblUpdate +='</tbody>';
		//--->create table body > end

	tblUpdate +='</table>'	
	//--->create data table > end
	$(document).find('.tbl_update').html(tblUpdate);

	});
	//--->button > edit > end
    

	//--->button > cancel > start	
	$(document).on('click', '.btn_cancel', function(event) 
	{
		event.preventDefault();

		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();

		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		tbl_row.find('.row_data').each(function(index, val) 
		{   
			$(this).html( $(this).attr('original_entry') );
			
		});  
	});
	//--->button > cancel > end

	
	//--->save whole row entery > start	
	$(document).on('click', '.btn_save', function(event) 
	{
		event.preventDefault();
		var tbl_row = $(this).closest('tr');

		var row_id = tbl_row.attr('row_id');

		
		//hide save and cacel buttons
		tbl_row.find('.btn_save').hide();
		tbl_row.find('.btn_cancel').hide();

		//show edit button
		tbl_row.find('.btn_edit').show();


		//make the whole row editable
		tbl_row.find('.row_data')
		.attr('edit_type', 'click')
		.removeClass('bg-warning')
		.css('padding','') 

		//--->get row data > start
		var arr = {}; 
		tbl_row.find('.row_data').each(function(index, val) 
		{   
			var col_name = $(this).attr('col_name');  
			var col_val  =  $(this).html();
			arr[col_name] = col_val;
		});
		//--->get row data > end

		//use the "arr"	object for your ajax call
		$.extend(arr, {row_id:row_id});

		//out put to show
		$('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>')
         
        
       

    });
}); 