var userID = ""; //userID of the currently logged in user
var num_contenders = 100; //temporary variable only because we have no array of contenders yet
var tot_cost_per_item = [0,0,0,0,0,0,0,0,0,0,0];  //how many boks are being spent for each item (quantity desired * price per).  amounts.length = number of special items
var is_owner = true; //temporary until we can actually check for this