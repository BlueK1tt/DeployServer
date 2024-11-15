
module.exports =  {
    data: test()

};

function test(){
    setTimeout(() => {
        console.log("Delayed for 5 second.");
        return "Test done";
      }, 5000);
}