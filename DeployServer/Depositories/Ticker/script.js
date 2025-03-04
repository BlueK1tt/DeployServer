function message() { 
  
    // Get the h3 element 
    var h3 = document.getElementById('mssg')  
  
    // Changed it's text, colour 
    h3.innerText = 'CONGRATS!! You have learnt'  
    h3.style.color = 'red'  
      
    // Get the lower div 
    var div = document.getElementById('lower') 
  
    // Disappear mode 
    div.style.display = 'none'  
}