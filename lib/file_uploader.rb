module FileUploader
  def self.upload_file file, username, alternative_name
    folder = "storage/#{username}"
    if alternative_name != ""
      filename = alternative_name
    else
      filename = file.original_filename
    end
    filepath = File.join(folder, filename)

    #if !File.file?(filepath)
    #  FileUtils::mkdir_p folder
    #else
      FileUtils::mkdir_p folder

      f = File.open filepath, "wb"
      f.write file.read()
      f.close
    #end

    filepath
  end

  def new
    @items = Item.all
  end

  def create
    created_item = Item.insert_item_and_get_id params[:name], params[:tagId], params[:username]
    upload_file params[:file], created_item.id, "username"

    #redirect_to '/'
  end

end


