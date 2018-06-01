var Sudoku = (function($) {
	var _instance;
	var _game;
	var defaultConfiguration = {};

	function init(config) {
		conf = $.extend({}, config, defaultConfiguration);
		_game = new Game(conf);
		return {
			//public methods.
			getGameBoard: function() {
				return _game.buildGUI();
			},
			solve: function() {
				alert("Work Under Progress");
			},
			validate: function() {
				alert('nothing to validate');
			},
			reset: function() {
				alert('not Implemented yet')
			}
			//reset
		};
	}

	function Game(config) {
		this.config = config;
		this.$cellMatrix = {};
		this.matrix = {};
		return this;
	}

	function solve() {
		alert("UnderProgress");
	}
	Game.prototype = {
		//UI
		buildGUI: function() {
			var $td, $tr,
				$table = $('<table>').addClass('sudoku-container');
			for (var i = 0; i < 9; i++) {
				$tr = $('<tr>');
				this.$cellMatrix[i] = {};
				for (var j = 0; j < 9; j++) {
					// Build the input
					this.$cellMatrix[i][j] = $('<input>').attr('maxlength', 1).data('row', i).data('col', j).on('keyup', $.proxy(this.onKeyUp, this));
					$td = $('<td>').append(this.$cellMatrix[i][j]);
					// Calculate section ID
					sectIDi = Math.floor(i / 3);
					sectIDj = Math.floor(j / 3);
					// Set the design for different sections
					if ((sectIDi + sectIDj) % 2 === 0) {
						$td.addClass('sudoku-section-one');
					} else {
						$td.addClass('sudoku-section-two');
					}
					// Build the row
					$tr.append($td);
				}
				// Append to table
				$table.append($tr);
			}
			// Return the GUI table
			return $table;
		},
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
