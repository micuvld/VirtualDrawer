class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authenticate
    if session['username'].nil?
      session['initial_uri'] = request.original_url
      redirect_to :controller => "session", :action => "index" 
    end
  end
end
