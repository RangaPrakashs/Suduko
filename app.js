var Suduko = (function sudukoIFFY( $){
	alert("Here!");
var _instance, _game, defaultConfig = {};

function init(config){
	confi = $.extend({},config,defaultConfig);
	_game = new Game( confi );
	return {
		//** Public Methods.
	}
}

function Game( config ){

}

Game.prototype = {
 //1st Build GUI : 
 	buildGUI: function(){
 		var $td, $tr, $table = $('<table>')
 		.addClass('suduko-container');

 		//Go Over the rows.
 		for( let i = 0 ; i < 9 ; i++){
 			$tr = $('<tr>');
 			this.cellMatrix[i] = {};

 			//Go over the Columns
 			for(let j = 0; j < 9; j++){
 				this.cellMatrix[i][j] = $('<input>')
 				.attr('maxlength', 1)
 				//Keep row/ col Data
 				.data('row', i)
 				.data('col', j)
 				.on('keyup', $.proxy(this.onKeyUp, this));

 				$td = $('<td>').append(this.$cellMatrix[i][j]);

 				//calculate Section ID 

 				sectIDi = Math.floor(i / 3);
 				sectIDj = Math.floor(j / 3);

 				//set the design for different sections.
 				if((sectIDi + sectIDj) % 2 ===0){
 					$td.addClass('suduko-section-one');
 				}else{
 					$td.addClass('suduko-section-two');
 				}

 				//Build the Row.
 				$tr.append($td);
  			}
  			//Append to Table
  			$table.append($tr);
 		}

 		//return the GUI table
 		return $table;
 	}
}

return {
	getInstance: function( config ) {
		if(!_instance){
			_instance= init( config );
		}
		return _instance;
	}
}



})($);