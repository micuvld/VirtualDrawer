class FileManagerController < ApplicationController
  # def index
  #   @tags = Tag.all
  # end

  # def getAllTags
  #   render json: Tag.all
  # end

  # def getAllItemsByTag
  #   render json: Item.joins(:tag).where('tag_id = ?', params[:tagId])
  # end

  # def downloadFile
  #   send_file "public/uploads/" + params[:file], :filename => 'img.jpg',
  #             :type => 'image/png', disposition:  "attachment"
  # end
  def upload_item item_type, item, username, alternative_name
    case item_type
    when 'file'
        self.upload_file item, username, alternative_name
    when 'note'
        self.upload_note item, username, alternative_name
    end
  end

  def self.upload_file item, username, alternative_name
    FileUploader.upload_file(item,
                          username,
                          alternative_name)
  end

  def self.upload_note item, username, alternative_name
  end

end
