class TagsController < ApplicationController
  def get_tags
    if params[:username] != nil
      user = (User.where(username: params[:username]))[0]
      render json: Tag.joins(:userToTags).where('user_id = ?', user[:id])
    else
      render json: Tag.all
    end
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