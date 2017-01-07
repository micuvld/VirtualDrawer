class SessionController < ApplicationController
	require 'date'
	require 'json'
	require 'digest'

  def index
  end

  def new
  end

  def login
  	userData = JSON.parse(request.raw_post)

  	if User.exists?(username: userData["username"])
  		action_type = "login"
  		user = User.find_by username: userData["username"]

  		if (user[:password] == Digest::SHA1.hexdigest(userData["password"]))
  			session['username'] = userData["username"]
			session_key = Digest::SHA1.hexdigest(DateTime.now.strftime('%Q'))
			puts session_key

			user.session_key = session_key;
			user.save
		else
			session_key = -1
  		end
  	else
  		session['username'] = userData["username"]
  		action_type = "register"
  		puts userData["password"]
  		session_key = Digest::SHA1.hexdigest(DateTime.now.strftime('%Q'))
  		user = User.create(username: userData["username"],
  			 password: Digest::SHA1.hexdigest(userData["password"]),
  			 session_key: session_key)
  		user.save
  	end

  	if session_key == -1
  		render :json => JSON.parse('{"status":"fail"}') 
  	else
  		render :json => JSON.parse("{\"status\":\"success\", \"type\":\"#{action_type}\"}") 
  	end
  end

  def logout
  	reset_session
  	render :json => JSON.parse("{\"status\":\"success\"}")
  end
end
