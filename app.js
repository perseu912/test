express = require("express")
http = require("http")
path = require("path")
ejs = require("ejs")
socket = require("socket.io")
sys = require("./system")

//declarations
ip = sys.myIp
users = []
usersName = []
data = {}
port = process.env.PORT || 8001
app = express()
index = path.join(__dirname+"/index")

//app
app.use(express.static(index))
server = http.createServer(app)
io = socket(server)

//socket.io
io.on("connection", (socket) => {

//login
	socket.on("user", (user, fn) => {
		if(!(user.name in users)){
			
			users[user.name] = user
			socket.user = user
			usersName = Object.keys(users)
			data.validate = true
			data.users = usersName
			
			io.emit("acept", true)
			io.emit("user", user)
			io.emit("users", usersName)
			fn(data)
			
			sys.log(usersName)
			sys.log(user.name)
			sys.log(`${user.name} entrou na sala`)
		}
		else{
			data.validate = false
			fn(data)
		}
	})


//receiver msg
	socket.on("chat", (user) => {
		console.log(user)
		io.emit("chat", user)
		
		//botUser
		bot ={
			 name: 'Bot',
       nameStyle: '<b style=" margin:0; color: black">Bot</b>',
       msg: '' 
       }
   // comands bot
     if(user.msg ==="users"){
     	bot.msg = `usuarios online: ${usersName}`
     	io.emit("chat", bot)
     }
    
	})

	
	//disconect
	socket.on("disconnect", () => {
		if(socket.user){
			
	   console.log(`${socket.user.name} foi desconectado`)
	   io.emit("user exit", socket.user)
	   delete users[socket.user.name]
	  }
	  else{
	  	console.log("bug sendo rejeitado")
	  }
	})
	
})
	
	

//start server
server.listen(port, () => {
	console.log(`online em http://${ip}:${port}`)
})
