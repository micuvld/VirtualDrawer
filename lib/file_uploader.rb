module FileUploader
  def self.upload_item item_type, item, username, alternative_name, tag_name
    case item_type
    when 'file'
        self.upload_file item, username, alternative_name, tag_name
    when 'note'
        #self.upload_note item, username
        puts 'it`s a note. no need to upload'
    end
  end

  def self.upload_file file, username, alternative_name, tag_name
    folder = "storage/#{username}/#{tag_name}"
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

  def self.upload_note note, username
    note = JSON.parse note
    puts note["title"]
    folder = "storage/#{username}"
    filepath = File.join(folder, note["title"])

    #if !File.file?(filepath)
    #  FileUtils::mkdir_p folder
    #else
      FileUtils::mkdir_p folder

      f = File.open filepath, "wb"
      f.write note["text"]
      f.close
    #end

    filepath
  end

  def self.delete_file path
    FileUtils::rm path
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


