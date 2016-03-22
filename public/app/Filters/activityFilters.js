app.filter('afterDateFilter', function(){
	  return function(input, timeIn, startDateText){
	    var out = [];
	    angular.forEach(input, function(activity){
	      if(moment(activity.in).isAfter(timeIn)){
	        out.push(activity)
	      }
	    })
	    if ((timeIn === undefined) || (startDateText === "")) {
	    	return input;
	    } else {
	    	return out;
	    };
	  }
	})

app.filter('beforeDateFilter', function(){
  return function(input, timeIn, beforeDateText){
    var out = [];
    angular.forEach(input, function(activity){
      if(moment(activity.in).isBefore(timeIn)){
        out.push(activity)
      }
    })
    if (beforeDateText === "") {
	    	return input;
	    } else {
	    	return out;
	    };
  }
})

app.filter('groupFilter', function(){
  return function(input, selectedGroups){
    var out = [];
    if (selectedGroups[0] === undefined) {
    	return input;
    };
    angular.forEach(input, function(activity){
      if(_.contains(selectedGroups, activity.group)){
        out.push(activity)
      }
    })
	return out; 
  }
})

app.filter('activityFilter', function(){
  return function(input, selectedActivities){
    var out = [];

    if (selectedActivities[0] === undefined) {
    	return input;
    };

    angular.forEach(input, function(activity){
      if(_.contains(selectedActivities, activity.activity)){
        out.push(activity)
      }
    })
	return out; 
  }
})

