class TagsController < ApplicationController
  before_filter :authenticate
  def get_tags
    user = (User.where(username: session['username']))[0]
    render json: Tag.joins(:userToTags).where('user_id = ?', user[:id])
  end

  def destroy
    Tag.delete(params[:tagId])
  end

  def update
  	tag = Tag.find_by(id: params[:tagId])
	  tag.name = params[:tagNewName]
	  tag.save
  end
end