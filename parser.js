var dilraj = {
  date: '',
  time:[],
  bg:[],
  bolus:[],
  carbs:[],
  total:[]
};
​
​
var stream = fs.createReadStream(file);
csv.fromStream(stream, {headers : true })
.on("data", function(data){
  // console.log(data);
​
  // if (data['Daily Insulin Total (U)'] > 0) {
  //  dilraj.date = data['Date'];
  // }
  // dilraj.time.push(data['Time']);
  // dilraj.bg.push(data['BG Reading (mmol/L)']);
  // dilraj.bolus.push(data['BWZ Estimate (U)']);
  // dilraj.carbs.push(data['BWZ Carb Input (grams)']);
  // dilraj.total.push(data['Daily Insulin Total (U)']);
​
  if (data['Daily Insulin Total (U)'] > 0) {
    console.log('-------------------------------------------------------------------------------------------------------------------------');
  }
​
  // Logbook.create({
  //  date: data['Date'],
  //  time: data['Time'],
  //  bg_reading:data['BG Reading (mmol/L)']
  // })  
​
  // if (data['BWZ Insulin Sensitivity (mmol/L)'] > 0){ 
    console.log('Index:', data['Index'], 'Date:', data['Date'], 
      'Time:', 
      data['Time'], 'BG Reading (mmol/L):',
      data['BG Reading (mmol/L)'], 'BWZ Estimate (U):', 
      data['BWZ Estimate (U)'], 'BWZ Carb Input (grams)', 
      data['BWZ Carb Input (grams)'], 'Daily Insulin Total (U):', 
      'BWZ Insulin Sensitivity (mmol/L):', data['BWZ Insulin Sensitivity (mmol/L)']); 
    // data['Daily Insulin Total (U)']);
  // }
})
.on("end", function(){
  console.log("[Completed]");
  console.log(dilraj);
});