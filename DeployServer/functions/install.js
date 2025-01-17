//install "program" to depositories folder
//need to connect to github and download same named repository from there

module.exports = {
    data : install()
};

function install(){
    filename = msg.slice(10);
    if(msg == "install"){
        console.log("error, target not defined");
        return "target not defined"
    }
    if(msg.includes(filename)){

        console.log("installing " + filename)
        return "installing..."
    } else {
        console.log("error");
        return "error;"
    }
}