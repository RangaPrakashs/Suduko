var Suduko = (function sudukoIFFY($) {
	$()
	var _instance, _game, defaultConfig = {};

	function init(config) {
		confi = $.extend({}, config, defaultConfig);
		_game = new Game(confi);
		return {
			//** Public Methods.
		}
	}

	function Game(config) {}
	Game.prototype = {
		/**
		 * Handle keyup events.
		 *
		 * @param {jQuery.event} e Keyup event
		 */
		onKeyUp: function(e) {
			var sectRow, sectCol, secIndex,
				starttime, endtime, elapsed,
				isValid = true,
				val = $.trim($(e.currentTarget).val()),
				row = $(e.currentTarget).data('row'),
				col = $(e.currentTarget).data('col');
			// Reset board validation class
			$('.sudoku-container').removeClass('valid-matrix');
			// Validate, but only if validate_on_insert is set to true
			if (this.config.validate_on_insert) {
				isValid = this.validateNumber(val, row, col, this.matrix.row[row][col]);
				// Indicate error
				$(e.currentTarget).toggleClass('sudoku-input-error', !isValid);
			}
			// Calculate section identifiers
			sectRow = Math.floor(row / 3);
			sectCol = Math.floor(col / 3);
			secIndex = (row % 3) * 3 + (col % 3);
			// Cache value in matrix
			this.matrix.row[row][col] = val;
			this.matrix.col[col][row] = val;
			this.matrix.sect[sectRow][sectCol][secIndex] = val;
		},
		validateNumber: function(val, row, col, rowID, colID, oldNum) {
			var isValid = true;
			//TODO.
		}
		//1st Build GUI : 
		buildGUI: function() {
			var $td, $tr, $table = $('<table>').addClass('suduko-container');
			//Go Over the rows.
			for (let i = 0; i < 9; i++) {
				$tr = $('<tr>');
				this.cellMatrix[i] = {};
				//Go over the Columns
				for (let j = 0; j < 9; j++) {
					this.cellMatrix[i][j] = $('<input>').attr('maxlength', 1)
						//Keep row/ col Data
						.data('row', i).data('col', j).on('keyup', $.proxy(this.onKeyUp, this));
					$td = $('<td>').append(this.$cellMatrix[i][j]);
					//calculate Section ID 
					sectIDi = Math.floor(i / 3);
					sectIDj = Math.floor(j / 3);
					//set the design for different sections.
					if ((sectIDi + sectIDj) % 2 === 0) {
						$td.addClass('suduko-section-one');
					} else {
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
		getInstance: function(config) {
			if (!_instance) {
				_instance = init(config);
			}
			return _instance;
		}
	}
})($);
