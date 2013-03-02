ngGridDirectives.directive('ngCellHasFocus', ['DomUtilityService',
	function (domUtilityService) {
		var isFocused = false;
		var oldCellValue = undefined;
		var focusOnInputElement = function($scope, elm){
			$scope.isFocused = true;
			domUtilityService.digest($scope);	
			var elementWithoutComments = angular.element(elm[0].children).filter(function() { return this.nodeType != 8 });//Remove html comments for IE8
			var inputElement = angular.element(elementWithoutComments[0].children[0]); 
			if(inputElement.length > 0){
				angular.element(inputElement).focus();
				$scope.domAccessProvider.selectInputElement(inputElement[0]);
				angular.element(inputElement).bind('blur', function(){	
					$scope.isFocused = false;	
					domUtilityService.digest($scope);
					return true;
				});	
			}
		};
		return function($scope, elm) {
			elm.bind('mousedown', function(evt){
				elm.focus();
				return true;
			});			
			elm.bind('focus', function(evt){
				isFocused = true;
				return true;
			});		
			elm.bind('blur', function(evt){
				isFocused = false;
				return true;
			});
			elm.bind('keydown', function(evt){
				if(isFocused && evt.keyCode != 37 && evt.keyCode != 38 && evt.keyCode != 39 && evt.keyCode != 40 && evt.keyCode != 9 && !evt.shiftKey && evt.keyCode != 13){
					focusOnInputElement($scope,elm);
				}
				if(evt.keyCode == 27){
					elm.focus();
				}
				return true;
			});
		};
	}]);