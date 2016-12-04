class FileExplorerController < ApplicationController
  def index
    @tags = Tag.all
  end

  def getAllTags
    render json: Tag.all
  end

  def getAllItemsByTag
    render json: Item.joins(:tag).where('tag_id = ?', params[:tagId])
  end

  def downloadFile
    send_file "public/uploads/" + params[:file], :filename => 'img.jpg',
              :type => 'image/png', disposition:  "attachment"
  end
end
