module.exports = {
    data: message()
};

function message(){
    smgs = new Object();
        smgs['first'] = "hello first";
        smgs['second'] = "hello second";
    console.log(smgs);
    return smgs;
}