os = require('os');

memFreePorcent = (100*(os.freemem()/os.totalmem())).toFixed(2)


ip = 'localhost'
 var ifaces = os.networkInterfaces(); 
 Object.keys(ifaces).forEach(function (ifname) { var alias = 0;
 	 ifaces[ifname].forEach(function (iface) { if ('IPv4' !== iface.family || iface.internal !== false)
 	 	 { // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
 	 	  return;
 	 	  }
 	 	    if (alias >= 1) { // this single interface has multiple ipv4 addresses 
 	 	       //  console.log(ifname + ':' + alias, iface.address);
 	 	         ip = iface.address 
 	 	  }
	     else { //this interface has only one ipv4 adress 
	        //console.log(ifname, iface.address);
	        ip = iface.address
	         } 
	     ++alias;
	      });
	    }); 

const myIp = ip
//console.log(myIp)



const log = (l) => console.log(l);

time = {
	t : 0,
	init : function(){
		this.t = Date.now();
	},
	end : function(){
		let tf = Date.now() - this.t;
		return tf
		}
}


//test
class Fun{
	constructor(s){
		this.s = s;
	}
	test(){
		try{
			eval(this.s)
		}
		catch(e){
			console.error(e)
		}
	}
}





//console.log(os)


//test	

//time.init()
//function on(){
	//log('on')
//log(time.end())

module.exports = {log, time, myIp, memFreePorcent}
    
